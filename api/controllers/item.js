const Item = require('../models/item')

module.exports = app => {
    app.get('/items', (req, res) => {
        Item.listItem(res)
            .then(items => res.status(200).json(items))
            .catch(error => res.status(400).json(error))
    })

    app.get('/item/:id', (req, res) => {
        const id = req.body.id

        Item.viewItem(id, res)
            .then(item => res.status(200).json(item))
            .catch(error => res.status(400).json(error))
    })

    app.post('/item', (req, res) => {
        const values = req.body

        Item.createItem(values, res)
            .then(item => res.status(200).json(item))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/item/:id', (req, res) => {
        const id = req.body.id

        Item.deleteItem(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })

    app.put('/item/:id', (req, res) => {
        const id = req.body.id
        const values = req.body

        Item.updateItem(values, id, res)
            .then(item => res.status(200).json(item))
            .catch(error => res.status(400).json(error))
    })

}