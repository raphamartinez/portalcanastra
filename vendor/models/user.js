const moment = require('moment')
const repositorie = require('../repositories/user')

class User {
    
    constructor() {

    }

    insertUser(values, res) {

        return repositorie.insert(values)
            .then(result => {
                return result
            })
    }

    deleteUser(id, res) {
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    updateUser(id, values, res) {
        if (values.data) {
            values.data = moment(valores.data, 'DD/MM/YYYY').format
        }

        return repositorie.update(values, id)
            .then(result => {
                return result
            })
    }

    listUsers(res) {
        return repositorie.list()
    }

    viewUser(id, res) {
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }
}

module.exports = new User