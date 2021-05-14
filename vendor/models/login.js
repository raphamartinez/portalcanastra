const repositorie = require('../repositories/login')


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