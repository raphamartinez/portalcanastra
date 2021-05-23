const Repositorie = require('../repositories/history')
const { InvalidArgumentError, NotFound, InternalServerError } = require('./error')

class History {

    async listHistoryDashboard(perfil, id_login) {
        try {
            if (perfil === 1) {
                const count = await Repositorie.countInTheTime()
                const lastAccess = await Repositorie.lastAccess()

                return { count, lastAccess }
            } else {
                const count = await Repositorie.countInTheTimeUser(id_login)
                const lastAccess = await Repositorie.lastAccessUser(id_login)

                return { count, lastAccess }
            }

        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listHistory(perfil, id_login) {
        try {
            if (perfil === 1) {
                const list = await Repositorie.list()
                return list
            } else {
                const list = await Repositorie.listUser(id_login)
                return list
            }
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async viewHistory(id) {
        try {
            const history = await Repositorie.viewHistory(id)

            return new History(history)
        } catch (error) {
            throw new NotFound('Error')
        }
    }

    async insertHistory(id_login, description) {
        try {
            const history = {
                description: description,
                id_login: id_login
            }

            Repositorie.insert(history)
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async deleteHistory(id) {
        try {
            const result = await Repositorie.delete(id)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async updateHistory(id, history) {
        try {
            const result = await Repositorie.update(id, history)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }
}

module.exports = new History