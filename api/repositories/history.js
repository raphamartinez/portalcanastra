const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class History {
    async insert(history) {
        try {
            const sql = 'INSERT INTO canastra.history (description, status, dateReg, id_login) values (?, 1, now() , ?)'
            await query(sql, [history.description, history.id_login])
            return true
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT HI.id_history, HI.description, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as dateReg, US.name FROM canastra.history HI, canastra.user US WHERE US.id_login = HI.id_login and HI.status = 1 ORDER BY HI.id_history DESC`
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    listUser(id_login) {
        try {
            const sql = `SELECT HI.id_history, HI.description, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as dateReg, US.name FROM canastra.history HI, canastra.user US WHERE US.id_login = HI.id_login and HI.status = 1 and HI.id_login = ${id_login} ORDER BY HI.id_history DESC`
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async countInTheTime() {
        try {
            const sql = `SELECT COUNT(id_history) as count FROM canastra.history WHERE dateReg < DATE_ADD(now() , INTERVAL 1 DAY)`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async lastAccess() {
        try {
            const sql = `SELECT US.name, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as time  FROM canastra.user US, canastra.history HI, canastra.login LO WHERE HI.id_login = LO.id_login and LO.id_login = US.id_login ORDER BY HI.dateReg DESC LIMIT 1`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }


    async countInTheTimeUser(id_login) {
        try {
            const sql = `SELECT COUNT(id_history) as count FROM canastra.history WHERE id_login = ${id_login} and dateReg < DATE_ADD(now() , INTERVAL 1 DAY)`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async lastAccessUser(id_login) {
        try {
            const sql = `SELECT US.name, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as time FROM canastra.user US, canastra.history HI, canastra.login LO WHERE HI.id_login = LO.id_login and LO.id_login = US.id_login and LO.id_login = ${id_login} ORDER BY HI.dateReg DESC LIMIT 1`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}

module.exports = new History()