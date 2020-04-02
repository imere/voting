const fs = require('fs');
const path = require('path');

const o = {
  'from': [
    path.join(__dirname, '../../', 'web/public/manifest.json'),
    path.join(__dirname, '../../', 'dist/manifest.json'),
  ],
  'to': path.join(__dirname, '../../', 'dist/manifest.json')
};

const output = {};
for (const p of o.from) {
  Object.assign(output, JSON.parse(
    fs.readFileSync(p, { 'encoding': 'utf-8' })
  ));
}
fs.writeFileSync(o.to, JSON.stringify(output, null, 4), { 'encoding': 'utf-8' });
