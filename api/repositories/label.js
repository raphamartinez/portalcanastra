const query = require('../infrastructure/database/queries')

class Label {
    insert(label) {
        const sql = 'INSERT INTO label set ?'
        return query(sql,label)
    }

    delete(id) {
        const sql = `DELETE from label WHERE id_label = ${id}`
        return query(sql)
    }

    update(label,id) {
        const sql = 'UPDATE label SET ? WHERE id_label = ?'
        return query(sql,[label, id])
    }

    view(id) {
        const sql = `SELECT * FROM label where id_label = ${id}`
        return query(sql)
    }

    list() {
        const sql = 'SELECT * FROM label'
        return query(sql)
    }

    viewMail(mail) {
        const sql = `SELECT * FROM label where mail = ${mail}`
        return query(sql)
    }

}

module.exports = new Label()