const index = require("../index.js");
const should = require("should");
const assert = require("assert");
const expect = require("chai").expect;
const axios = require("axios").default;
const supertest = require("supertest");

const server = supertest.agent("localhost:3030");

describe("Test NODE_JS_REST", () => {
  it("testing GET", (done) => {
    server.get("/reports").end((err, res) => {
      res.status.should.equal(200);
      done();
    });
  });
  it("testing POST", (done) => {
    server
      .post("/reports")
      .send({ license_plate: "8888888", driver_id: 3333, speed: 222 })
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
  });
  it("testing PUT", (done) => {
    server
      .put("/reports/4")
      .send({ license_plate: "3333333", driver_id: 2222, speed: 111 })
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
  });
  it("testing DELETE", (done) => {
    server
      .delete("/reports/1")
      .send({ license_plate: "7541313", driver_id: 5574, speed: 130 })
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});