const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "11",
    deviceName: "Android Emulator",
    //app: "/Users/iwasa.takahito/Downloads/ApiDemos-debug.apk",
    //appPackage: "io.appium.android.apis",
    //appActivity: ".view.TextFields",
    browserName: "Chrome",
    automationName: "UiAutomator2"
  }
};

async function main () {
  const client = await wdio.remote(opts);

  Feature
  client.get();
  const field = await client.$("android.widget.EditText");
  await field.setValue("Hello World!");
  const value = await field.getText();
  assert.strictEqual(value,"Hello World!");

  await client.deleteSession();
}

main();