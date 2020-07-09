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
 * if all okay 'll redirect at home else 'll send an error exception {@link Error}
 */
exports.postLogin =  (req, res, next) => {
    modelLogin.getUser(req.body).then(data => {
        req.session.userId = data._id;
        res.redirect("/")
    }).catch(err => res.send(new Error(err)))
}