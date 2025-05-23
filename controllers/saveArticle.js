const Article = require('../models/article');
const User = require('../models/user');
const BadRequestError = require("../utils/Errors/BadRequestError");

module.exports = (req, res, next) => {
    Article.findOne({ url: req.body.url })
        .then((existing) => {
            if (existing) return existing;
            return Article.create(req.body);
        })
        .then((article) => {
            return User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { savedArticles: article } },
                { new: true }
            ).populate('savedArticles');
        })
        .then((updatedUser) => res.send({ data: updatedUser.savedArticles }))
        .catch(err => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Invalid data provided for article saving'));
            } else {
                next(err);
            }
        });
};