const query = require('../infrastructure/database/queries')

class Login {
    insert(login) {
        const sql = 'INSERT INTO login set ?'
        return query(sql, login)
    }

    delete(id) {
        const sql = `DELETE from login WHERE id_login = ${id}`
        return query(sql)
    }

    update(login, id) {
        const sql = 'UPDATE login SET ? WHERE id_login = ?'
        return query(sql, [login, id])
    }

    updatePassword(id, password) {
        const sql = 'UPDATE login SET password = ? WHERE id_login = ?'
        const result = query(sql, [password, id])

        return result[0]
    }

    async view(id) {
        const sql = `SELECT US.name FROM ansa.login LO, ansa.user US where US.id_login = LO.id_login and LO.id_login = ${id}`
        const result = await query(sql)

        return result[0]
    }

    list() {
        const sql = 'SELECT * FROM login'
        return query(sql)
    }

    async viewMail(mail) {
        const sql = `SELECT * FROM login where mail = '${mail}'`
        const result = await query(sql)

        return result[0]
    }

    async verifyMail(mail,id) {
        const sql = `UPDATE login SET mailVeify = ? WHERE id_login = ?`
        const result = await query(sql, [mail, id])

        return result[0]
    }

}

module.exports = new Login()