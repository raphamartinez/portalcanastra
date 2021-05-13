const express = require('express')
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy
const cors = require('cors')
const consign = require('consign')
const path = require('path');
const { InvalidArgumentError, NotFound, NotAuthorized } = require('../models/error');
const jwt = require('jsonwebtoken');

module.exports = () => {



  require('../infrastructure/redis/blocklist')
  require('../infrastructure/redis/allowlist')

  const app = express()

  app.use(cors())

  require('../infrastructure/auth/strategy')

  app.use(passport.initialize())

  // app.use((req, res, next) => {
  //   if (req.headers["x-forwarded-proto"] == "http")
  //     res.redirect(`https://${req.headers.host}${req.url}`)
  //   else {
  //     next();
  //   }
  // });

  // app.use((req, res, next) => {
  //   res.set({
  //     'Content-Type': 'application/json'
  //   })
  //   next()
  // });

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization')
    app.use(cors())
    next();
  });

  // Resposta Fake para o coockie X-Powered-By
  // app.use((req, res, next) => {
  //   res.setHeader('X-Powered-By', 'PHP/7.1.7')
  //   next();
  // });

  consign({ cwd: path.join(__dirname, '../') })
    .include('models')
    .then('controllers')
    .into(app)

  app.use((error, req, res, next) => {
    let status = 500
    const body = {
      message: error.message
    }

    if (error instanceof NotFound) {
      status = 404
      body.dateExp = error.dateExp
    }

    if (error instanceof NotAuthorized) {
      status = 401
      body.dateExp = error.dateExp
    }

    if (error instanceof InvalidArgumentError) {
      status = 400
    }

    if (error instanceof jwt.JsonWebTokenError) {
      status = 401
    }

    if (error instanceof jwt.TokenExpiredError) {
      status = 401
      body.dateExp = error.dateExp
    }

    res.status(status)
    res.json(body)
  })

  return app
}
