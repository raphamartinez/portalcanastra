const moment = require('moment')
const connection = require('../infraestrutura/connection')


class Label {

    listLabel(res){
        const sql = 'SELECT * FROM Label'

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }


    insertLabel(values,res){
        const sql = 'INSERT INTO Label set ?'

        connection.query(sql, [values], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    deleteLabel(id, res){
        const sql = `DELETE FROM Label WHERE id_Label = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    updateLabel(id, values, res){
        const sql = 'UPDATE Label SET ? WHERE id_Label = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }
}

module.exports = new Label