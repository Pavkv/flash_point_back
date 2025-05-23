const router = require('express').Router();
const getArticles = require('../controllers/getArticles');

router.get('/articles', getArticles);

module.exports = router;