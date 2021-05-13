
const moment = require('moment')
const repositorie = require('../repositories/user')
const { VerifyMail } = require('./mail')
const Token = require('./token')
const { NotFound } = require('./error')
const { ConvertUser } = require('../infrastructure/auth/converters')

function gererateAddress(address, token) {
    return `${process.env.BASE_URL}${address}${token}`
}


/**
 *  Class model User
 */
class User {
    /**
     * Construct receive params and set in user
     * @param {object} user 
     */

    constructor() {
    }

    async insertUser(user, next) {
        try {
            const { id } = await repositorie.insert(user)

            const token = Token.verifyMail.create(id)
            const address = gererateAddress('login/mailVerify/', token)
            const mailVerify = new VerifyMail(user, address)
            mailVerify.sendMail().catch(console.log())

            return user
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(id, next) {
        try {
            return result = await repositorie.delete(id)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(id, user) {
        if (user.data) {
            user.data = moment(user.data, 'DD/MM/YYYY').format
        }

        return result = await repositorie.update(user, id)
    }

    async listUsers(req) {
        return repositorie.list()
    }

    async viewUser(id) {
        try {
            const user = await repositorie.view(id)

            if (!user) {
                throw new NotFound('user')
            }
            return user
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new User