var expect = require('chai').expect;
var user = require('../dist/user');

describe('Allows CRUD operations on user table', function() {
  it('should create user', function() {
    var test = user.create();
    expect(test).to.be.an('number');
  });
  // it('should read user', function() {
  //
  // });
  // it('should update user', function() {
  //
  // });
  // it('should delete user', function() {
  //
  // });

});
