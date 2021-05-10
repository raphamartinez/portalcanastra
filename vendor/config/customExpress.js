const express = require('express')
const consign = require('consign')
const passport = require('passport')

module.exports = () => {
    require('dotenv').config()
    require('../infraestrutura/redis/blackList')
    
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

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

    consign()
        .include('controllers')
        .into(app)

    return app
}
