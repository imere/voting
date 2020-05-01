const Mocha = require('mocha');

const mocha = new Mocha({
  'reporter': 'mochawesome',
  'reporterOptions': {
    'reportDir': 'docs/coverage/mochawesome'
  }
});

require('fs').readdirSync('./tests/service', { 'encoding': 'utf-8' }).forEach(function (v) {
  if (v.endsWith('.spec.js')) {
    mocha.addFile('./tests/service/' + v);
  }
});

mocha.run(process.exit.bind(process));
