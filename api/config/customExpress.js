const express = require('express')
const consign = require('consign')
const path = require('path');

module.exports = () => {

  require('../infrastructure/redis/blocklist')
  require('../infrastructure/redis/allowlist')

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

  consign({ cwd: path.join(__dirname, '../') })
    .include('models')
    .then('controllers')
    .into(app)

  return app
}
