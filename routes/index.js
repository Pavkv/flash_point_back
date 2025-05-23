const router = require('express').Router();
const signup = require('../controllers/register');
const signin = require('../controllers/login');
const {validateAuthentication, validateUser} = require("../middlewares/validation");

router.post('/signup', validateUser(), signup);
router.post('/signin', validateAuthentication(), signin);

module.exports = router;