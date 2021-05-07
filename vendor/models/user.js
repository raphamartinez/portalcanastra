const moment = require('moment')
const connection = require('../infraestrutura/connection')


class User{

    insertUser(values,res) {
        const sql = 'INSERT INTO user set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }

    deleteUser(id, res){
        const sql = `DELETE from user WHERE id_user = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    updateUser(id, values, res){
        const sql = 'UPDATE user SET ? WHERE id_user = ?'
        if (values.data) {
            values.data = moment(valores.data, 'DD/MM/YYYY').format
        }

        connection.query(sql, [values, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(...values, id)
            }
        })
    }

    listUsers(res){
        const sql = 'SELECT * FROM user'

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })

    }

    viewUser(id,res){
        const sql = `SELECT * FROM user where id_user = ${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }    
}

module.exports = new User