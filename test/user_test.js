var expect = require('chai').expect;
var user = require('../dist/user');

describe('Allows CRUD operations on user table', function() {
  var test = user.create('adam@adam', 'pword123');

  it('should create user', function() {
    return expect(Promise.resolve(test)).to.eventually.have.property('insertId').should.eventually.be.an('number');
  });
  it('should return an api key', function() {
    return expect(Promise.resolve(test)).to.eventually.have.property('apikey').should.eventually.be.an('string');
  });
  // it('should delete user', function() {
  //   var test = user.delete(1)
  //     .then((data)=> {
  //       expect(test).to.be.an('object');
  //       expect(test['insertId']).to.be.an('number');
  //     });
  // });
  // it('should update user', function() {
  //
  // });
  // it('should delete user', function() {
  //
  // });

});
