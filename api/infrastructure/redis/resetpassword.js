const redis = require('redis');
const connection = redis.createClient({ prefix: 'reset-password' })
const handlerList = require('./handlerlist')

module.exports = handlerList(connection)