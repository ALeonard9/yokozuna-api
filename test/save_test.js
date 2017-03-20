var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var save = require('../dist/save');
var user = require('../dist/user');
var rikishi = require('../dist/rikishi');

user.create('save@test', '55555')
  .then((data) => {
    var test = save.create(data['insertId'])
      .then((data2) => {
        rikishi.createUserRikishi(data2['insertId'], 2, 2, 'us')
          .then((data3) => {
            describe('Allows CRUD operations on save table', function() {
              it('should create save', function() {
                data2['insertId'].should.be.an('number');
              });
              it('should update the rikishi', function() {
                var test2 = save.update(data2['insertId'], {rikishi_id: data3['insertId']});
                return expect(Promise.resolve(test2)).to.eventually.have.property('insertId').should.eventually.be.an('number');
              });
              it('should create rikishi', function() {
                data3['insertId'].should.be.an('number');
              });
            });
          save.delete(data2['insertId'])
            .then((data4) => {
              describe('Allows delete operations on save table', function() {
                it('should delete save', function() {
                  data2['insertId'].should.be.an('number');
                });
              });
            })
            .then((data4) => {
              user.delete(data['insertId']);
            })
          });
      });
  });
