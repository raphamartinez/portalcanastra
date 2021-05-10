const blacklist = require('../config/customExpress')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)
const { createHash } = require('crypto')

function generateHash(token) {
    return createHash('sha256')
        .update(token)
        .digest('hex')
}

module.exports = {
    add: async token => {
        const dateExp = jwt.decode(token).exp
        const tokenHash = generateHash(token)
        await setAsync(tokenHash, '')
        blacklist.expireat(tokenHash, dateExp)
    },
    contains: async token => {
        const tokenHash = generateHash(token)
        const result = await existsAsync(tokenHash)
        return result === 1
    }
}