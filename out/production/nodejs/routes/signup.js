const router = require('express').Router();
const controllerSignUp = require("../controllers/signup.controller")

/* GET login page. */
router.get('/', controllerSignUp.getSignUp)

/* POST login page. */
router.post('/',controllerSignUp.postSignUp)

module.exports = router;
