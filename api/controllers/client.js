const Client = require('../models/client')

module.exports = app => {
    app.get('/clients', (req, res) => {
        Client.listClient(res)
            .then(clients => res.status(200).json(clients))
            .catch(error => res.status(400).json(error))
    })

    app.get('/client/:id', (req, res) => {
        const id = req.body.id

        Client.viewClient(id, res)
            .then(client => res.status(200).json(client))
            .catch(error => res.status(400).json(error))
    })

    app.post('/client', (req, res) => {
        const values = req.body

        Client.createClient(values, res)
            .then(client => res.status(201).json(client))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/client/:id', (req, res) => {
        const id = req.body.id

        Client.deleteClient(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })

    app.put('/client/:id', (req, res) => {
        const id = req.body.id
        const values = req.body

        Client.updateClient(values, id, res)
            .then(client => res.status(200).json(client))
            .catch(error => res.status(400).json(error))
    })

}