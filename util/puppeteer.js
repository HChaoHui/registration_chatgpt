const config = require("./config")
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const fs = require("fs")
let pathToExtension;
let configPath;
let configPathData;
let configResult;

switch (config.captChaType) {
    case "1":
        pathToExtension = require('path').join(__dirname, '../plugin/CapSolver.Browser.Extension');
        configPath = require('path').join(__dirname, '../plugin/CapSolver.Browser.Extension/assets/config.js');
        configPathData = fs.readFileSync(configPath, 'utf8');
        configResult = configPathData.replace(/apiKey: ''/g, `apiKey: '${config.captChaKey}'`,);
        break;

    case "2":
        pathToExtension = require('path').join(__dirname, '../plugin/YesSolver.Browser.Extension');
        configPath = require('path').join(__dirname, '../plugin/YesSolver.Browser.Extension/config.js');
        configPathData = fs.readFileSync(configPath, 'utf8');
        configResult = configPathData.replace(/clientKey: ''/g, `clientKey: '${config.captChaKey}'`,);
        break;

    default:
        break;
}

fs.writeFileSync(configPath, configResult, 'utf8');

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