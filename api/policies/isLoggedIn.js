module.exports = function isLoggedIn(req, res, next) {

  if (req.session.userId) {
    return next();
  }

  return res.json({
    status: 'clientError',
    code: 401,
    body: {
      error: 'User ir not authorized'
    }
  });
};
