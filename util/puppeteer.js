const config = require("./config")
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const pathToExtension = require('path').join(__dirname, '../plugin/CapSolver.Browser.Extension');
puppeteer.use(StealthPlugin());

let puppeteerConfig = {
    headless: config.headless,
    args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
    ],
    executablePath: executablePath()
}
module.exports = {
    puppeteer,
    puppeteerConfig
}