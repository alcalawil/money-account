const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("should respond with 200", done => {
    request(app)
      .get("/api/v1/status")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
