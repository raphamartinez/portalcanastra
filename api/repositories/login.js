const query = require('../infrastructure/database/queries')

class Login {
    insert(login) {
        const sql = 'INSERT INTO login set ?'
        return query(sql,login)
    }

    delete(id) {
        const sql = `DELETE from login WHERE id_login = ${id}`
        return query(sql)
    }

    update(login,id) {
        const sql = 'UPDATE login SET ? WHERE id_login = ?'
        return query(sql,[login, id])
    }

    view(id) {
        const sql = `SELECT * FROM login where id_login = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM login'
        return query(sql)
    }

    viewMail(mail) {
        const sql = `SELECT * FROM login where mail = ${mail}`
        return query(sql)
    }

    verifyMail(mailVerify, id) {
        const sql = `UPDATE login SET mailVerify = ? WHERE id_login = ?`
        return query(sql,[mailVerify,id])
    }

}

module.exports = new Login()