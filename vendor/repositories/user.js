const query = require('../../infraestrutura/database/queries')

class User {
    insert(user) {
        const sql = 'INSERT INTO user set ?'
        return query(sql,user)
    }

    delete(id) {
        const sql = `DELETE from user WHERE id_user = ${id}`
        return query(sql)
    }

    update(user,id) {
        const sql = 'UPDATE user SET ? WHERE id_user = ?'
        return query(sql,[user, id])
    }

    view(id) {
        const sql = `SELECT * FROM user where id_user = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM user'
        return query(sql)
    }
}

module.exports = new User()