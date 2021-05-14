const Address = require('../models/address')

module.exports = app  => {
    app.get('/address', (req,res) => {
        Address.listAddress(res)
        .then(address => res.status(200).json(address))
        .catch(error => res.status(400).json(error))
    })

    app.get('/address/:id', (req,res) => {
        const id = req.body.id

        Address.viewAddress(id, res)
        .then(address => res.status(200).json(address))
        .catch(error => res.status(400).json(error))
    })

    app.post('/address', (req,res) => {
        const values = req.body

        Address.createAddress(values, res)
        .then(address => res.status(200).json(address))
        .catch(error => res.status(400).json(error))
    })

    app.delete('/address/:id', (req,res) => {
        const id = req.body.id

        Address.deleteAddress(id, res)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error))
    })

    app.put('/address/:id', (req,res) => {
        const id = req.body.id
        const values = req.body

        Address.updateAddress(values, id, res)
        .then(address => res.status(200).json(address))
        .catch(error => res.status(400).json(error))
    })
}