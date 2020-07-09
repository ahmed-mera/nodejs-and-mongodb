const router = require('express').Router();
const controllerLogin = require("../controllers/login.controller")

/* GET login page. */
router.get('/', controllerLogin.getLogin)

/* POST login page. */
router.post('/',controllerLogin.postLogin)

module.exports = router;
