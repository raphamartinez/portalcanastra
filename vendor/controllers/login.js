const Login = require('../models/login')

module.exports = app  => {
    app.post('/login', (req,res) => {
        const mail = req.body.mail
        const password = req.body.password

        Login.login(mail,password,res)
    })

}