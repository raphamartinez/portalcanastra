const History = require('../models/history')

module.exports = app => {
    app.get('/historys', (req, res) => {
        History.listHistory(res)
            .then(historys => res.status(200).json(historys))
            .catch(error => res.status(400).json(error))
    })

    app.get('/history/:id', (req, res) => {
        const id = req.body.id

        History.viewHistory(id, res)
            .then(history => res.status(200).json(history))
            .catch(error => res.status(400).json(error))
    })

    app.post('/history', (req, res) => {
        const values = req.body

        History.insertHistory(values, res)
            .then(history => res.status(201).json(history))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/history/:id', (req, res) => {
        const id = req.body.id

        History.deleteHistory(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })

    app.put('/history/:id', (req, res) => {
        const id = req.body.id

        History.updateHistory(id, res)
            .then(history => res.status(200).json(history))
            .catch(error => res.status(400).json(error))
    })

}