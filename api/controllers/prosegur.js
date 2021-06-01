const WebScraping = require('../models/webscraping')
const Middleware = require('../infrastructure/auth/middleware')

module.exports = app => {
    app.get('/seguridad', Middleware.bearer, async (req, res, next) => {
        try {
            const result = await WebScraping.init()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
}