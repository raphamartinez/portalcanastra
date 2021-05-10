const moment = require('moment')
const passport = require(`passport`)
const repositorie = require('../vendor/repositories/login')
const localStrategy = require(`passport-local`).Strategy

class Login {

    checkAuth(mail, password) {
        return repositorie.viewMail(mail)
            .then(user => {
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) resolve(user) 
                        else reject(err)
                    })
                })
            })
            .catch(error => {
                return error;
            })
    }
}

module.exports = new Login