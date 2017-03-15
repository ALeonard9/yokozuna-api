var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var save = require('../dist/save');

describe('Allows CRUD operations on save table', function() {
  it('should create save', function() {
    var test = save.create(1);
    return expect(Promise.resolve(test)).to.eventually.have.property('insertId').should.eventually.be.an('number');
  });
  it('should update the rikishi', function() {
    var test = save.update(2, {rikishi_id: 2});
    return expect(Promise.resolve(test)).to.eventually.have.property('insertId').should.eventually.be.an('number');
  });
  // it('should update user', function() {
  //
  // });
  // it('should delete user', function() {
  //
  // });

});
