const User = require('../models/user');
const Article = require('../models/article');
const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");

module.exports = (req, res, next) => {
    const { url } = req.query;

    Article.findOne({ url })
        .then((article) => {
            if (!article) throw new NotFoundError('Article not found');

            return User.findByIdAndUpdate(
                req.user._id,
                { $pull: { savedArticles: article._id } },
                { new: true }
            ).populate('savedArticles')
                .then((user) => {
                    return User.countDocuments({ savedArticles: article._id })
                        .then((count) => {
                            if (count === 0) {
                                return Article.findByIdAndDelete(article._id);
                            }
                        })
                        .then(() => res.send({ data: user.savedArticles }));
                });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new BadRequestError('Invalid article reference'));
            } else {
                next(err);
            }
        });
};