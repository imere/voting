const supertest = require('supertest');

const app = require('../../server/index.js');

let server;

const request = () => supertest(server = app.listen(3000))

describe('api', function () {

  it('koa api success', function (done) {
    request()
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        if (res.body.data === 'x') {
          done();
        } else {
          done(new Error('unconformant'));
        }
      })
  });

  this.afterAll(done => {
    server.close(done);
  })

})
