const User = require('../models/user')
const middleware = require('../infrastructure/auth/middleware')

module.exports = app => {

    app.get('/users', [middleware.bearer], async (req, res, next) => {
        try {
            const users = await User.listUsers(req)
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    })

    app.post('/user', async (req, res, next) => {
        const values = req.body

        try {
            const user = await User.insertUser(values)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    })

    app.get('/user/:id', async (req, res, next) => {
        const { id } = req.params

        try {
            const user = await User.viewUser(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    })

    app.put('/user/:id', async (req, res, next) => {
        const values = req.body
        const { id } = req.params

        try {
            const user = await User.updateUser(values, id)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    })

    app.delete('/user/:id', async (req, res, next) => {
        const { id } = req.params

        try {
            const user = await User.deleteUser(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    })
}
