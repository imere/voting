const Mocha = require('mocha');

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'docs/mochawesome'
  }
});

require('fs').readdirSync('./tests/service', { encoding: 'utf-8' }).forEach(function (v) {
  if (/\.spec\.js$/.test(v)) mocha.addFile('./tests/service/' + v);
});

mocha.run(process.exit);
