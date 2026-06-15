const request = require('supertest');
const { expect } = require('chai');

describe('Auth Tests - Path Coverage', function () {
  const baseURL = 'http://localhost:5432';

  describe('POST /api/register', function () {
    it('should register a new user and return 201 with token', function (done) {
      const newUser = {
        username: 'testuser_' + Date.now(),
        email: 'testuser_' + Date.now() + '@example.com',
        password: 'testpassword123'
      };

      request(baseURL)
        .post('/api/register')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id');
          expect(res.body.user).to.have.property('username');
          expect(res.body.user).to.have.property('email');
          expect(res.body.user.username).to.equal(newUser.username);
          expect(res.body.user.email).to.equal(newUser.email);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('POST /api/login', function () {
    it('should login existing user and return 200 with token', function (done) {
      // Using test data from README.md
      const credentials = {
        email: 'alice@example.com',
        password: 'password123'
      };

      request(baseURL)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(credentials)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user).to.have.property('id');
          expect(res.body.user).to.have.property('username');
          expect(res.body.user).to.have.property('email');
          expect(res.body.user.email).to.equal(credentials.email);
          expect(res.body.user.username).to.equal('alice');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });
});
