const { Builder, By, Key, until } = require('selenium-webdriver');

(async function () {
  let code = 0;
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver_百度搜索'), 5000);
  } catch (ex) {
    console.error(ex);
    code = 1;
  } finally {
    await driver.close();
    await driver.quit();
    process.exit(code);
  }
})();
