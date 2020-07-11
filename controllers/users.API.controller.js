const model = require("../models/login_signup.module")
const constantsAPI = require("../constants/APIConstant")
const JWT  = require("jsonwebtoken")

const uniqid = () => Math.random().toString(16).slice(2)+(new Date()).getTime()+Math.random().toString(16).slice(2);

const ID = uniqid();

const TOKEN = JWT.sign({
     id : ID,
}, constantsAPI.SECRET, {
    expiresIn: "1h"
})


/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * will send th response in json
 */
exports.getAllUsers = (req, res, next) => {
    model.getAllUsers().then( data => {
        res.json({
            token : TOKEN,
            data : data
        })
    }).catch(err => {
        res.json({
           error : err
        })
    })
}

/**
 * function to control the request
 * @param req
 * @param res
 * @param next
 * will send th response in json
 */
exports.getUserByUsername = (req, res, next) => {
    let jwt = req.header("Authorization");
    try {
        JWT.verify(jwt,constantsAPI.SECRET)

        model.getUser(req.body).then( data => {
            res.json({
                token : TOKEN,
                data : data
            })
        }).catch(err => {
            res.json({
                error : err
            })
        })

    }catch (error) {
        res.json({
            error : error
        })
    }

}




