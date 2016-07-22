const request = require('request');
const baseUrl = 'http://localhost:8080/';
const expect = require('chai').expect;

describe('API Endpoints', () => {
  describe('POST request to /links', () => {
    it('accepts a url and returns a jobID or a status', (done) => {
      request.post({ url: baseUrl + 'links', qs: { url: 'www.massdrop.com' } },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET request to /links', () => {
    it('accepts a jobID and returns a status and/or HTML', (done) => {
      request.get({ url: baseUrl + 'links', qs: { jobID: '1' } },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(isNaN(body)).to.be.true;
          done();
        });
    });
  });
});
