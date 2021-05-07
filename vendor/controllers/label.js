const Label = require('../models/label')

module.exports = app  => {
    app.get('/listLabel', (req,res) => {
        Label.listLabel(res)
    })

    app.post('/insertLabel', (req,res) => {
        const values = req.body

        Label.insertLabel(values, res)
    })

    app.post('/deleteLabel', (req,res) => {
        const id = req.body.id

        Label.deleteLabel(id, res)
    })

    app.post('/updateLabel', (req,res) => {
        const id = req.body.id
        const values = req.body

        Label.updateLabel(values, id, res)
    })

}