# 基于NodeJs 18
FROM node:18

# 作者信息
LABEL author="HChaoHui"
LABEL github="https://github.com/HChaoHui"
LABEL version="1.0"

# 更新
RUN apt-get update

# 安装 libnss3
RUN apt-get install -y libnss3

# 安装 libatk1.0-0
RUN apt-get install -y libatk1.0-0

# 安装 libatk-bridge2.0-0
RUN apt-get install -y libatk-bridge2.0-0

# 安装 libcups2
RUN apt-get install -y libcups2

# 安装 libdrm2
RUN apt-get install -y libdrm2

# 安装 libxkbcommon0
RUN apt-get install -y libxkbcommon0

# 安装 libXcomposite
RUN apt-get install -y libxcomposite1

# 安装 libXdamage
RUN apt-get install -y libxdamage1

# 安装 libXfixes
RUN apt-get install -y libxfixes3

# 安装 libXrandr
RUN apt-get install -y libxrandr2

# 安装 libgbm
RUN apt-get install -y libgbm1

# 安装 libasound
RUN apt-get install -y libasound2

# 设置工作目录
WORKDIR /app

# 将当前目录下的所有文件复制到工作目录
COPY . .

# 设置环境变量，跳过puppeteer下载 Chrome浏览器
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# 使用淘宝镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装应用依赖
RUN npm install

# 安装chrome
RUN npx puppeteer browsers install chrome

# 定义启动命令
CMD ["npm", "run", "get"]