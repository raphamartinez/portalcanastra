const Label = require('../models/label')

module.exports = app => {
    app.get('/labels', (req, res) => {
        Label.listLabel(res)
            .then(labels => res.status(200).json(labels))
            .catch(error => res.status(400).json(error))
    })

    app.post('/label', (req, res) => {
        const values = req.body

        Label.insertLabel(values, res)
            .then(label => res.status(201).json(label))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/label/:id', (req, res) => {
        const id = req.body.id

        Label.deleteLabel(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })

    app.put('/label/:id', (req, res) => {
        const id = req.body.id
        const values = req.body

        Label.updateLabel(values, id, res)
            .then(label => res.status(200).json(label))
            .catch(error => res.status(400).json(error))
    })
}