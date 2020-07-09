const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const URL = "mongodb://localhost:27017/first-project"
// const URL =  "mongodb+srv://ahmed:pass@nodejs.6u9jq.gcp.mongodb.net/node"

// structure of database
const Schema = mongoose.Schema({
    username     : String,
    password     : String,
    date_sign_up : String
})

const User = mongoose.model("user", Schema) // name of collection and his structure


/**
 * model function to save user in databases
 * @param data {Object}
 * @returns {Promise<Object>}
 */
exports.addUser = data => new Promise((resolve, reject) => {

    mongoose.connect(URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.findOne({username : data.username}))
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
