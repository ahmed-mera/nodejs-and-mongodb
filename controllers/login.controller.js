const model = require("../models/login_signup.module")

/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * @returns html page {@link HTMLDocument}
 */
exports.getLogin = (req, res, next) => {
    res.render('login', { title: 'login', error : req.flash('error')[0] })
}


/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * if all okay 'll redirect at home else 'll send an error exception {@link Error}
 */
exports.postLogin =  (req, res, next) => {
    model.getUser(req.body).then(data => {
        req.session.userId = data._id;
        res.redirect("/")
    }).catch(err => {
        req.flash("error", err);
        res.redirect("/login")
    })
}
