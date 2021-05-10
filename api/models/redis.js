// const blocklist = require('../config/customExpress')
// const { promisify } = require('util')
// const jwt = require('jsonwebtoken')

// const existsAsync = promisify(blocklist.exists).bind(blocklist)
// const setAsync = promisify(blocklist.set).bind(blocklist)
// const { createHash } = require('crypto')

// function generateHash(token) {
//     return createHash('sha256')
//         .update(token)
//         .digest('hex')
// }

// module.exports = {
//     add: async token => {
//         const dateExp = jwt.decode(token).exp
//         const tokenHash = generateHash(token)
//         await setAsync(tokenHash, '')
//         blocklist.expireat(tokenHash, dateExp)
//     },
//     contains: async token => {
//         const tokenHash = generateHash(token)
//         const result = await existsAsync(tokenHash)
//         return result === 1
//     }
// }