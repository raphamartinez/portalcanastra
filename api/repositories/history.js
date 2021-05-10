const query = require('../infrastructure/database/queries')

class History {
    insert(history) {
        const sql = 'INSERT INTO history set ?'
        return query(sql,history)
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
        const sql = 'SELECT * FROM history'
        return query(sql)
    }
}

module.exports = new History()