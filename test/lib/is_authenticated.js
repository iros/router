const isAuthenticated = require('../../lib/is_authenticated');
const expect = require('chai').expect;

describe('isAuthenticated', function () {

  it('sends 403 if no account is logged in', function () {
    var res = {send:function(code){this.code=code;}};
    isAuthenticated({}, res);
    expect(res.code).to.equal(403);
  });

  it('calls next if there is an account logged in', function (done) {
    var req = {account:{isAdmin:function(){return true;}}};
    isAuthenticated(req, {}, done);
  });

});
