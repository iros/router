const AssignModel = require('../../lib/assign_model');
const expect = require('chai').expect;

describe('AssignModel', function () {

  it('sets the provided model on req.Model', function (done) {
    var model = {id:1,name:'model'};
    var req = {};
    AssignModel(model)(req, {}, function () {
      expect(req.Model).to.equal(model);
      done();
    });
  });

});
