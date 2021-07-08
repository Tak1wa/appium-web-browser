const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    // platformName: "Android",
    // platformVersion: "9",
    // deviceName: "Android Emulator",
    // browserName: "Chrome",
    // automationName: "UiAutomator2"
    // platformName: "iOS",
    // platformVersion: "14.5",
    // deviceName: "iPhone 8",
    // browserName: "Safari",
    // automationName: "XCUITest"
  }
};

const DEFAULT_TIMEOUT = 15000;
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
async function main () {
  const client = await wdio.remote(opts);

  await client.url("https://classmethod.jp/");

  const menuButton = await client.$(".header__menu");
  await menuButton.waitForDisplayed({timeout: DEFAULT_TIMEOUT});
  await sleep(3000);
  await client.saveScreenshot(process.env.SCREENSHOT_PATH + "/1.png");

  await menuButton.click();

  await sleep(2000);
  //await client.touchScroll(0, 500);
  await sleep(1000);

  const siryoButton = await client.$('a[href="/download/company-overview/"]');
  await siryoButton.waitForDisplayed({timeout: DEFAULT_TIMEOUT});
  await client.saveScreenshot(process.env.SCREENSHOT_PATH + "/2.png");

  await siryoButton.click();
  await sleep(5000);
  await client.saveScreenshot(process.env.SCREENSHOT_PATH + "/3.png");

  await sleep(10000); //add

  await client.deleteSession();
}

main();