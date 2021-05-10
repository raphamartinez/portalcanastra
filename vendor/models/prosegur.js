const axios = require('axios')
const connection = require('../infraestrutura/database/connection')

class Prosegur {

    listData (res) {

        const { data } = await axios.post('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3', {nombre: 'pviana05@gmail.com', pass: 'America+123'})

        const sql = 'INSERT INTO client set ?'

        connection.query(sql, values, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }
}