const exec = require('child_process').exec;
// export SONAR_SCANNER_MIRROR=https://npm.taobao.org/mirrors/sonar-scanner/

try {
  exec('cd tests/quality && sonar-scanner', { 'encoding': 'utf-8' }).stdout.pipe(process.stdout);
} catch {
  if ('win32' === process.platform) {
    exec('cd tests/quality && %SONAR_RUNNER_HOME%\\bin\\sonar-scanner', { 'encoding': 'utf-8' }).stdout.pipe(process.stdout);
  } else {
    exec('cd tests/quality && ${SONAR_RUNNER_HOME}/sonar-scanner', { 'encoding': 'utf-8' }).stdout.pipe(process.stdout);
  }
}
