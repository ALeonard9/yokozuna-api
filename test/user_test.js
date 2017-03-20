var expect = require('chai').expect;
var user = require('../dist/user');


var test = user.create('user@test', '55555');

test.then(function(data) {
    describe('Allows CRUD operations on user table', function() {
      it('should create user', function() {
        return expect(Promise.resolve(data)).to.eventually.have.property('insertId').should.eventually.be.an('number');
      });
      it('should return an api key', function() {
        return expect(Promise.resolve(data)).to.eventually.have.property('apikey').should.eventually.be.an('string');
      })
    })
  })
test.then(function(data) {
  user.delete(data['insertId']);
})
