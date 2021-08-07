class ErrorDispatcher extends Error {
  constructor(error) {
    super(error.message); // (1)
    this.message = error.message;
    this.errorCode = error.errorCode;
    this.log = error.log;
    this.desc = error;
  }
}
module.exports = ErrorDispatcher;