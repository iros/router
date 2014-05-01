module.exports = function(req, res, next) {
  if (req.account && req.account.isAdmin()) {
    next();
  } else {
    res.send(401);
  }
};
