const User = require('../models/user');
const NotFoundError = require("../utils/Errors/NotFoundError");

module.exports = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('User not found'))
    .then(user => res.send({data: user}))
    .catch(next);
};