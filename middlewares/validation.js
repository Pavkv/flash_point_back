const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateEmail = (value, helpers) =>
  validator.isEmail(value) ? value : helpers.error('string.email');

const validateURL = (value, helpers) =>
    validator.isURL(value) ? value : helpers.error('string.uri');

const validateUser = () => celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "username" field is 2',
      "string.max": 'The maximum length of the "username" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      'string.empty': 'The "email" field must be filled in',
      'string.email': 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateArticle = () => celebrate({
  body: Joi.object().keys({
    author: Joi.string().required().messages({
      "string.empty": 'The "author" field must be filled in',
    }),
    date: Joi.date().required().messages({
        "date.base": 'The "date" field must be a valid date',
        "date.empty": 'The "date" field must be filled in',
    }),
    description: Joi.string().required().messages({
        "string.empty": 'The "description" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    url: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "url" field must be filled in',
      'string.uri': 'the "url" field must be a valid url',
    }),
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
  }),
});

const validateAuthentication = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      'string.empty': 'The "email" field must be filled in',
      'string.email': 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports = {
  validateUser,
  validateArticle,
  validateAuthentication,
};