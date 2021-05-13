const repositorie = require('../repositories/login')
const { ResetPasswordMail } = require('./mail')
const Token = require('./token')
const bcrypt = require('bcrypt')

const { InvalidArgumentError, NotFound } = require('./error')

class Login {

    async checkMail(mail) {
        const login = await repositorie.viewMail(mail)
        if (!login) {
            throw new NotFound('login or password')
        }

        return login
    }

    async login(id_login) {
        try {
            const accessToken = Token.access.create(id_login)
            const refreshToken = await Token.refresh.create(id_login)

            const token = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            return token
        } catch (error) {
            return error
        }
    }

    async logout(token) {
        try {
            await Token.access.invalid(token)

        } catch (error) {
            return error
        }
    }


    async forgotPassword(mail) {
        const resDefault = 'If we find a user with this email, we will send a message with instructions to reset the password'
        try {
            const user = await repositorie.viewMail(mail)
            const token = await Token.resetPassword.create(user.id_user)
            const mail = new ResetPasswordMail(user, token)
            await mail.sendMail()

            return resDefault

        } catch (error) {
            if (error instanceof NotFound) {
                return resDefault
            }
            return error
        }

    }

    async insertLogin(login) {
        const { mail, password, status } = login

        const hash = await generatePasswordHash(password)

        const id = await repositorie.insert(mail, hash, status)

        return id
    }

    async changePassword(token) {
        try {
            const id = await Token.resetPassword.verify(token)
            const user = await repositorie.viewLogin(id)

            return user
        } catch (error) {
            return error
        }
    }

    async verifyMail(id) {
        const mailVerify = true
        return result = await repositorie.verifyMail(mailVerify, id)
    }

    async viewLogin(id) {
        try {
            const login = await repositorie.view(id)
            return login
        } catch (error) {
            return error
        }
    }

    async addPassword(password) {
        // ?
        return password
    }

    updatePassword(password, id) {
        return repositorie.updatePassword(password, id)
    }
}

function generatePasswordHash(password) {
    const costHash = 12
    return bcrypt.hash(password, costHash)
}

module.exports = new Login