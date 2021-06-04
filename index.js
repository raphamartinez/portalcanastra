require('dotenv').config({ path: __dirname + '\\.env', encoding: 'utf8' })
require('events').EventEmitter.prototype._maxListeners = 100;

const customExpress = require('./api/config/customExpress')
const connection = require('./api/infrastructure/database/connection')
const tables = require('./api/infrastructure/database/tables')
const WebScraping = require('./api/models/webscraping')
const express = require('express')
const CronJob = require('cron').CronJob

connection.connect((error => {
    process.setMaxListeners(100)
    if (error) {
        console.log(error)
    } else {
        const app = customExpress()
        app.listen(3000, () => {
            tables.init(connection)
            console.log('Server Running!');

            app.use(express.static(__dirname + '/public'))
            app.use(express.static(__dirname + '/views'))

            app.all('/', function (req, res) {
                res.sendFile(__dirname + '/views/public/login.html');
            });

            WebScraping.init()

            const job = new CronJob('0 0 23 * * *', () => {
                try{
                    WebScraping.init()
                    console.log('Executed Cron sucessfuly!');
                } catch(error){
                    console.log('Error cron!');
                }
            });

            job.start()
        })
    }
}))