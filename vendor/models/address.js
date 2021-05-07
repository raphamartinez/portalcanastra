const moment = require('moment')
const connection = require('../infraestrutura/connection')

class Address {

    insertAddress(values, res){
        const sql = 'INSERT INTO Address set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    updateAddress(values, id, res){
        const sql = 'UPDATE Address SET ? WHERE id_Address = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    deleteAddress(id, res){
        const sql = `DELETE from Address WHERE id_Address = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    viewAddress(id, res){
        const sql = `SELECT * from Address WHERE id_Address = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    listAddress(res){
        const sql = `SELECT * from Address`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new Address