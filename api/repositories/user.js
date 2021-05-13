const query = require('../infrastructure/database/queries')

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
        const sql = `SELECT US.name, US.perfil, DATE_FORMAT(US.dateBirthday, '%d/%m/%Y') as dateBirthday, DATE_FORMAT(US.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM ansa.login LO, ansa.user US WHERE 
        US.id_login = LO.id_login and LO.id_login = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM user'
        return query(sql)
    }
}

module.exports = new User()