#!/usr/bin/sh

cp ./node_modules/chromedriver/lib/chromedriver/chromedriver ./ChromeDriver && node ./tests/e2e/baidu.spec.js