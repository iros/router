module.exports = function(req, res, next) {
  if (req.account && req.account.isAdmin()) {
    next();
  } else {
    res.code = 401;
    res.data = {
      errors : [
        { message : "Unauthorized", status : "Unauthorized" }
      ]
    };
    next();
  }
};
