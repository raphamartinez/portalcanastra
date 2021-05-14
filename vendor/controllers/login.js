const Login = require('../models/login')
const passport = require(`passport`)

module.exports = app  => {
    app.post('/login',passport.authenticate('bearer', {session: false}), (req,res) => {
        const mail = req.body.mail
        const password = req.body.password

        const token = Login.checkAuth(mail,password)

        res.set(`Authorization`, token)
        res.sendFile(__dirname + `/views/adm/dashboard.html`)
    })

    app.post('/logout',passport.authenticate(`local`, {session: false}), function(req, res) {
        res.json({ auth: false, token: null });
        res.redirect('/login');
      });

}