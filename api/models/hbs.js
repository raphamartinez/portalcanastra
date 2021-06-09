const Repositorie = require('../repositories/hbs')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class Hbs {

    async init() {
        try {
            await this.listUsers()
            await this.listSalary()
            console.log('list hbs ok');
        } catch (error) {
            console.log('list hbs error');
            throw new InternalServerError(error)
        }
    }

    async listUsers() {
        try {
            const data = await Repositorie.listUsers()
            console.table(data)

            return data
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listSalary() {
        try {
            const data = await Repositorie.listSalary()
            console.table(data)

            return data
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

}

module.exports = new Hbs