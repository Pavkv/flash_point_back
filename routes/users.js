const router = require('express').Router();
const getCurrentUser = require('../controllers/getCurrentUser');
const getArticles = require('../controllers/getArticles');
const saveArticle = require('../controllers/saveArticle');
const unsaveArticle = require('../controllers/unsaveArticle');
const auth = require('../middlewares/auth');
const { validateArticle } = require('../middlewares/validation');

router.get('/me', auth, getCurrentUser);
router.get('/me/savedArticles', auth, getArticles);
router.post('/me/savedArticles', auth, validateArticle(), saveArticle);
router.delete('/me/savedArticles', auth, unsaveArticle);


module.exports = router;