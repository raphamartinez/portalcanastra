const moment = require('moment')
const connection = require('../infraestrutura/connection')

class ItemGroup {

    insertItemGroup(values, res){
        const sql = 'INSERT INTO ItemGroup set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    updateItemGroup(values, id, res){
        const sql = 'UPDATE ItemGroup SET ? WHERE id_ItemGroup = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    deleteItemGroup(id, res){
        const sql = `DELETE from ItemGroup WHERE id_ItemGroup = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    listItemGroup(res){
        const sql = `SELECT * from ItemGroup`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new ItemGroup