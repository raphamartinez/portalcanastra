const Contact = require('../models/contact')

module.exports = app  => {
    app.get('/listContact', (req,res) => {
        Contact.listContact(res)
    })

    app.get('/viewContact', (req,res) => {
        const id = req.body.id

        Contact.viewContact(id, res)
    })

    app.post('/insertContact', (req,res) => {
        const values = req.body

        Contact.insertContact(values, res)
    })

    app.post('/deleteContact', (req,res) => {
        const id = req.body.id

        Contact.deleteContact(id, res)
    })

    app.post('/updateContact', (req,res) => {
        const id = req.body.id
        const values = req.body

        Contact.updateContact(values, id, res)
    })

}