const moment = require('moment')
const connection = require('../infraestrutura/connection')


class History {

    listHistory(res){
        const sql = 'SELECT * FROM history'

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    viewHistory(id, res){
        const sql = `SELECT * FROM history WHERE id_history = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    insertHistory(values,res){
        const sql = 'INSERT INTO history set ?'

        connection.query(sql, [values], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    deleteHistory(id, res){
        const sql = `DELETE FROM history WHERE id_history = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    updateHistory(id, values, res){
        const sql = 'UPDATE history SET ? WHERE id_history = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }
}

module.exports = new History