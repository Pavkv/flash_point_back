const mongoose = require('mongoose');
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value)
      },
      message: 'You must enter a valid URL',
    },
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value)
      },
      message: 'You must enter a valid URL',
    },
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('article', articleSchema);