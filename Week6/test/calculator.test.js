// test/calculator.test.js
// Automated tests for SIT725 Week6 project
// Uses Mocha + Chai + Request

const { expect } = require("chai");
const request = require("request");

describe("Week6 Project API Tests", function () {
  const baseUrl = "http://localhost:3000";

  // 1. Homepage should load
  it("GET / should return index.html (status 200)", function (done) {
    request.get(baseUrl, (error, response, body) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("<!DOCTYPE html>");
      done();
    });
  });

  // 2. /add works with valid numbers
  it("GET /add should return correct sum for valid inputs", function (done) {
    request.get(`${baseUrl}/add?a=10&b=5`, (error, response, body) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("15"); // Should contain the sum
      done();
    });
  });

  // 3. /add rejects non-numeric input
  it("GET /add should return 400 for non-numeric input", function (done) {
    request.get(`${baseUrl}/add?a=hello&b=world`, (error, response, body) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(400);
      expect(body).to.include("Invalid input");
      done();
    });
  });

  // 4. /api/projects returns JSON structure
  it("GET /api/projects should return JSON with data array", function (done) {
    request.get(`${baseUrl}/api/projects`, (error, response, body) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);

      const json = JSON.parse(body);
      expect(json).to.have.property("statusCode", 200);
      expect(json).to.have.property("data").that.is.an("array");
      expect(json).to.have.property("message");
      done();
    });
  });

  // 5. /api/projects creates a new project
  it("POST /api/projects should create a project (status 201)", function (done) {
    const newProject = {
      title: "Automated Test Project",
      image: "/images/kitten1.jpg",
      link: "https://example.com",
      description: "Created during Mocha test"
    };

    request.post(
      {
        url: `${baseUrl}/api/projects`,
        json: true,
        body: newProject
      },
      (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(201);
        expect(body).to.have.property("statusCode", 201);
        expect(body).to.have.property("data");
        expect(body.data).to.include({
          title: newProject.title,
          image: newProject.image,
          link: newProject.link,
          description: newProject.description
        });
        done();
      }
    );
  });
});