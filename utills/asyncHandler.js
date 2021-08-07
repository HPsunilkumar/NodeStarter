const { authenticate } = require('./authenticate');

const asyncAuthRistrict = (req, res, next) => {
  // req.model = model;
  Promise
    .resolve(authenticate(req, res, next))
    .catch(next);
};

module.exports = {
  asyncAuthRistrict
};