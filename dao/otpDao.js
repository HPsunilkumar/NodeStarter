const Sequelize = require('sequelize');
const db = require('../models');
const Op = Sequelize.Op;

const makeid = (length) => {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateOTP = async (args) => {
  const { userId, type, status = 0, expiryDate, target } = args;

  const otp = await db.otp.create({
    code: makeid(5),
    userId,
    type,
    status,
    target,
    expiryDate
  });
  return otp;
};

const getOtp = async (args) => {
  const { type, status = 0, otp } = args;
  const otpData = await db.otp.findOne({
    where: {
      status,
      type,
      otp,
      expiryDate: {
        [Op.gte]: new Date()
      }
    }
  });
  return otpData;
};

module.exports = {
  generateOTP,
  getOtp
};