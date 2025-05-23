const {CONFLICT} = require("../errorCodes");

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}