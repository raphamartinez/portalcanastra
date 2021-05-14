const moment = require('moment')
const repositorie = require('../repositories/user')

class User {
    
    constructor() {

    }

    insertUser(user) {

        return repositorie.insert(user)
            .then(result => {
                return result
            })
    }

    deleteUser(id) {
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    updateUser(id, user) {
        if (user.data) {
            user.data = moment(user.data, 'DD/MM/YYYY').format
        }

        return repositorie.update(user, id)
            .then(result => {
                return result
            })
    }

    listUsers() {
        return repositorie.list()
    }

    viewUser(id) {
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }
}

module.exports = new User