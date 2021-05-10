const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bearerStrategy = require('passport-http-bearer').Strategy;

class Jwt {

  createToken(id) {
    return new Promise((resolve, reject) => {
      const token_string = jwt.sign(id, process.env.KEY_JWT, { expiresIn: '1h' }, { algorithm: 'RS256' })
      resolve(token_string)
    })
  }


  gererateHash(password) {
    const costHash = 12;
    return bcrypt.hash(password, costHash)
  }

}

//implementar black list



module.exports = new Jwt()