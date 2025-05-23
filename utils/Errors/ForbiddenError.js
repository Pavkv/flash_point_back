const {FORBIDDEN} = require("../errorCodes");

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}