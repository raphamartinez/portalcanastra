const query = require('../infrastructure/database/queries')

class Address {
    insert(address) {
        const sql = 'INSERT INTO address set ?'
        return query(sql, address)
    }

    delete(id) {
        const sql = `DELETE from address WHERE id_address = ${id}`
        return query(sql)
    }

    update(address, id) {
        const sql = 'UPDATE address SET ? WHERE id_address= ?'
        return query(sql, [address, id])
    }

    view(id) {
        const sql = `SELECT * FROM address where id_address = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM address'
        return query(sql)
    }
}

module.exports = new Address()