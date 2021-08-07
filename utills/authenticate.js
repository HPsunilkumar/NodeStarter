const passport = require('passport');

const authenticate = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(401).send({ msg: info.message });
    }
    // console.log('----------', req.model);
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  authenticate
};