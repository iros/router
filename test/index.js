const BaseRouter = require('../');
const expect = require('chai').expect;

describe('Router', function () {

  describe('::extend', function () {
    it('should allow default routes to be overridden and custom routes to be added', function () {
      var customRoutes = {
        get: {
          '/:id': true, // override existing
          '/test': true // create new
        },
        put: null // replace entire verb
      };
      var router = BaseRouter.extend({
        model: {},
        controller: {},
        routes: customRoutes
      });
      expect(router.get['/:id']).to.equal(customRoutes.get['/:id']);
      expect(router.get['/test']).to.equal(customRoutes.get['/test']);
      expect(router.put).to.equal(customRoutes.put);
    });
  });

  require('./lib/assign_model');
  require('./lib/created_by');
  require('./lib/is_admin');
  require('./lib/is_authenticated');
});
