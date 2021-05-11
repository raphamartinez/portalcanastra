const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcrypt')
const { InvalidArgumentError } = require('../../models/error')
const Login = require('../../models/login')
const Token = require('../../models/token')


function verifyUser (usuario) {
  if (!usuario) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail!')
  }
}

async function verifyPassword (password, passwordHash) {
  const passwordValid = await bcrypt.compare(password, passwordHash)
  if (!passwordValid) {
    throw new InvalidArgumentError('E-mail ou senha inválidos!')
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'mail',
      passwordField: 'password',
      session: false
    },
    async (mail, password, done) => {
      try {
        const user = await Login.buscaPorEmail(mail)
        verifyUser(user)
        await verifyPassword(password, user.passwordHash)

        done(null, user)
      } catch (erro) {
        done(erro)
      }
    }
  )
)

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const id = await Token.access.verify(token)
      const user = await Login.buscaPorId(id)
      done(null, user, { Token })
    } catch (erro) {
      done(erro)
    }
  })
)
