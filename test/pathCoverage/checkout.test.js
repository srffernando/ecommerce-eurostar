const request = require('supertest');
const { expect } = require('chai');

describe('Checkout Tests - Path Coverage', function () {
  const baseURL = 'http://localhost:5432';
  let authToken;

  before(function (done) {
    // Login to get authentication token
    const credentials = {
      email: 'bob@example.com',
      password: 'password123'
    };

    request(baseURL)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(credentials)
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.body.token;
        done();
      });
  });

  describe('POST /api/checkout', function () {
    it('should checkout with cash payment and return 200 with order details', function (done) {
      // Using test data from README.md - Products and cash payment method
      const checkoutRequest = {
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 }
        ],
        paymentMethod: 'cash'
      };

      request(baseURL)
        .post('/api/checkout')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken)
        .send(checkoutRequest)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('items');
          expect(res.body).to.have.property('paymentMethod');
          expect(res.body).to.have.property('subtotal');
          expect(res.body).to.have.property('discount');
          expect(res.body).to.have.property('total');
          expect(res.body.items).to.be.an('array');
          expect(res.body.items.length).to.equal(2);
          expect(res.body.paymentMethod).to.equal('cash');
          // Cash payment should have 10% discount
          expect(res.body.discount).to.be.greaterThan(0);
          expect(res.body.total).to.equal(res.body.subtotal - res.body.discount);
          done();
        });
    });
  });
});
