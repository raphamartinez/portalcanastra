const moment = require('moment')
const connection = require('../infraestrutura/connection')

class Contact {

    insertContact(values, res){
        const sql = 'INSERT INTO Contact set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    updateContact(values, id, res){
        const sql = 'UPDATE Contact SET ? WHERE id_Contact = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    deleteContact(id, res){
        const sql = `DELETE from Contact WHERE id_Contact = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    viewContact(id, res){
        const sql = `SELECT * from Contact WHERE id_Contact = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    listContact(res){
        const sql = `SELECT * from Contact`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new Contact