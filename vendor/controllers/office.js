const Office = require('../models/office')

module.exports = app => {

    app.get('/listOffice', (req,res) => {
        Office.listOffice(res)
    })

    app.get('/viewOffice', (req,res) => {
        const id = req.body.id

        User.viewUser(id, res)
    })

    app.post('/insertOffice', (req,res) => {
        const values = req.body

        Office.createOffice(values,res)
    })
    
    app.post('/updateOffice', (req,res) => {
        const values = req.body
        const id = req.body.id

        Office.updateOffice(values, id, res)
    })

    app.post('/deleteOffice', (req,res) => {
        const id = req.body.id

        Office.deleteOffice(id, res)
    })
}