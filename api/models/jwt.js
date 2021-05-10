const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment')

class Jwt {

  createAccessToken(id) {
    return new Promise((resolve, reject) => {
      const token_string = jwt.sign(id, process.env.KEY_JWT, { expiresIn: '1h' }, { algorithm: 'RS256' })
      resolve(token_string)
    })
  }


  gererateHash(password) {
    const costHash = 12;
    return bcrypt.hash(password, costHash)
  }

  createRefreshToken(id) {
    const refreshToken = crypto.randomBytes(24).toString('hex')
    const dateExp = moment().add(1, 'd').unix();

    return refreshToken
}

}

module.exports = new Jwt()