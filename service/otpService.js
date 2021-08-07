const otpDao = require('../dao/otpDao');

const generateOTP = async (args) => {
  return await otpDao.generateOTP(args);
};

const getOtp = async (args) => {
  return await otpDao.getOtp(args);
};

module.exports = {
  generateOTP,
  getOtp
};
