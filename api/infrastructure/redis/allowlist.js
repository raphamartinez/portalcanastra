const redis = require('redis');
const handlerList = require('./handlerlist');
const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' });

module.exports = handlerList(allowlist);