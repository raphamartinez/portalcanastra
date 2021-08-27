const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Login {

    async insert(login) {
        try {
            const sql = 'INSERT INTO canastra.login (mail, password, mailVerify, status, dateReg ) values (?, ?, ?, ?, now() - interval 3 hour )'
            await query(sql, [login.mail, login.password, login.mailVerify, login.status])

            const sqlId = 'select LAST_INSERT_ID() as id_login from canastra.login LIMIT 1'
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
            const sql = 'UPDATE canastra.login SET mail = ? WHERE id_login = ?'
            await query(sql, [login.mail, login.id_login])
            return true
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }

    }

    async updatePassword(id_login, password) {
        try {
            const sql = 'UPDATE canastra.login SET password = ? WHERE id_login = ?'
            const result = await query(sql, [password, id_login])
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_login) {
        try {
            const sql = `SELECT US.name, US.perfil, US.id_login FROM canastra.login LO, canastra.user US where US.id_login = LO.id_login and LO.id_login = ${id_login} and LO.status = 1`
            const result = await query(sql)

            if (!result) {
                throw new InvalidArgumentError(`Error`)
            }

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async checkCod(cod) {
        try {
            const sql = `SELECT title, url FROM canastra.powerbi WHERE cod = ?`
            const result = await query(sql, cod)

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
            const sql = 'SELECT * FROM canastra.login'
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async viewMail(mail) {
        try {
            const sql = `SELECT mail, password, id_login FROM canastra.login where mail = '${mail}' and status = 1`
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
            const sql = `UPDATE canastra.login SET mailVeify = ? WHERE id_login = ?`
            const result = await query(sql, [mail, id_login])
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }


    async checkMail(mail) {
        try {
            const sql = `SELECT mail FROM canastra.login WHERE mail = '${mail}'`
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