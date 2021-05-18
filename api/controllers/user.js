const User = require('../models/user')

module.exports = app => {

    app.get('/users', async (req, res, next) => {

        try {
            const users = await User.listUsers()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    })

    app.get('/user/:id', async (req, res, next) => {
        try {
            const id = req.params.id

            const user = await User.viewUser(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    })

    app.post('/user', async (req, res, next) => {
        try {
            const data = req.body

            const result = await User.insertUser(data)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })

    app.put('/user/:id', async (req, res, next) => {

        try {
            const values = req.body
            const id = req.params.id

            const user = await User.updateUser(values, id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    })

    app.delete('/user/:id', async(req, res, next) => {
        try {
            const id = req.params.id

            const result = await User.deleteUser(id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    })
}
