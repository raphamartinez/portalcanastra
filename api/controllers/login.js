const Login = require('../models/login')
const middleware = require('../infrastructure/auth/middleware')

module.exports = app => {
    app.post('/login', middleware.local, (req, res) => {
        res.fileRead('/dashboard');
    })

    app.post('/logout', [middleware.refresh, middleware.bearer], async function (req, res) {
        res.redirect('/login');
    });

    app.get('/login/mailVerify/:token',middleware.verifyMail, async function (req, res) {
        const { token } = req.params
        //Chama user verify
    });
}