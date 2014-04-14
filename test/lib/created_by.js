const CreatedBy = require('../../lib/created_by');
const expect = require('chai').expect;

describe('CreatedBy', function () {

  it('sets body.account_id to the id of the logged in user', function (done) {
    var account = {
      get: function (param) {
        if(param === 'id') {
          return 1;
        }
      }
    };
    var req = {account:account,body:{}};
    CreatedBy(req, {}, function () {
      expect(req.body.account_id).to.equal(1);
      done();
    });
  });

});
