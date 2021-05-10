const query = require('../infrastructure/database/queries')

class Office {
    insert(office) {
        const sql = 'INSERT INTO office set ?'
        return query(sql,office)
    }

    delete(id) {
        const sql = `DELETE from office WHERE id_office = ${id}`
        return query(sql)
    }

    update(office,id) {
        const sql = 'UPDATE office SET ? WHERE id_office = ?'
        return query(sql,[office, id])
    }

    view(id) {
        const sql = `SELECT * FROM office where id_office = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM office'
        return query(sql)
    }
}

module.exports = new Office()