<<<<<<< HEAD
require('dotenv').config({path: __dirname + '\\.env', encoding: 'utf8'})

=======
>>>>>>> de55bacec8263a31fbb1ca3beb14ae1bbe34b238
const customExpress = require('./api/config/customExpress')
const connection = require('./api/infrastructure/database/connection')
const tables = require('./api/infrastructure/database/tables')
const path = require('path');
const express = require('express')

connection.connect((error => {

    if (error) {
        console.log(error)
    } else {
        const app = customExpress()

        tables.init(connection)
        app.listen(3000, () => {
<<<<<<< HEAD
            app.use(express.static(__dirname + '/public'))
            app.use(express.static(__dirname + '/views'))

            app.get('/', function (req, res) {
                res.sendFile(__dirname + '/views/public/login.html');
=======
            app.use(express.static(__dirname + '/views'))
            app.use(express.static(__dirname + '/public'))

            app.get('/', function (req, res) {
                res.sendFile(__dirname + '/views/login.html');
                //__dirname : It will resolve to your project folder.
>>>>>>> de55bacec8263a31fbb1ca3beb14ae1bbe34b238
            });
        })
    }
}))



