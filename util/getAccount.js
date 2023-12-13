const puppeteer = require('puppeteer');

let getAccount = async () => {

    console.log("创建浏览器成功");
    const browser = await puppeteer.launch(
        {
            headless: "new"
        }
    );

    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.';
    let passWord = '';
    let passwordLength = 20;

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        passWord += charset[randomIndex];
    }

    console.log("生成随机密码:" + passWord);

    console.log("打开临时邮箱页面");
    const tempMailPage = await browser.newPage();
    await tempMailPage.goto("https://mail.cxai.cc")

    console.log("等待4s确定邮箱加载完成");
    await tempMailPage.waitForTimeout(4000);

    console.log("获取邮箱");
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
    await chatGPTPage.goto('https://chat.oaifree.com/auth/signup');

    console.log("等待2s确定注册页面加载完成");
    await chatGPTPage.waitForTimeout(2000);

    console.log("插入账号密码");
    await chatGPTPage.type('input#username', mailValue);
    await chatGPTPage.type('input#password', passWord);

    console.log("等待2s确定数据插入完成");
    await chatGPTPage.waitForTimeout(2000);

    console.log("点击创建按钮");
    await chatGPTPage.click('button[type="submit"]');

    console.log("等待点击创建完成后跳转页面加载完成");
    await chatGPTPage.waitForSelector('#submit-token');

    console.log("回到邮件页面");
    const allPages = await browser.pages();
    await allPages[1].bringToFront();

    console.log("等待收取邮件完成");
    await tempMailPage.waitForSelector('#maillist > tr')

    console.log("点击获取到的邮件");
    await tempMailPage.click("#maillist > tr")

    console.log("获取注册链接");
    const linkValue = await tempMailPage.$eval('#bodyCell > div.main > p:nth-child(3) > a', element => element.href);
    console.log("注册链接为: " + linkValue);

    console.log("回到注册页面");
    await allPages[2].bringToFront();

    console.log("等待2s确定页面加载完成");
    await chatGPTPage.waitForTimeout(2000);

    console.log("点击粘贴按钮");
    await chatGPTPage.click('#submit-token')

    console.log("等待2s确定弹框弹出");
    await chatGPTPage.waitForTimeout(2000);

    console.log("插入注册链接");
    await chatGPTPage.type('#swal2-input', linkValue);

    console.log("等待2s确定插入成功");
    await chatGPTPage.waitForTimeout(2000);

    console.log("点击确认按钮");
    await chatGPTPage.click("body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled")

    console.log("等待创建完成");
    await chatGPTPage.waitForSelector('#username');

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