require('dotenv').config({ path: __dirname + '\\.env', encoding: 'utf8' })

const customExpress = require('./api/config/customExpress')
const connection = require('./api/infrastructure/database/connection')
const tables = require('./api/infrastructure/database/tables')
const express = require('express')
const User = require('./api/models/user')

connection.connect((error => {
    if (error) {
        console.log(error)
    } else {
        const app = customExpress()
        tables.init(connection)
        app.listen(80, () => {
            console.log(`working!`);

            app.use(express.static(__dirname + '/public'))
            app.use(express.static(__dirname + '/views'))

            app.get('/', function (req, res) {
                res.sendFile(__dirname + '/views/public/login.html');
            });
        })
    }
}))