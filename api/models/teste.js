const Repositorie = require('../repositories/login')
const Valid = require('./valid')
const { InternalServerError, NotFound, InvalidArgumentError } = require('./error')
const bcrypt = require('bcrypt')

class Login {
    constructor(login) {
        this.id = login.id_login
        this.mail = login.mail
        this.password = login.password
        this.status = login.status
        this.dateReg = login.dateReg
        this.mailVerify = login.mailVerify
        valid()
    }


    valid() {
        Valid.fieldStringNotNull(this.name, 'name')
        Valid.fieldStringNotNull(this.mail, 'mail')
    }

    async addPassword(password) {
        Valid.fieldStringNotNull(password, 'password')
        Valid.FieldLengthMin(password, 'password', 8)
        Valid.FieldLengthMax(password, 'password', 64)

        this.senhaHash = await Login.generatePasswordHash(password)
    }

    async generateTokens() {
        try {
            const accessToken = Token.access.create(this.id)
            const refreshToken = await Token.refresh.create(this.id)
            const token = { accessToken, refreshToken }

            return token
        } catch (error) {
            throw new InternalServerError('Error on generated Tokens')
        }
    }

    async viewLogin() {
        try {
            const login = await Repositorie.view(this.id)
            return new Login(login)
        }
        catch (error) {
            throw new NotFound('Login not found')
        }
    }

    async searchMail(mail) {
        try {
            const login = await Repositorie.viewMail(mail)
            return new Login(login)
        } catch (error) {
            throw new NotFound('Mail not found')
        }
    }

    async logout(token) {
        try {
            await Token.access.invalid(token)
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listLogin() {
        try {
            return Repositorie.list()

        } catch (error) {
            throw new InternalServerError('Error on list')
        }
    }

    async insertLogin() {

        if (await Repositorie.viewMail(this.mail)) {
            throw new InvalidArgumentError('O usuário já existe!')
        }

        try {
            const id = await Repositorie.insert(this)

            return id
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }

    }

    async forgotPassword() {
        try {
            const login = await Repositorie.viewMail(this.mail)
            const token = await Token.resetPassword.create(this.id_login)
            const mail = Mail.ResetPasswordMail(login, token)

            return mail
        } catch (error) {
            throw new NotFound('Mail not found')
        }
    }

    async changePassword(token, password) {
        try {
            if (typeof token !== 'string' || token.lenght === 0) {
                throw new InvalidArgumentError('O token está inválido')
            }

            const id = await Token.resetPassword.verify(token)
            await Login.viewLogin(id)
            await Login.updatePassword(password, id)
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async updatePassword() {
        try {
            const result = await Repositorie.updatePassword(this.password, this.id)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }

    }

    async verifyMail() {
        try {
            this.mailVerify = true
            const result = await Repositorie.verifyMail(this.mailVerify, this.id)

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

exports.modules = Login