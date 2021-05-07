const ItemGroup = require('../models/itemgroup')

module.exports = app  => {
    app.get('/listItemGroup', (req,res) => {
        ItemGroup.listItemGroup(res)
    })

    app.post('/insertItemGroup', (req,res) => {
        const values = req.body

        ItemGroup.insertItemGroup(values, res)
    })

    app.post('/deleteItemGroup', (req,res) => {
        const id = req.body.id

        ItemGroup.deleteItemGroup(id, res)
    })

    app.post('/updateItemGroup', (req,res) => {
        const id = req.body.id
        const values = req.body

        ItemGroup.updateItemGroup(values, id, res)
    })

}