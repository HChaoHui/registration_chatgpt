const { puppeteer, executablePath } = require('./puppeteer');
const config = require("./config")

const pathToExtension = require('path').join(__dirname, '../plugin/CapSolver.Browser.Extension');

let getAccount = async () => {

    browser = await puppeteer.launch({
        headless: "new",
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
        ],
        executablePath: executablePath()
    });

    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let passWord = '';
    let passwordLength = 20;

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        passWord += charset[randomIndex];
    }

    console.log("生成随机密码:" + passWord);

    console.log("打开临时邮箱页面");
    const tempMailPage = await browser.newPage();
    await tempMailPage.goto(config.MailAddress)

    await tempMailPage.waitForTimeout(4000);

    const inputMailSelector = '#shortid'; // 替换为实际的输入框 id
    const mailValue = await tempMailPage.evaluate((selector) => {
        const inputElement = document.querySelector(selector);
        return inputElement ? inputElement.value : null;
    }, inputMailSelector);
    if (!mailValue) {
        console.log("邮箱获取失败，关闭浏览器");
        await browser.close();
        return
    }
    console.log("邮箱获取成功，邮箱的值为" + mailValue);

    console.log("打开ChatGPT注册页面");
    const chatGPTPage = await browser.newPage();
    await chatGPTPage.goto(config.RegisteredAddress);

    await chatGPTPage.waitForTimeout(2000);

    console.log("插入账号密码");
    await chatGPTPage.type('input#username', mailValue);
    await chatGPTPage.type('input#password', passWord);

    await chatGPTPage.waitForTimeout(2000);

    console.log("点击创建按钮");
    await chatGPTPage.click('button[type="submit"]');

    try {
        await chatGPTPage.waitForSelector('#submit-token');
    } catch (error) {
        getAccount()
    }

    console.log("回到邮件页面");
    const allPages = await browser.pages();
    await allPages[1].bringToFront();

    try {
        await tempMailPage.waitForSelector('#maillist > tr')
    } catch (error) {
        getAccount()
    }

    console.log("点击获取到的邮件");
    await tempMailPage.click("#maillist > tr")

    console.log("获取注册链接");
    const linkValue = await tempMailPage.$eval('#bodyCell > div.main > p:nth-child(3) > a', element => element.href);
    console.log("注册链接为: " + linkValue);

    console.log("回到注册页面");
    await allPages[2].bringToFront();

    await chatGPTPage.waitForTimeout(2000);

    console.log("点击粘贴按钮");
    await chatGPTPage.click('#submit-token')

    await chatGPTPage.waitForTimeout(2000);

    try {
        console.log("插入注册链接");
        await chatGPTPage.type('#swal2-input', linkValue);
    } catch (error) {
        getAccount()
    }

    await chatGPTPage.waitForTimeout(2000);

    try {
        console.log("点击确认按钮");
        let sureBtn = 'body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled'
        await chatGPTPage.click(sureBtn)
    } catch (error) {
        getAccount()
    }

    try {

        await chatGPTPage.waitForSelector('#username');

        console.log("插入用户名");

        await chatGPTPage.type('#username', "ChatGPT_Bot");

        let tellBtn = 'body > div.oai-wrapper > main > section > div > div > div > form > div.cc6121580 > button'

        await chatGPTPage.waitForTimeout(3000);
        
        console.log("点击进行图像验证");
        await chatGPTPage.click(tellBtn);

        let isLoginBtn = 'body > div > main > section > div > div > div > div:nth-child(2) > p > a'

        await chatGPTPage.waitForSelector(isLoginBtn);

    } catch (error) {
        getAccount()
    }

    console.log("创建完成");
    console.log("账号:" + mailValue);
    console.log("密码:" + passWord);

    await browser.close();

    return {
        u: mailValue,
        p: passWord
    }
};

module.exports = getAccount