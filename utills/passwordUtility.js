const bcrypt = require('bcrypt');
const saltRounds = 10;

const encriptPassword = (plainText) => {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(plainText, saltRounds).then(function (hash) {
      resolve(hash);
    }).catch(function () {
      reject(null);
    });
  });
};

const decriptPassword = (plainText, password) => {
  return new Promise(function (resolve, reject) {
    if(plainText === null) {
      reject(false);
    }
    bcrypt.compare(plainText, password).then(function (isvalid) {
      resolve(isvalid);
    }).catch(function (err) {
      console.log(err);
      reject(false);
    });
  });
};

module.exports = {
  encriptPassword,
  decriptPassword
};