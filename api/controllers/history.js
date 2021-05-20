const History = require('../models/history')
const Middleware = require('../infrastructure/auth/middleware')

module.exports = app => {
    app.get('/history', Middleware.bearer, async (req, res, next) => {
        try {
            const history = await History.listHistoryDashboard()
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })

    app.get('/historys', Middleware.bearer, async (req, res, next) => {
        try {
            const history = await History.listHistory()
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })
}