const { INTERNAL_SERVER_ERROR } = require('../utils/errorCodes');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: message || 'An error occurred on the server'
  });
  next();
}