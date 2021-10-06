const File = require('../models/file')
const Middleware = require('../infrastructure/auth/middleware')
const multer = require('multer')
const multerConfig = require('../config/multer')
const Authorization = require('../infrastructure/auth/authorization')
const cachelist = require('../infrastructure/redis/cache')

module.exports = app => {

    app.post('/file', [Middleware.bearer, Authorization('file', 'create')], multer(multerConfig).single('file'), async (req, res, next) => {
        try {
            const file = req.file
            const details = req.body

            await File.save(file, details, req.login.id)

            cachelist.delPrefix('file')

            res.json({msg: `Imagem agregada con éxito.`})
        } catch (err) {
            console.log(err);
            next(err)
        }
    })

    app.delete('/file/:id', [Middleware.bearer, Authorization('file', 'delete')], async (req, res, next) => {
        try {
            const file = await File.delete(req.params.id)

            cachelist.delPrefix('file')

            res.json(file)
        } catch (err) {
            next(err)
        }
    })
}