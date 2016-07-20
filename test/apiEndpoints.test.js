import request from 'request';
const baseUrl = 'http://localhost:8080';
import { expect } from 'chai';

describe('API Endpoints', () => {
  describe('POST request to /links', () => {
    it('accepts a url and returns a jobID', (done) => {
      request.post({ url: baseUrl + 'links', formData: { url: 'www.massdrop.com' } },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(isNan(body)).to.be.false;
          done();
        });
    });
  });

  describe('GET request to links', () => {
    it('accepts a jobID and returns a status and/or HTML', (done) => {
      request.get({url:  baseUrl + 'links', formData: { jobID: 1 } },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(isNan(body)).to.be.false;
          done();
        });
    });
  });
})
