const router = require('express').Router();
const getArticles = require('../controllers/getArticles');

router.get('/', getArticles);

module.exports = router;