const userDAO = require('../dao/userDao');
const { decriptPassword, encriptPassword } = require('../utills/passwordUtility');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig');
const otpService = require('./otpService');
const mailSubscriptions = require('../subscriptions/mailSubscriptions');

// Returns user if email is present in db, returns false otherwise
const emailExists = async (email) => {
  if(email === '' || email === undefined || email === null) {
    throw new Error('Invaild email provided');
  }
  console.log(email);
  const user = await userDAO.emailExists(email);
  return user || null;
};

const findUserById = async (userId) => {
  if(!userId) {
    throw new Error('Invaild argument userId');
  }
  const user = await userDAO.findUserById(userId);
  return user || null;
};

const userLogin = async ({ email, password }) => {
  const user = await emailExists(email);
  if (!user || !await decriptPassword(password, user.password)) {
    throw new Error('Invaild credentials');
  }
  const token = await jwt.sign({ id: user.id }, jwtSecret.secret, {
    expiresIn: 1000 * 60 * 24
  });
  user.token = token;
  return { ...user.toJSON(), token } || null;
};

const updateUserById = async (args) => {
  const { userId, ...updateValues } = args;
  if(!userId || !findUserById(userId)) {
    throw new Error('Invaild argument userId');
  }
  if (updateValues.password && updateValues.password !== '' && updateValues.password !== null) {
    updateValues.password = await encriptPassword(updateValues.password);
  }
  const user = await userDAO.updateUserById({ userId, ...updateValues });
  return user || null;
};

const createUser = async (args) => {
  const { firstName, lastName, email, password, role = 1 } = args;
  if(!firstName) {
    throw new Error('Invalid argument:firstName');
  }
  if(!lastName) {
    throw new Error('Invalid argument:lastName');
  }
  if(!email) {
    throw new Error('Invalid argument:email');
  }
  if(!password) {
    throw new Error('Invalid argument:password');
  }
  const hashPassword = await encriptPassword(password);
  // if (await emailExists(args.email)) {
  //   throw new Error('Email alreday existed');
  // }
  const user = await userDAO.createUser({ ...args, password: hashPassword, role });
  const otp = await otpService.generateOTP({
    userId: user.id,
    type: 1,
    status: 0,
    matchField: user.email,
    expiryDate: new Date(Date.now() + 7200000).toUTCString()
  });
  const html_template = `<h1>Welcome to Sales companion, one time OTP: ${otp.code}</h1>`;
  await mailSubscriptions.sendMail({ email: user.email, html_template, subject: 'OTP' });
  const html_template2 = 
    `<div style="fontSize: 16px">
      <h1 style="color: blue">
       New user registration with Sales Companion
      </h1>
      <br />
      Name: ${user.firstName}
      <br />
      Email: ${user.email}
      <br />
    </div>`;
  await mailSubscriptions.sendMail({ email: 'help.mysalescompanion@gmail.com', html_template: html_template2, subject: 'New user registration with Sales Companion :)' });
  return user || null;
};

module.exports = {
  userLogin,
  emailExists,
  createUser,
  findUserById,
  updateUserById
};
