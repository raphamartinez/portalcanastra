const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class User {
    async insert(user) {
        try {
            const sql = `INSERT INTO ansa.user (name, perfil, dateBirthday, status, dateReg, id_login, id_office) values (?, ?, ?, ?, now(), ?, ?)`
            await query(sql, [user.name, user.perfil, user.dateBirthday, user.status, user.login.id_login, user.office.id_office])

            return true
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async delete(id_user) {
        try {
            const sql = `DELETE from user WHERE id_user = ${id_user}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async update(user) {
        try {
            const sql = 'UPDATE user SET name = ?, perfil = ?,dateBirthday = ?, id_office = ? WHERE id_user = ?'
            const result = await query(sql, [user.name, user.perfil, user.dateBirthday, user.office.id_office, user.id_user])
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_user) {
        try {
            const sql = `SELECT US.name, US.perfil, DATE_FORMAT(US.dateBirthday, '%d/%m/%Y') as dateBirthday, DATE_FORMAT(US.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM ansa.login LO, ansa.user US WHERE 
            US.id_login = LO.id_login and LO.id_login = ${id_user}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT US.id_user, US.id_login, US.name, US.perfil, DATE_FORMAT(US.dateBirthday, '%d/%m/%Y') as dateBirthday, DATE_FORMAT(US.dateReg, '%H:%i %d/%m/%Y') as dateReg 
            FROM ansa.user US WHERE US.status = 1 `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}

module.exports = new User()