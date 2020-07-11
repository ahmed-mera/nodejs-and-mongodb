const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const constantsDB = require("../constants/constantsDBLogin_SignUp")

// const URL =  "mongodb+srv://ahmed:pass@nodejs.6u9jq.gcp.mongodb.net/node"

// structure of database
const Schema =  mongoose.Schema(constantsDB.SCHEMA)

const User = mongoose.model("user", Schema) // name of collection and his structure


/**
 * model function to get all users from databases
 * @returns {Promise<Array<Object>>>}
 */
exports.getAllUsers = () => new Promise((resolve, reject) => {
    mongoose.connect(constantsDB.URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.find({}) )
        .then( users => {
            mongoose.disconnect()
            resolve(users)
        }).catch(error => {
            mongoose.disconnect()
            reject(error)
        })
})


/**
 * model function to get users from databases
 * @param data {@link Object}
 * @returns {Promise<Object>}
 */
exports.getUser = data => new Promise((resolve, reject) => {
    mongoose.connect(constantsDB.URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.findOne({username : data.username}) )
        .then( userData => {
            if (userData) {
                bcrypt.compare(data.password, userData.password)
                    .then(same => {
                        if (same) {
                            mongoose.disconnect()
                            resolve(userData)
                        }else {
                            mongoose.disconnect()
                            reject("password does not correct")
                        }
                    }).catch(err => {
                    mongoose.disconnect()
                    reject(err)
                })

            } else {
                mongoose.disconnect()
                reject("user not exists")
            }
        }).catch(error => {
        mongoose.disconnect()
        reject(error)
    })
})


/**
 * model function to save user in databases
 * @param data {Object}
 * @returns {Promise<Object>}
 */
exports.addUser = data => new Promise((resolve, reject) => {

    mongoose.connect(constantsDB.URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.findOne({username : data.username}))
        .then( response => {
            if(response) {
                mongoose.disconnect()
                reject("user exists ")
            }else{
                return bcrypt.hash(data.password, 10)
            }
        }).then(hashPassword => {

        let user = new User({
            username : data.username,
            password : hashPassword,
            date_sign_up : new Date()
        })

        return user.save();

    }).then(_ => {
        mongoose.disconnect()
        resolve("user is added successfully")
    }).catch(error => {
        mongoose.disconnect()
        reject(error)
    })
})
