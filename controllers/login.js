const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../utils/config');
const BadRequestError = require("../utils/Errors/BadRequestError");
const UnauthorizedError = require("../utils/Errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const {email, password} = req.body;

  User.findUserByCredentials(email, password, next)
    .then((user) => {
      res.send({
        token: jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "7d",})
      });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data provided'));
      }
      if (err.name === 'UnauthorizedError') {
        next(new UnauthorizedError('Invalid email or password'));
      }
      next(err);
    });
};