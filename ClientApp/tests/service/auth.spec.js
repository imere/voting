const supertest = require("supertest");

const API_HOST = "http://localhost:61598";

const request = supertest(API_HOST);

describe("authentication", function () {
  it("login success", done => {
    request
      .post("/api/user/login")
      .send({username: "username", password: "password"})
      .expect(200)
      .end(done);
  })

  it("login failed with redirect", done => {
    request
      .post("/api/user/login")
      .send({username: "usernameusername", password: "passwordpassword"})
      .expect(302)
      .end(done);
  })

  it("logout failed without Authentication", done => {
    request
      .post("/api/user/logout")
      .expect(401)
      .end(done);
  })

  it("unregister failed without Authentication", done => {
    request
      .delete("/api/user")
      .expect(401)
      .end(done);
  })
})
