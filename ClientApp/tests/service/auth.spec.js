const supertest = require('supertest');

const API_HOST = 'http://localhost:61598';

const request = supertest(API_HOST);

describe('authentication', function () {
  it('login failed with wrong credentials', (done) => {
    request.
      post('/api/user/login').
      send({ username: 'wrongusernameusername', password: 'wrongpasswordpassword' }).
      expect(400).
      end(done);
  });

  it('logout failed without Authentication', (done) => {
    request.
      post('/api/user/logout').
      expect(401).
      end(done);
  });

  it('unregister failed without Authentication', (done) => {
    request.
      delete('/api/user').
      expect(401).
      end(done);
  });
});
