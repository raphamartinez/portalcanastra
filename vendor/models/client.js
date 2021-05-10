const moment = require('moment')
const connection = require('../infraestrutura/database/connection')

class Client {

    createClient(values, res){
        const sql = 'INSERT INTO client set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    updateClient(values, id, res){
        const sql = 'UPDATE client SET ? WHERE id_client = ?'

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    deleteClient(id, res){
        const sql = `DELETE from client WHERE id_client = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    viewClient(id, res){
        const sql = `SELECT * from client WHERE id_client = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    listClient(res){
        const sql = `SELECT * from client`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }
}

module.exports = new Client