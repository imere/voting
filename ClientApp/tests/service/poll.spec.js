const supertest = require("supertest");

const API_HOST = "http://localhost:61598";

const request = supertest(API_HOST);

describe("poll", function () {
  let data;

  it("get all success", (done) => {
    request.
      get("/api/v1/poll").
      expect(200).
      expect("Content-Type", /json/).
      end((err, res) => {
        if (err) {
          return done(err); 
        }

        if (res.body.code === 200) {
          data = res.body.data;
          done();
        } else {
          done("get all failed");
        }

      });
  });

  it("get by id success", (done) => {
    if (data.length === 0) {
      return done(); 
    }

    const { id } = data[0];
    request.
      get("/api/v1/poll/" + id).
      expect(200).
      expect("Content-Type", /json/).
      end((err, res) => {
        if (err) {
          return done(err); 
        }

        if (res.body.code === 200 && res.body.data.id === id) {
          done();
        } else {
          done("get by id failed");
        }

      });
  });

  this.afterAll(function () {
    data = null;
  });
});
