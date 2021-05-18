const PowerBi = require('../models/powerbi')

module.exports = app => {

    app.get('/powerbis', async (req, res, next) => {

        try {
            const powerbis = await PowerBi.listPowerBi()
            res.status(200).json(powerbis)
        } catch (error) {
            next(error)
        }
    })

    app.get('/powerbis/:id', async (req, res, next) => {

        try {
            const id = req.params.id

            const powerbis = await PowerBi.listPowerBis(id)
            res.status(200).json(powerbis)
        } catch (error) {
            next(error)
        }
    })

    app.get('/powerbi/:id', async (req, res, next) => {
        try {
            const id = req.params.id

            const user = await PowerBi.viewPowerBi(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    })

    app.post('/powerbi', async (req, res, next) => {
        try {
            const powerbi = req.body.powerbi
            const result = await PowerBi.insertPowerBi(powerbi)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.put('/powerbi/:id', async (req, res, next) => {

        try {
            const data = req.body
            const id = req.params.id

            const user = await PowerBi.updatePowerBi(data, id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    })

    app.delete('/powerbi/:id', async(req, res, next) => {
        try {
            const id = req.params.id

            const result = await PowerBi.deletePowerBi(id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
}
