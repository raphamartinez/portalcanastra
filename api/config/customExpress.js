const express = require('express')
const consign = require('consign')
const passport = require('passport')
const bearerStrategy = require('passport-http-bearer')
const redis = require('redis')
const path = require('path');

module.exports = () => {
  require('dotenv').config()

  // redis.createClient({ prefix: 'blocklist:' })

  const app = express()

  app.use((req, res, next) => {

    if (req.headers["x-forwarded-proto"] == "http")
      res.redirect(`https://${req.headers.host}${req.url}`)
    else {
      next();
    }

  });

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Resposta Fake para o coockie X-Powered-By
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'PHP/7.1.7')
    next();
  });

  passport.use(
    new bearerStrategy(
      async (token, done) => {
        try {
          const payload = jwt.verify(token, process.env.KEY_JWT)
          const user = await User.viewUser(payload.id)
          done(null, user)
        } catch (error) {
          done(error)
        }
      })
  )

  consign({ cwd: path.join(__dirname, '../') })
    .include('models')
    .then('controllers')
    .into(app)

  return app
}
