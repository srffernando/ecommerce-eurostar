const request = require('supertest');
const { expect } = require('chai');

describe('Health Check Tests - Path Coverage', function () {
  const baseURL = 'http://localhost:5432';

  it('GET /api/healthcheck should return 200 with status ok', function (done) {
    request(baseURL)
      .get('/api/healthcheck')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('ok');
        done();
      });
  });
});
