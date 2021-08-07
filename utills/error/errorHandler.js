const fs = require('fs');
const dotenv = require('dotenv');

class ReadError {
	static envConfig = dotenv.parse(fs.readFileSync('.env.errors'));
  static getErrorCode(key) {
    return this.envConfig[key];
  }
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler', next);
  // log it
  // if (!test) console.error(err.stack);
  console.log(ReadError.getErrorCode('1'));
  console.log(ReadError.getErrorCode('1'));
  // respond with 500 "Internal Server Error".
  console.log(JSON.stringify(err));
  res.status(500);
  res.send(err);
}
module.exports = errorHandler;
