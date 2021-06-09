const query = require('../infrastructure/database/queries')

class ItemGroup {
    insert(itemgroup) {
        const sql = 'INSERT INTO itemgroup set ?'
        return query(sql, itemgroup)
    }

    delete(id) {
        const sql = `DELETE from itemgroup WHERE id_itemgroup = ${id}`
        return query(sql)
    }

    update(itemgroup, id) {
        const sql = 'UPDATE itemgroup SET ? WHERE id_itemgroup = ?'
        return query(sql, [itemgroup, id])
    }

    view(id) {
        const sql = `SELECT * FROM itemgroup where id_itemgroup = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM itemgroup'
        return query(sql)
    }
}

module.exports = new ItemGroup()