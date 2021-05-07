const Client = require('../models/client')

module.exports = app  => {
    app.get('/listClient', (req,res) => {
        Client.listClient(res)
    })

    app.get('/viewClient', (req,res) => {
        const id = req.body.id

        Client.viewClient(id, res)
    })

    app.post('/insertClient', (req,res) => {
        const values = req.body

        Client.createClient(values, res)
    })

    app.post('/deleteClient', (req,res) => {
        const id = req.body.id

        Client.deleteClient(id, res)
    })

    app.post('/updateClient', (req,res) => {
        const id = req.body.id
        const values = req.body

        Client.updateClient(values, id, res)
    })

}