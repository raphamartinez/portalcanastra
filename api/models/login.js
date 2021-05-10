const repositorie = require('../repositories/login')
const blockList = require('../models/redis')

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

    checkToken(token){
        const tokenBlack = blockList.contains(token)
        if(!tokenBlack){
            return ('Token inválido')
        }
    }
}

module.exports = new Login