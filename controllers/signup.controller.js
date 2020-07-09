const modelSignUp = require("../modules/signup.module")

/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * @returns html page {@link HTMLDocument}
 */
exports.getSignUp= (req, res, next) => res.render('signup', { title: 'Sign up' })



/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * if all okay 'll redirect at home else 'll send an error exception {@link Error}
 */
exports.postLogin =  (req, res, next) => {
    modelSignUp.addUser({username : req.body.username, password : req.body.password}).then(data => {
        req.session.id = data._id;
        console.log(req.session.id )
        res.redirect("/")
    }).catch(err => {
        console.log("error " + err)
        res.send(new Error("error " + err))
    })
}