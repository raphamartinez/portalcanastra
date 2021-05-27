require('dotenv').config({ path: __dirname + '\\.env', encoding: 'utf8' })

const customExpress = require('./api/config/customExpress')
const connection = require('./api/infrastructure/database/connection')
const tables = require('./api/infrastructure/database/tables')
const WebScraping = require('./api/models/webscraping')
const express = require('express')
const schedule = require('node-schedule');
const CronJob = require('cron').CronJob

connection.connect((error => {

    if (error) {
        console.log(error)
    } else {
        const app = customExpress()
        tables.init(connection)
        app.listen(3000, () => {
            console.log('Server Running!');

            app.use(express.static(__dirname + '/public'))
            app.use(express.static(__dirname + '/views'))

            app.all('/', function (req, res) {
                res.sendFile(__dirname + '/views/public/login.html');
            });

            const job = new CronJob('0 0 23 * * *', () => {
                try{
                    WebScraping.init()
                    console.log('Executed Cron today sucessfuly!');
                } catch(error){
                    console.log('Error cron!');
                }
            });

            job.start()
        })
    }
}))