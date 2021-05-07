const moment = require('moment')
const connection = require('../infraestrutura/connection')

class Office {

    createOffice(values, res){
        const sql = 'INSERT INTO office set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    updateOffice(values, id, res){
        const sql = 'UPDATE office SET ? WHERE id_office = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    deleteOffice(id, res){
        const sql = `DELETE from office WHERE id_office = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    viewOffice(id, res){
        const sql = `SELECT * from office WHERE id_office = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    listOffice(res){
        const sql = `SELECT * from office`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

}

module.exports = new Office