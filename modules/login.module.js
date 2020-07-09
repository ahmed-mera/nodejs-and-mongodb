const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/first-project"
// const URL =  "mongodb+srv://ahmed:pass@nodejs.6u9jq.gcp.mongodb.net/node"

// structure of database
const Schema = mongoose.Schema({
    username : String,
    password : String
})

const User = mongoose.model("user", Schema) // name of collection and his structure

/**
 * model function to get all users from databases
 * @returns {Promise<Array<Object>>>}
 */
exports.getAllUsers = () => new Promise((resolve, reject) => {
    mongoose.connect(URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.find({}) )
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
    mongoose.connect(URL, { useNewUrlParser: true,  useUnifiedTopology: true }).then( _ => User.findOne({username : data.username}) )
        .then( userData => {
            (userData) ?
                (userData.password === data.password) ? resolve(userData) : reject("password dose not correct")
            : reject("user not exists")

            mongoose.disconnect()

        }).catch(error => {
        mongoose.disconnect()
        reject(error)
    })
})
