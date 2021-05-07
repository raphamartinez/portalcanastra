const Item = require('../models/item')

module.exports = app  => {
    app.get('/listItem', (req,res) => {
        Item.listItem(res)
    })

    app.get('/viewItem', (req,res) => {
        const id = req.body.id

        Item.viewItem(id, res)
    })

    app.post('/insertItem', (req,res) => {
        const values = req.body

        Item.createItem(values, res)
    })

    app.post('/deleteItem', (req,res) => {
        const id = req.body.id

        Item.deleteItem(id, res)
    })

    app.post('/updateItem', (req,res) => {
        const id = req.body.id
        const values = req.body

        Item.updateItem(values, id, res)
    })

}