var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var apikey = require('../dist/apikey');

process.env.NODE_ENV = 'test';

describe('Returns a unique key', function() {
  it('should create a unique api key', function() {
    apikey.create().should.be.a('string');
  });
  it('should pass a good key', function() {
    var test = apikey.validate(1, 12345);
    return expect(Promise.resolve(test)).to.eventually.have.property('result').should.eventually.equal('pass');
  });
  it('should fail a bad key', function() {
    var test = apikey.validate(1, 54321);
    return expect(Promise.resolve(test)).to.eventually.have.property('result').should.eventually.equal('fail');
  });
  it('should pass a good key/save combination', function() {
    var test = apikey.validate(1, 12345, 4);
    return expect(Promise.resolve(test)).to.eventually.have.property('result').should.eventually.equal('pass');
  });
  it('should fail a bad key/save combination', function() {
    var test = apikey.validate(1, 54321, 4);
    return expect(Promise.resolve(test)).to.eventually.have.property('result').should.eventually.equal('fail');
  });
});
