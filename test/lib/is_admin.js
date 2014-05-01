const isAdmin = require('../../lib/is_admin');
const expect = require('chai').expect;

describe('isAdmin', function () {

  it('sends 401 if the current account is not an administrator', function () {
    var req = {account:this.account};
    var res = {send:function(code){this.code=code;}};
    isAdmin(req, res);
    expect(res.code).to.equal(401);
  });

  it('calls next if the current account is an administrator', function (done) {
    var req = {account:{isAdmin:function(){return true;}}};
    isAdmin(req, {}, done);
  });

});
