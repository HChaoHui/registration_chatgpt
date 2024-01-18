let config = {
    RegisteredAddress: ["https://chat.oaifree.com/auth/signup"], // 注册地址，默认使用zhile大佬的https://chat.oaifree.com/，如果有多个以数组的形式存储，例如[xx.com,yy.com,zz.com]
    RegisteredIndex: 0,
    MailAddress: "https://ihotmails.com/", // 注册邮箱地址，Google搜索Forsaken Mail临时邮箱，默认使用https://ihotmails.com/
    headless: "new", // 是否开启浏览器无头模式，为false时为关闭，有问题时可以改为false做调试，查看问题原因
    sitePassword: "", // 如果PandoraNext设置了site_password，填写在这里，没有则为空
    captChaKey: "", // 解决验证码网站的Key
    captChaType: "1", // 选用的解决验证码的类型 1:capsolver 2:yesCaptCha 默认为1
}

module.exports = config
