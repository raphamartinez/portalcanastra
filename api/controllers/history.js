const History = require('../models/history')
const Middleware = require('../infrastructure/auth/middleware')

module.exports = app => {
    app.get('/history', Middleware.bearer, async (req, res, next) => {
        try {
            const perfil = re.login.perfil
            const id_login = re.login.id_login

            const history = await History.listHistoryDashboard(perfil, id_login)
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })

    app.get('/history/:id', Middleware.bearer, async (req, res, next) => {
        try {
            const id_login = req.params.id

            const history = await History.listHistoryDashboardUser(id_login)
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

    app.get('/historys:id', Middleware.bearer, async (req, res, next) => {
        try {
            const id_login = req.params.id

            const history = await History.listHistoryUser(id_login)
            res.status(200).json(history)
        } catch (error) {
            next(error)
        }
    })
}