#!/usr/bin/sh

cd tests/uirecorder
npx macaca-mocha-parallel-tests \"tests/uirecorder/**/*.spec.js\" --reporter macaca-reporter --reporter-options reportJSONFilename=index --max-parallel 5 --bail
