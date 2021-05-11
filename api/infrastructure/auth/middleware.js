const passport = require('passport')
const Login = require('../../models/login')
const Token = require('../../models/token')

module.exports = {

    local (req, res, next) {
      passport.authenticate(
        'local',
        { session: false },
        (error, user, info) => {
          if (error && error.name === 'InvalidArgumentError') {
            return res.status(401).json({ error: error.message })
          }
  
          if (error) {
            return res.status(500).json({ error: error.message })
          }
  
          if (!user) {
            return res.status(401).json()
          }
  
          req.user = user
          return next()
        }
      )(req, res, next)
    },
  
    bearer (req, res, next) {
      passport.authenticate(
        'bearer',
        { session: false },
        (error, user, info) => {
          if (error && error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: error.message })
          }
  
          if (error && error.name === 'TokenExpiredError') {
            return res
              .status(401)
              .json({ error: error.message, dateExp: error.expiredAt })
          }
  
          if (error) {
            return res.status(500).json({ error: error.message })
          }
  
          if (!user) {
            return res.status(401).json()
          }
  
          req.token = info.token
          req.user = user
          return next()
        }
      )(req, res, next)
    },
  
    async refresh (req, res, next) {
      try {
        const { refreshToken } = req.body
        const id = await Token.refresh.verify(refreshToken)
        await Token.refresh.invalid(refreshToken)
        req.user = await Login.viewLogin(id)
        return next()
      } catch (error) {
        if (error.name === 'InvalidArgumentError') {
          return res.status(401).json({ error: error.message })
        }
        return res.status(500).json({ error: error.message })
      }
    },
  
    async verifyMail (req, res, next) {
      try {
        const { token } = req.params
        const id = await Token.verifyMail.verify(token)
        req.user = await Login.viewLogin(id)
        next()
      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ error: error.message })
        }
  
        if (erro.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: error.message,
            expiredAt: error.expiredAt
          })
        }
  
        return res.status(500).json({ error: error.message })
      }
    }
  }
  