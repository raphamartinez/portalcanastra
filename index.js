require('dotenv').config({ path: __dirname + '\\.env', encoding: 'utf8' })
require('events').EventEmitter.prototype._maxListeners = 100;

const customExpress = require('./api/config/customExpress')
const connection = require('./api/infrastructure/database/connection')
const tables = require('./api/infrastructure/database/tables')
const express = require('express')
const path = require('path')

connection.connect((error => {
    if (error) {
        console.log(error)
    } else {
        const app = customExpress()
        tables.init(connection)
        app.listen(3000, () => {
            console.log(`working!`);

            app.set('views', [path.join(__dirname, 'views/public'), path.join(__dirname, 'views/admin')])
            app.engine('html', require('ejs').renderFile)
            app.set('view engine', 'html')

            app.use(express.static(__dirname + '/public'))
            app.use(express.static(__dirname + '/views'))

            app.get('/', function (req, res) {
                res.render('login');
            });

            // app.use((err, req, res, next) => {

            //     let status = 500
            //     const body = {
            //         message: err.message
            //     }

            //     if (err instanceof NotFound) {
            //         status = 404
            //         body.dateExp = err.dateExp
            //     }

            //     if (err instanceof NotAuthorized) {
            //         status = 401
            //         body.dateExp = err.dateExp
            //     }

            //     if (err instanceof InvalidArgumentError) {
            //         status = 400
            //     }

            //     if (err instanceof jwt.JsonWebTokenError) {
            //         status = 401
            //     }

            //     if (err instanceof jwt.TokenExpiredError) {
            //         status = 401
            //         body.dateExp = err.dateExp
            //     }

            //     res.status(status)
            //     res.json(body)
            // })
        })
    }
}))