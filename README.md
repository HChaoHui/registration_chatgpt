# 基于NodeJs批量生成ChatGPT账号 
> node版本需 >= 18.16.0 小于版本需自测  
> 基于Pandora-Next实现不限制IP注册  
> 目前默认使用的`https://chat.oaifree.com/auth/signup`(已套CF),请自行部署Pandora- Next  
> 目前PandoraNext注册账号是由消耗额度为1:100  
> 基于capsolver自动识别验证码  
> 基于forsaken Mail临时邮箱获得随机邮箱与验证码

## 使用方法

1. clone 源码 `git clone https://github.com/HChaoHui/registration_chatgpt.git`  
2. cd registration_chatgpt
3. npm install
4. `ntil/config.js`，修改里面的`RegisteredAddress`为你搭建PandoraNext地址，`MailAddress`为你搭建的`forsaken Mail`
5. `plugin/CapSolver.Browser.Extension/assets/config.js`，修改里面的apiKey为你的capsolver Key  

capsolver官网`https://www.capsolver.com/`  
capsolver官网可以领取试用的1美金，大概可以自动识别1000次左右  
forsaken Mail地址`[forsaken Mail](https://github.com/denghongcai/forsaken-mail)`  

## 生成单个  

1. npm run test
2. 看到创建完成
3. 下面就是自动生成的账号密码

## 生成多个  

1. npm run get {num} 例如 `npm run get 10` 批量生成10个
2. 看到创建完成后在项目目录下找到`chatgptAccount.txt` 里面就是生成的账号密码

## 可能遇到的问题

1. 报错提示`Could not find Chrome`, 此错误说明电脑环境没有Chrome, 使用`npx puppeteer browsers install chrome`安装即可
2. 报错提示`No element found for selector: #swal2-input`, 此错误说明网络可能有些慢,打开`util/getAccount.js`,全局搜索`chatGPTPage.waitForTimeout`,将里面的值调高一些,例如`await chatGPTPage.waitForTimeout(2000);`改为`await chatGPTPage.waitForTimeout(6000);`

## 免责声明

欢迎使用本程序(软件)。在使用本程序(软件)之前，请务必仔细阅读以下免责声明。通过使用本程序(软件)，即表示您同意以下声明的内容。

1. 本程序(软件)仅供个人或企业用户使用，不得用于任何非法目的。用户应遵守当地法律法规，对于使用本程序(软件)所产生的任何违法行为，用户将承担全部法律责任。

2. 本程序(软件)开发者对用户使用本程序(软件)所造成的任何直接或间接损失概不负责，包括但不限于利润损失、数据丢失、业务中断等。用户应自行承担使用本程序(软件)的风险。

3. 本程序(软件)开发者不保证本程序(软件)的功能和服务一定能满足用户的要求，也不保证本程序(软件)不会出现任何错误或缺陷。对于由于使用本程序(软件)而导致的任何问题，本程序(软件)开发者不承担任何责任。

4. 用户理解并同意，本程序(软件)可能会受到各种因素的影响，包括但不限于通讯线路、硬件设备、程序(软件)版本等，因此本程序(软件)开发者不对由此引起的任何故障或问题承担责任。

5. 本程序(软件)开发者保留随时修改、更新本免责声明的权利。用户在使用本程序(软件)的过程中，应定期查阅最新版本的免责声明。

请您在使用本程序(软件)之前，仔细阅读并理解以上免责声明。如果您不同意本免责声明的任何内容，请立即停止使用本程序(软件)。如果您继续使用本程序(软件)，即表示您已充分理解并同意本免责声明的全部内容。

感谢您的配合与支持！
