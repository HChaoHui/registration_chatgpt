const { puppeteer, puppeteerConfig } = require('./puppeteer');
const config = require("./config");

async function getAccount() {
    let browser;
    try {
        browser = await puppeteer.launch(puppeteerConfig);
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let passWord = await generateRandomPassword(charset, 20);

        console.log("生成随机密码: " + passWord);

        console.log("打开临时邮箱页面");
        const tempMailPage = await browser.newPage();
        await tempMailPage.goto(config.MailAddress);
        await tempMailPage.waitForTimeout(4000);

        const mailValue = await getValueFromSelector(tempMailPage, '#shortid');
        if (!mailValue) {
            console.log("邮箱获取失败，关闭浏览器");
            await browser.close();
            return;
        }
        console.log("邮箱获取成功，邮箱的值为" + mailValue);

        console.log("打开ChatGPT注册页面");
        const chatGPTPage = await browser.newPage();
        await chatGPTPage.goto(config.RegisteredAddress);
        await chatGPTPage.waitForTimeout(2000);

        console.log("插入账号密码");
        await insertText(chatGPTPage, 'input#username', mailValue);
        await insertText(chatGPTPage, 'input#password', passWord);
        await chatGPTPage.waitForTimeout(2000);

        console.log("点击创建按钮");
        await chatGPTPage.click('button[type="submit"]');
        await chatGPTPage.waitForSelector('#submit-token');

        console.log("回到邮件页面");
        await bringPageToFront(browser, 1);
        await tempMailPage.waitForSelector('#maillist > tr');

        console.log("点击获取到的邮件");
        await tempMailPage.click("#maillist > tr");

        console.log("获取注册链接");
        const linkValue = await tempMailPage.$eval('#bodyCell > div.main > p:nth-child(3) > a', element => element.href);
        console.log("注册链接为: " + linkValue);

        console.log("回到注册页面");
        await bringPageToFront(browser, 2);
        await chatGPTPage.waitForTimeout(2000);

        console.log("点击粘贴按钮");
        await chatGPTPage.click('#submit-token');
        await chatGPTPage.waitForTimeout(2000);

        console.log("插入注册链接");
        await insertText(chatGPTPage, '#swal2-input', linkValue);
        await chatGPTPage.waitForTimeout(2000);

        console.log("点击确认按钮");
        await chatGPTPage.click('body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled');
        await chatGPTPage.waitForSelector('#username');

        console.log("插入用户名");
        await insertText(chatGPTPage, '#username', "ChatGPT_Bot");
        await chatGPTPage.waitForTimeout(3000);

        console.log("点击进行图像验证");
        await chatGPTPage.click('body > div.oai-wrapper > main > section > div > div > div > form > div.cc6121580 > button');
        await chatGPTPage.waitForSelector('body > div > main > section > div > div > div > div:nth-child(2) > p > a',{timeout:120000});

        console.log("创建完成");
        console.log("账号:" + mailValue);
        console.log("密码:" + passWord);
        return {
            u: mailValue,
            p: passWord
        }
    } catch (error) {
        console.error("发生错误: " + error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function generateRandomPassword(charset, length) {
    let passWord = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        passWord += charset[randomIndex];
    }
    return passWord;
}

async function getValueFromSelector(page, selector) {
    return await page.evaluate((selector) => {
        const inputElement = document.querySelector(selector);
        return inputElement ? inputElement.value : null;
    }, selector);
}

async function insertText(page, selector, text) {
    try {
        await page.type(selector, text);
    } catch (error) {
        console.error("插入文本时发生错误: " + error);
    }
}

async function bringPageToFront(browser, index) {
    const allPages = await browser.pages();
    if (index < allPages.length) {
        await allPages[index].bringToFront();
    }
}

module.exports = getAccount;
