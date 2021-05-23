const WebScraping = require('../models/webscraping')
const Middleware = require('../infrastructure/auth/middleware')

module.exports = app => {


    app.post('/maintenance', Middleware.bearer, async (req, res, next) => {
        try {

            const result = await WebScraping.listProsegurMaintenance()
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.post('/powerandstop', Middleware.bearer, async (req, res, next) => {
        try {

            const result = await WebScraping.listProsegurPowerandStop()
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.post('/tire', Middleware.bearer, async (req, res, next) => {
        try {

            const result = await WebScraping.listProsegurTire()
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
}