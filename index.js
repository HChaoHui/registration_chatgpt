/**
 * 作者: NOVCH
 * 日期: 2023-12-13
 */

const fs = require('fs');
const getAccount = require("./util/getAccount");

const args = process.argv.slice(2);
const num = args[0] ? Number(args[0]) : null;

async function goGet(num) {
    if (!num) {
        getSingleAccount();
    } else {
        await getMultipleAccounts(num);
    }
}

async function getSingleAccount() {
    const account = await getAccount();
    fs.writeFileSync("./chatgptAccount.txt", JSON.stringify(account) + '\n', { flag: 'a' });
    console.log("创建完成, 共计 1 个");
}

async function getMultipleAccounts(num) {
    let successAccountCount = 0;
    let errorAccountCount = 0;
    while (num > 0) {
        const account = await getAccount();
        if (account) {
            fs.writeFileSync("./chatgptAccount.txt", JSON.stringify(account) + '\n', { flag: 'a' });
            successAccountCount++;
        }

        if (!account) {
            errorAccountCount++
        }

        num--;
    }
    
    console.log("创建完成, 共计 " + num + " 个\n");
    console.log("成功 " + successAccountCount + " 个\n");
    console.log("失败" + errorAccountCount + " 个\n");
}

goGet(num);
