exports.assignModel = require('./lib/assign_model');
exports.createdBy = require('./lib/created_by');
exports.isAdmin = require('./lib/is_admin');
exports.isAuthenticated = require('./lib/is_authenticated');

exports.extend = function (opts) {
  if (!opts.model) {
    throw new Error('You must provide a model.');
  }
  if (!opts.controller) {
    throw new Error('You must provide a controller.');
  }
  var model = opts.model;
  var controller = opts.controller;
  var routes = opts.routes;
  var result = {};
  var baseRouter = {
    all: {
      '*': [
        exports.isAuthenticated,
        exports.assignModel(model)
      ]
    },
    get: {
      '/': [
        controller.findMany,
        controller.serialize
      ],
      '/:id': [
        controller.findById,
        controller.serialize
      ],
    },
    post: {
      '/': [
        exports.createdBy,
        controller.create,
        controller.serialize
      ],
    },
    put: {
      '/:id': [
        controller.findById,
        controller.update,
        controller.serialize
      ]
    },
    delete: {
      '/:id': [
        exports.isAuthenticated,
        controller.findById,
        controller.destroyCascade
      ]
    }
  };
  if (!routes) {
    result = baseRouter;
  } else {
    // merge routes manually
    Object.keys(baseRouter).forEach(function (verb) {
      var baseVerb = baseRouter[verb];
      if(!routes[verb]) {
        routes[verb] = baseVerb;
      } else {
        // completely remove verbs which are nulled
        if (routes[verb] === null) {
          delete routes[verb];
        } else {
          // otherwise, combine them
          Object.keys(baseVerb).forEach(function (endpoint) {
            if(!routes[verb][endpoint]) {
              routes[verb][endpoint] = baseVerb[endpoint];
            }
          });
        }
      }
    });
    // awful hack to ensure that the insertion order of the
    // merged object has the 'all' verb first to ensure things
    // work properly for express.
    var verbs = Object.keys(routes);
    verbs.splice(0, 0, verbs.splice(verbs.indexOf('all'),1)[0]);
    verbs.forEach(function (verb) {
      result[verb] = routes[verb];
    });
  }
  return result;
};
