/**
 * Author: NOVCH
 * Date: 2023-12-13
 */

const args = process.argv.slice(2);
let num = args[0] ? Number(args[0]) : null;
const fs = require('fs');
const getAccount = require("./util/getAccount");

// 非批量注册
if (!num) {
    getAccount();
    return
}

// 批量注册
let goGet = async () => {

    let account = await getAccount()

    fs.writeFileSync("./chatgptAccount.txt", JSON.stringify(account) + '\n', { flag: 'a' });

    num--

    if (num <= 0) {
        console.log("创建完成, 共计" + Number(args[0]) + "个");
        return
    }

    goGet()

}

goGet();





