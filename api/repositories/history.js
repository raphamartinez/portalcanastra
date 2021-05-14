const query = require('../infrastructure/database/queries')

class History {
    async insert(history) {
        const sql = 'INSERT INTO history (description, status, dateReg, id_login) values (?, 1, now(), ?)'
        const result = query(sql,[history.description, history.id_login])

        return result[0]
    }

    delete(id) {
        const sql = `DELETE from history WHERE id_history = ${id}`
        return query(sql)
    }

    update(history,id) {
        const sql = 'UPDATE history SET ? WHERE id_history = ?'
        return query(sql,[history, id])
    }

    view(id) {
        const sql = `SELECT * FROM history where id_history = ${id}`
        return query(sql)
    }

    list() {
        const sql = `SELECT HI.id_history, HI.description, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as time, US.name FROM ansa.history HI, ansa.user US WHERE US.id_login = HI.id_login and HI.status = 1`
        return query(sql)
    }

    async countInTheTime() {
        const sql = `SELECT COUNT(id_history) as count FROM ansa.history WHERE dateReg < DATE_ADD(now(), INTERVAL 1 DAY)`
        const result = await query(sql)
        return result[0]
    }

    async lastAccess() {
        const sql = `SELECT US.name, DATE_FORMAT(HI.dateReg, '%H:%i %d/%m/%Y') as time  FROM ansa.user US, ansa.history HI, ansa.login LO WHERE HI.id_login = LO.id_login and LO.id_login = US.id_login ORDER BY HI.dateReg DESC LIMIT 1`
        const result = await query(sql)
        return result[0]
    }
}

module.exports = new History()