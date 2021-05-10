const ItemGroup = require('../models/itemgroup')

module.exports = app => {
    app.get('/itemgroups', (req, res) => {
        ItemGroup.listItemGroup(res)
            .then(itemgroups => res.status(200).json(itemgroups))
            .catch(error => res.status(400).json(error))
    })

    app.post('/itemgroup', (req, res) => {
        const values = req.body

        ItemGroup.insertItemGroup(values, res)
            .then(itemgroup => res.status(200).json(itemgroup))
            .catch(error => res.status(400).json(error))
    })

    app.delete('/itemgroup/:id', (req, res) => {
        const id = req.body.id

        ItemGroup.deleteItemGroup(id, res)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error))
    })

    app.patch('/itemgroup/:id', (req, res) => {
        const id = req.body.id
        const values = req.body

        ItemGroup.updateItemGroup(values, id, res)
            .then(itemgroup => res.status(200).json(itemgroup))
            .catch(error => res.status(400).json(error))
    })

}