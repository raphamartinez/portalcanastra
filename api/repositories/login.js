const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Login {

    async insert(login) {
        try {
            const sql = 'INSERT INTO portalcanastra.login (mail, password, mailVerify, status, dateReg ) values (?, ?, ?, ?, now() )'
            await query(sql, [login.mail, login.password, login.mailVerify, login.status])

            const sqlId = 'select LAST_INSERT_ID() as id_login from portalcanastra.login LIMIT 1'
            const id = await query(sqlId)
            console.log(id);
            return id[0]
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }
    }

    async delete(id_login) {
        try {
            const sql = `DELETE from login WHERE id_login = ${id_login}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async update(login) {
        try {
            const sql = 'UPDATE login SET mail = ? WHERE id_login = ?'
            await query(sql, [login.mail, login.id_login])
            return true
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }

    }

    async updatePassword(id_login, password) {
        try {
            const sql = 'UPDATE login SET password = ? WHERE id_login = ?'
            const result = await query(sql, [password, id_login])
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_login) {
        try {
            const sql = `SELECT US.name, US.perfil, US.id_login FROM portalcanastra.login LO, portalcanastra.user US where US.id_login = LO.id_login and LO.id_login = ${id_login} and LO.status = 1`
            const result = await query(sql)

            if (!result) {
                throw new InvalidArgumentError(`Error`)
            }

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    list() {
        try {
            const sql = 'SELECT * FROM login'
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async viewMail(mail) {
        try {
            const sql = `SELECT mail, password, id_login FROM login where mail = '${mail}' and status = 1`
            const result = await query(sql)

            if (!result[0]) {
                throw new NotFound('Mail not found')
            }

            return result[0]
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async verifyMail(mail, id_login) {
        try {
            const sql = `UPDATE login SET mailVeify = ? WHERE id_login = ?`
            const result = await query(sql, [mail, id_login])
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }


    async checkMail(mail) {
        try {
            const sql = `SELECT mail FROM portalcanastra.login WHERE mail = '${mail}'`
            const result = await query(sql, mail)

            if (!result[0]) {
                return true
            }

            return false
        } catch (error) {
            console.log(error)
            throw new InternalServerError(error)
        }
    }

}

module.exports = new Login()