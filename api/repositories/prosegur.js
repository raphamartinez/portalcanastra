const query = require('../infrastructure/database/queries')

class Prosegur {
    insert(prosegur) {
        const sql = 'INSERT INTO prosegur set ?'
        return query(sql,prosegur)
    }

    delete(id) {
        const sql = `DELETE from prosegur WHERE id_prosegur = ${id}`
        return query(sql)
    }

    update(prosegur,id) {
        const sql = 'UPDATE prosegur SET ? WHERE id_prosegur = ?'
        return query(sql,[prosegur, id])
    }

    view(id) {
        const sql = `SELECT * FROM prosegur where id_prosegur = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM prosegur'
        return query(sql)
    }
}

module.exports = new Prosegur()