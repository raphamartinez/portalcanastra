const History = require('../models/history')

module.exports = app  => {
    app.get('/listHistory', (req,res) => {
        History.listHistory(res)
    })

    app.get('/viewHistory', (req,res) => {
        const id = req.body.id

        History.viewHistory(id, res)
    })

    app.post('/insertHistory', (req,res) => {
        const values = req.body

        History.insertHistory(values, res)
    })

    app.post('/deleteHistory', (req,res) => {
        const id = req.body.id

        History.deleteHistory(id, res)
    })

    app.post('/updateHistory', (req,res) => {
        const id = req.body.id

        History.updateHistory(id, res)
    })

}