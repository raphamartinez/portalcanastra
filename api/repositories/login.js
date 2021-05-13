const executeQuery = require('../infrastructure/database/queries')
const { InternalServerError } = require('../models/error')

class Login {

    insert(mail, password, status) {
        try {
            const sql = `INSERT INTO login ( mail, password, status, dateReg, mailVerify) values (?,?,?,now(),0)`
            return executeQuery(sql, [
                mail, password, status
            ])
        } catch (error) {
            throw new InternalServerError('Error al agregar usuario!')
        }
    }

    delete(id) {
        const sql = `DELETE from login WHERE id_login = ${id}`
        return executeQuery(sql)
    }

    update(login, id) {
        const sql = 'UPDATE login SET ? WHERE id_login = ?'
        return executeQuery(sql, [login, id])
    }

    async view(id) {
        try {
            const sql = `SELECT US.name FROM ansa.login LO, ansa.user US WHERE 
            US.id_login = LO.id_login and LO.id_login = ${id}`
            const result = await executeQuery(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError('No se pudo encontrar al usuario!')
        }
    }

    list() {
        const sql = 'SELECT * FROM login'
        return executeQuery(sql)
    }

    async viewMail(mail) {
        try {
            const sql = `SELECT * FROM login where mail = '${mail}'`
            const result = await executeQuery(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError('No se pudo encontrar al usuario!')
        }
    }

    async verifyMail(mailVerify, id) {
        const sql = `UPDATE login SET mailVerify = ? WHERE id_login = ?`
        const result = await executeQuery(sql, [mailVerify, id])
        return result[0]
    }

    async updatePassword(password, id) {
        const sql = `UPDATE login SET password = ? WHERE id_login = ?`
        const result = await executeQuery(sql, [password, id])
        return result[0]
    }

}

module.exports = new Login()