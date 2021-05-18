const History = require('../models/history')

module.exports = app => {
    app.get('/history', async (req, res, next) => {
        try {
            const history = await History.listHistoryDashboard()
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })

    app.get('/historys', async (req, res, next) => {
        try {
            const history = await History.listHistory()
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })
}