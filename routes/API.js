const router = require('express').Router();
const controllerAPI = require("../controllers/users.API.controller")

/* GET all user. */
router.get('/', controllerAPI.getAllUsers)

/* POST all user. */
router.post('/',controllerAPI.getAllUsers)

/* GET user. */
router.get('/user', controllerAPI.getUserByUsername)

/* POST user. */
router.post('/user',controllerAPI.getUserByUsername)

module.exports = router;
