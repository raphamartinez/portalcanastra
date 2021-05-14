const moment = require('moment')
const repositorie = require('../repositories/user')
const { VerifyMail } = require('./mail')
const Token = require('./token')

function gererateAddress(address, token) {
    return `${process.env.BASE_URL}${address}${token}`
}

class User {

    constructor() {

    }

    async insertUser(user) {

        const { id } = await repositorie.insert(user)

        const token = Token.verifyMail.create(id)
        const address = gererateAddress('login/mailVerify/', token)
        const mailVerify = new VerifyMail(user, address)
        mailVerify.sendMail().catch(console.log())

        return user
    }

    async deleteUser(id) {
        return result = await repositorie.delete(id)
    }

    async updateUser(id, user) {
        if (user.data) {
            user.data = moment(user.data, 'DD/MM/YYYY').format
        }

        return result = await repositorie.update(user, id)
    }

    listUsers() {
        return repositorie.list()
    }

    async viewUser(id) {
        return result = await repositorie.view(id)
    }
}

module.exports = new User