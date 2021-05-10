const Office = require('../models/office')

module.exports = app => {

    app.get('/offices', (req, res) => {
        Office.listOffice(res)
            .then(offices => res.status(200).json(offices))
            .catch(error => res.status(400).json(error))
    })

    app.get('/office/:id', (req, res) => {
        const id = req.body.id

        User.viewUser(id, res)
            .then(office => res.status(200).json(office))
            .catch(error => res.status(400).json(error))
    })

    app.post('/office', (req, res) => {
        const values = req.body

        Office.createOffice(values, res)
            .then(office => res.status(200).json(office))
            .catch(error => res.status(400).json(error))
    })

    app.patch('/office/:id', (req, res) => {
        const values = req.body
        const id = req.body.id

        Office.updateOffice(values, id, res)
            .then(office => res.status(200).json(office))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/office/:id', (req, res) => {
        const id = req.body.id

        Office.deleteOffice(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })
}