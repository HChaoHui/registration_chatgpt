# 基于 NodeJs 批量生成 ChatGPT 账号

> node 版本需 >= 18.16.0 小于版本需自测  
> 基于 Pandora-Next 实现不限制 IP 注册  
> 目前默认使用的`https://chat.oaifree.com/auth/signup`(已套 CF),请自行部署 Pandora-Next  
> 目前 PandoraNext 注册账号是由消耗额度为 1:100  
> 基于 capsolver 自动识别验证码  
> 基于 yesCaptCha 自动识别验证码  
> 基于 forsaken Mail 临时邮箱获得随机邮箱与验证码  

## 实现功能

1. 自动获取邮箱，生成密码
2. 注册池，PandoraNext 有注册限制，可以添加多个注册地址，额度不够时自动切换注册地址

## 使用方法（Docker）

1. 拉取docker镜像`docker pull nocn/registration_chatgpt:0.1.1`  
2. 创建一个config文件夹`cd / && mkdir registration_chatgpt_config`  
3. 将`util/config.js`放入`registration_chatgpt_config`里面，目录为`registration_chatgpt_config/config.js`  
4. `registration_chatgpt_config/config.js`，修改里面的`RegisteredAddress`为你搭建 PandoraNext 地址池，`MailAddress`为你搭建的`forsaken Mail`  
5. `registration_chatgpt_config/config.js`，修改里面的`captChaKey`为你验证码平台的 Key  
6. `registration_chatgpt_config/config.js`，修改里面的`captChaType`为你对应的验证码平台，1 为 capsolver 2 为 yesCaptCha  
7.  docker命令
    ```
     docker run -v /registration_chatgpt_config/:/app/config/ --name registration_chatgpt nocn/registration_chatgpt:0.1.1
    ```  
8. 在`registration_chatgpt_config`目录下找到`chatgptAccount.txt` 里面就是生成的账号密码  

## 使用方法（NodeJs）

1. clone 源码 `git clone https://github.com/HChaoHui/registration_chatgpt.git`
2. cd registration_chatgpt
3. npm install
4. `util/config.js`，修改里面的`RegisteredAddress`为你搭建 PandoraNext 地址池，`MailAddress`为你搭建的`forsaken Mail`
5. `util/config.js`，修改里面的`captChaKey`为你验证码平台的 Key
6. `util/config.js`，修改里面的`captChaType`为你对应的验证码平台，1 为 capsolver 2 为 yesCaptCha

capsolver官网：[https://www.capsolver.com/](https://www.capsolver.com/)
capsolver官网可以领取试用的 1 美金，大概可以自动识别 1000 次左右  

yesCaptCha官网：[https://yescaptcha.com/](https://yescaptcha.com/i/nLKXuE)
yesCaptCha官网注册可以找客服领取1500积分试用，识别一次验证码大概要3积分  

forsaken Mail 地址：[forsaken Mail](https://github.com/denghongcai/forsaken-mail)

## 生成单个

1. npm run test
2. 看到创建完成
3. 下面就是自动生成的账号密码

## 生成多个

1. npm run get {num} 例如 `npm run get 10` 批量生成 10 个
2. 看到创建完成后在项目目录下找到`chatgptAccount.txt` 里面就是生成的账号密码

## 可能遇到的问题

1. 报错提示`Could not find Chrome`, 此错误说明电脑环境没有 Chrome, 使用`npx puppeteer browsers install chrome`安装即可
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
