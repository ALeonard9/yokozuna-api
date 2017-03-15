var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var rikishi = require('../dist/rikishi');

describe('Allows CRUD operations on rikishi table', function() {
  it('should create rikishi', function() {
    var test = rikishi.createUserRikishi(2, 2, 2, 'us');
    return expect(Promise.resolve(test)).to.eventually.have.property('insertId').should.eventually.be.an('number');
  });
  // it('should delete save', function() {
  //   var test = save.delete(1)
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
