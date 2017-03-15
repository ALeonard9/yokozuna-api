var expect = require('chai').expect;
var meta = require('../dist/meta');

describe('Displays version of api code', function() {
  it('should pass if a version is passed back', function() {
    var test = meta.versionJSON();
    expect(test['version']).to.equal('0.0.1');
    expect(test).to.be.an('object');
  });
});

describe('Displays package.json contents', function() {
  it('should pass if a package is passed back', function() {
    var test = meta.packageJSON();
    expect(test['name']).to.equal('yokozuna-api');
    expect(test).to.be.an('object');
  });
});
