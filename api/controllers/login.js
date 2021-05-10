const Login = require('../models/login')
const passport = require(`passport`)
const blackList = require('../models/redis')
const jwt = require('../models/jwt')


module.exports = app => {
    app.post('/login', (req, res) => {
        const mail = req.body.mail
        const password = req.body.password

        Login.checkAuth(mail, password)
            .then(user => {
                const accessToken = jwt.createAccessToken(user.id)
                const refreshToken = jwt.createRefreshToken()

                res.set(`Authorization`, accessToken)
                res.status(200).json(refreshToken)
                res.sendFile(__dirname + `/views/dashboard.html`)
            })
            .catch(error => {
                res.status(400).sendFile(`/views/login.html`)
            })
    })

    app.post('/logout', passport.authenticate(`local`, { session: false }), async function (req, res) {
        const token = req.token

        await blackList.add(token)
        res.redirect('/login');
    });

}