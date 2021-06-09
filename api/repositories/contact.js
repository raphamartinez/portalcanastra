const { query } = require('../infrastructure/database/queries')

class Contact {
    insert(contact) {
        const sql = 'INSERT INTO contact set ?'
        return query(sql, contact)
    }

    delete(id) {
        const sql = `DELETE from contact WHERE id_contact = ${id}`
        return query(sql)
    }

    update(contact, id) {
        const sql = 'UPDATE contact SET ? WHERE id_contact = ?'
        return query(sql, [contact, id])
    }

    view(id) {
        const sql = `SELECT * FROM contact where id_contact = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM contact'
        return query(sql)
    }
}

module.exports = new Contact()