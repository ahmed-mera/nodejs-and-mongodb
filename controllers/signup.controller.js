const modelSignUp = require("../models/login_signup.module")

/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * @returns html page {@link HTMLDocument}
 */
exports.getSignUp = (req, res, next) => {
    res.render('signup', { title: 'Sign up', error : req.flash("error")[0] })
}



/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * if all okay 'll redirect at home else 'll send an error exception {@link Error}
 */
exports.postSignUp =  (req, res, next) => {
    modelSignUp.addUser({username : req.body.username, password : req.body.password}).then(data => {
        res.redirect("/login")
    }).catch(err => {
        req.flash("error", err);
        res.redirect("/signup")

        // // will be redirect to login
        // setTimeout(_ => {
        //     // set value of error
        //     req.flash("error", null);
        //     // redirect to login
        //     res.redirect("/login")
        // }, 5000)

    })
}
