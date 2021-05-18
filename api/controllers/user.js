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
            const id_user = req.params.id

            const user = await User.viewUser(id_user)
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
            const data = req.body
            const id_user = req.params.id
            const user = await User.updateUser(data, id_user)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    })

    app.delete('/user/:id', async(req, res, next) => {
        try {
            const id_user = req.params.id
            await User.deleteStatus(id_user)
            res.status(200).json(true)
        } catch (error) {
            next(error)
        }
    })
}
