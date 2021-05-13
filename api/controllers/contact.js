const Contact = require('../models/contact')

module.exports = app  => {
    app.get('/contacts', (req,res) => {
        Contact.listContact(res)
        .then(contacts => res.status(200).json(contacts))
        .catch(error => res.status(400).json(error))
    })

    app.get('/contact/:id', (req,res) => {
        const id = req.body.id

        Contact.viewContact(id, res)
        .then(contact => res.status(200).json(contact))
        .catch(error => res.status(400).json(error))
    })

    app.post('/contact', (req,res) => {
        const values = req.body

        Contact.insertContact(values, res)
        .then(contact => res.status(201).json(contact))
        .catch(error => res.status(400).json(error))
    })

    app.delete('/contact/:id', (req,res) => {
        const id = req.body.id

        Contact.deleteContact(id, res)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error))
    })

    app.put('/contact/:id', (req,res) => {
        const id = req.body.id
        const values = req.body

        Contact.updateContact(values, id, res)
        .then(contact => res.status(200).json(contact))
        .catch(error => res.status(400).json(error))
    })

}