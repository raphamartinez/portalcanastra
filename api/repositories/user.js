const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class User {
    async insert(user) {
        try {
            const sql = `INSERT INTO portalcanastra.user (name, perfil, status, dateReg, id_login) values (?, ?, ?, now() ,?)`
            await query(sql, [user.name, user.perfil, user.status, user.login.id_login])

            return true
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }
    }

    async delete(id_user) {
        try {
            const sql = `DELETE from portalcanastra.user WHERE id_user = ${id_user}`
            await query(sql)
            return true
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async deleteStatus(status, id_user) {
        try {
            const sql = `UPDATE portalcanastra.user set status = ? WHERE id_user = ?`
            await query(sql, [status, id_user])
            return true
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async update(user) {
        try {
            const sql = 'UPDATE portalcanastra.user SET name = ?, perfil = ? WHERE id_user = ?'
            await query(sql, [user.name, user.perfil, user.id_user])
            return true
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_user) {
        try {
            const sql = `SELECT US.name, US.perfil, DATE_FORMAT(US.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM portalcanastra.login LO, portalcanastra.user US WHERE 
            US.id_login = LO.id_login and LO.id_login = ${id_user}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT US.id_user, US.id_login, US.name, US.perfil, LO.mail, DATE_FORMAT(US.dateReg, '%H:%i %d/%m/%Y') as dateReg 
            FROM portalcanastra.user US, portalcanastra.login LO WHERE LO.id_login = US.id_login and US.status = 1 `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}

module.exports = new User()