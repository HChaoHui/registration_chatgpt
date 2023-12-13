# 基于NodeJs批量生成ChatGPT账号 
> node版本需 >= 18.16.0 小于版本需自测

最近Pandora-Next开放了注册
![iShot_2023-12-13_13.40.37.png][1]

对于国内注册又方便了一些  
针对于这个写了一个自动注册的脚本  
方便使用一些

## 使用方法

1. clone 源码 `git clone https://github.com/HChaoHui/registration_chatgpt.git`  
2. cd registration_chatgpt
3. npm install

## 生成单个  

1. npm run test
2. 看到创建完成
3. 下面就是自动生成的账号密码

## 生成多个  

1. npm run get {num} 例如 `npm run get 10` 批量生成10个
2. 看到创建完成后在项目目录下找到`chatgptAccount.txt` 里面就是生成的账号密码


