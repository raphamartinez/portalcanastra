const repositorie = require('../repositories/login')

class Login {

    async checkMail(mail) {
        try {
            return user = await repositorie.viewMail(mail)
        } catch (error) {
            return error
        }
    }

    checkPassword(password, passHash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, passHash, (err, isMatch) => {
                if (isMatch) resolve(user)
                else reject(err)
            })
        })
    }

    checkToken(token) {
        const tokenBlack = blockList.contains(token)
        if (!tokenBlack) {
            return ('Token inválido')
        }
    }

    async verifyMail(id){
        const mailVerify = true
        return result = await repositorie.verifyMail(mailVerify, id)
    }

    async viewLogin(id) {
        return result = await repositorie.view(id)
    }
}

module.exports = new Login