const Login = require('../models/login')
const Middleware = require('../infrastructure/auth/middleware')
const { InvalidArgumentError } = require('../models/error')
const path = require('path')

module.exports = app => {

    app.post('/login', Middleware.local, async function (req, res, next) {

        try {
            const id_login = req.login.id_login
            const token = await Login.generateTokens(id_login)
            const login = await Login.viewLogin(id_login)

            res.status(200).json({ refreshToken: token.refreshToken, accessToken: token.accessToken, url: '../admin/dashboard.html', user: login })
        } catch (error) {
            next(error)
        }

    })

    app.post('/logout', [Middleware.refresh, Middleware.bearer], async function (req, res, next) {
        try {
            const token = req.token
            await Login.logout(token)

            res.sendFile('login.html', { root: path.join(__dirname, '../../views/public') });
        } catch (error) {
            next(error)
        }

    });


    app.get('/admin/*', Middleware.bearer, async function (req, res, next) {
        try {
            next()
        } catch (error) {
            next(error)
        }

    });

    app.post('/insertLogin', async function (req, res, next) {
        try {
            const login = req.body
            await Login.insertLogin(login)

            res.sendFile('login.html', { root: path.join(__dirname, '../../views/public') });
        } catch (error) {
            next(error)
        }

    });

    app.post('/forgotPassword', async function (req, res) {
        const mail = req.body.mail
        try {
            await Login.forgotPassword(mail)
            res.redirect('/login');

        } catch (err) {
            res.redirect('/login');
        }
    });

    app.post('/resetPassword', async function (req, res, next) {
        try {

            const result = await Login.changePassword(req)

            res.send({ message: "Senha atualizada com sucesso" })

        } catch (error) {
            next(error)
        }
    });

    app.post('/refreshToken', Middleware.refresh, async function (req, res) {
        const token = await Login.login(id_login)

        res.set('Authorization', token.accessToken)
        res.status(200).json({ refreshToken: token.refreshToken })
    });

    app.get('/login/mailVerify/:token', Middleware.verifyMail, async function (req, res) {
        const { token } = req.params
        //Chama user verify
    });
}