const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('GET request /api/convert with valid input', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.body.initNum, 10)
        assert.equal(res.body.initUnit, 'L')
        assert.equal(res.body.returnNum, 2.64172)
        assert.equal(res.body.returnUnit, 'gal')
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons')
        done();
      })
  })

  test('GET request /api/convert with invalid unit', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit')
      })
    done();
  })

  test('GET request /api/convert with invalid input', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number')
      })
    done();
  })


  test('GET request /api/convert with invalid input and unit', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit')
      })
    done();
  })

  test('GET request /api/convert with no number', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.body.initNum, 1)
        assert.equal(res.body.initUnit, 'kg')
        assert.equal(res.body.returnNum, 2.20462)
        assert.equal(res.body.returnUnit, 'lbs')
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds')
      })
    done();
  })

});
