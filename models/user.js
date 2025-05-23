const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require("../utils/Errors/UnauthorizedError");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value)
      },
      message: 'You must enter a valid Email address',
    },
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  savedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article',
  }],
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  if (!email || !password) {
    return Promise.reject(new UnauthorizedError('Email and password are required'));
  }

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect email or password');
          }
          return user;
        });
    }).catch(next);
}

module.exports = mongoose.model('user', userSchema);