const modelLogin = require("../modules/login.module")

/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * @returns html page {@link HTMLDocument}
 */
exports.getLogin = (req, res, next) => {
    // modelLogin.getAllUsers().then(users => console.log(users)).catch(err => console.log(err))
    res.render('login', { title: 'login' })
}


/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * @returns html page {@link HTMLDocument}
 */
exports.postLogin =  (req, res, next) => {
    modelLogin.getUser(req.body).then(data => {
        req.session.id = data._id;
        res.redirect("/", 200)
    }).catch(err => new Error(err))
}