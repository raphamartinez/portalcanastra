const User = require('../models/user')


module.exports = app  => {

    app.get('/viewUser', (req,res) => {
        const id = req.body.id

        User.viewUser(id, res)
    })

    app.get('/listUsers', (req,res) => {
        User.viewUser(res)
    })

    app.post('/insertUser', (req,res) => {
        const values = req.body

        User.insertUser(values,res)
    })
    
    app.post('/updateUser', (req,res) => {
        const values = req.body
        const id = req.body.id

        User.updateUser(values, id, res)
    })

    app.post('/deleteUser', (req,res) => {
        const id = req.body.id

        User.deleteUser(id, res)
    })

}
