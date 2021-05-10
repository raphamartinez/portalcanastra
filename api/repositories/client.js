const query = require('../infrastructure/database/queries')

class Client {
    insert(client) {
        const sql = 'INSERT INTO client set ?'
        return query(sql,client)
    }

    delete(id) {
        const sql = `DELETE from client WHERE id_client = ${id}`
        return query(sql)
    }

    update(client,id) {
        const sql = 'UPDATE client SET ? WHERE id_client = ?'
        return query(sql,[client, id])
    }

    view(id) {
        const sql = `SELECT * FROM client where id_client = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM client'
        return query(sql)
    }
}

module.exports = new Client()