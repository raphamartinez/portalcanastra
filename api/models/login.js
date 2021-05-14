const Repositorie = require('../repositories/login')
const blockList = require('../models/redis')
const { InvalidArgumentError, NotFound } = require('./error')
const bcrypt = require('bcrypt')
const Token = require('./token')
const Mail = require('./mail')
const passport = require('passport')


class Login {

    async viewLogin(id) {
        const login = await Repositorie.view(id)
        return login
    }

    async generateTokens(id) {
        const accessToken = Token.access.create(id)
        const refreshToken = await Token.refresh.create(id)
        const token = { accessToken, refreshToken }

        return token
    }


    async logout(id) {

    }

    async searchMail(mail) {
        try {
            const login = await Repositorie.viewMail(mail)
            return login
        } catch (error) {
            throw new NotFound('Mail not found')
        }

    }

    async listLogin() {
        return Repositorie.list()
    }

    async insertLogin(data) {
        try {
            const password = generatePasswordHash(data.password)

            data.password = password

            const result = await Repositorie.insert(data)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async forgotPassword(mail) {
        try {
            const login = await Repositorie.viewMail(mail)
            const token = await Token.resetPassword.create(login.id_login)
            const mail = Mail.ResetPasswordMail(login, token)
        } catch (error) {
            throw new NotFound('Mail not found')
        }
    }

    async changePassword(req) {
        try {
            const token = req.body.token
            const password = req.body.password

            if (typeof token !== 'string' || token.lenght === 0) {
                throw new InvalidArgumentError('O token está inválido')
            }

            const id = await Token.resetPassword.verify(token)
            const login = await Login.viewLogin(id)
            await Login.updatePassword(password,id)
        }catch (error) {
            throw new InvalidArgumentError('Error')
        }

    }


    async updatePassword(password, id) {
        try {
            const passwordHash = generatePasswordHash(password)

            password = passwordHash

            const result = await Repositorie.updatePassword(password, id)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }

    }

    async verifyMail(id) {
        try {
            const mail = true

            const result = await Repositorie.verifyMail(mail, id)

            return result
        } catch (error) {
            throw new NotFound('Not Found')
        }
    }

    static generatePasswordHash(password) {
        const costHash = 12
        return bcrypt.hash(password, costHash)
    }


}

module.exports = new Login