const query = require('../../infraestrutura/database/queries')

class Item {
    insert(item) {
        const sql = 'INSERT INTO item set ?'
        return query(sql,item)
    }

    delete(id) {
        const sql = `DELETE from item WHERE id_item = ${id}`
        return query(sql)
    }

    update(item,id) {
        const sql = 'UPDATE item SET ? WHERE id_item = ?'
        return query(sql,[item, id])
    }

    view(id) {
        const sql = `SELECT * FROM item where id_item = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM item'
        return query(sql)
    }
}

module.exports = new Item()