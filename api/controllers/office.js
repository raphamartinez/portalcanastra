const Office = require('../models/office')
const Middleware = require('../infrastructure/auth/middleware')

module.exports = app => {

    app.get('/offices', Middleware.bearer, async (req, res, next) => {
        try {
            const offices = await Office.listOffice()
            res.status(200).json(offices)
        } catch (error) {
            next(error)
        }
    })

    app.get('/office/:id', Middleware.bearer, async (req, res, next) => {
        try {
            const id_office = req.params.id

            const office = await User.viewUser(id_office)
            res.status(200).json(office)
        } catch (error) {
            next(error)
        }
    })

    app.post('/office', Middleware.bearer, async (req, res, next) => {
        try {
            const data = req.body

            const result = await Office.createOffice(data)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.put('/office/:id', Middleware.bearer, async (req, res, next) => {
        try {
            const data = req.body
            const id_office = req.params.id

            const result = await Office.updateOffice(data, id_office)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.delete('/office/:id', Middleware.bearer, async (req, res, next) => {
        try {
            const id_office = req.params.id

            const result = await Office.deleteOffice(id_office)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
}