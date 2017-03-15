var expect = require('chai').expect;
var user = require('../dist/user');

describe('Allows CRUD operations on user table', function() {
  var test = user.create('user@test', '55555');

  it('should create user', function() {
    return expect(Promise.resolve(test)).to.eventually.have.property('insertId').should.eventually.be.an('number');
  });
  it('should return an api key', function() {
    return expect(Promise.resolve(test)).to.eventually.have.property('apikey').should.eventually.be.an('string');
  });
});
