const Address = require('../models/address')

module.exports = app  => {
    app.get('/listAddress', (req,res) => {
        Address.listAddress(res)
    })

    app.get('/viewAddress', (req,res) => {
        const id = req.body.id

        Address.viewAddress(id, res)
    })

    app.post('/insertAddress', (req,res) => {
        const values = req.body

        Address.createAddress(values, res)
    })

    app.post('/deleteAddress', (req,res) => {
        const id = req.body.id

        Address.deleteAddress(id, res)
    })

    app.post('/updateAddress', (req,res) => {
        const id = req.body.id
        const values = req.body

        Address.updateAddress(values, id, res)
    })

}