module.exports = function (req, res, next) {
  if (req.account) {
    req.body.account_id = req.account.get('id');
  }
  next();
};
