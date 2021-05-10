const User = require('../models/user')


module.exports = app  => {

    app.get('/users', (req,res) => {
        User.listUsers()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error))
    })

    app.post('/user', (req,res) => {
        const values = req.body

        User.insertUser(values,res)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json(error))
    })

    app.get('/user/:id', (req,res) => {
        const id = req.body.id

        User.viewUser(id, res)
    })
    
    app.patch('/user/:id', (req,res) => {
        const values = req.body
        const id = req.body.id

        User.updateUser(values, id, res)
    })

    app.delete('/user/:id', (req,res) => {
        const id = req.body.id

        User.deleteUser(id, res)
    })
}
