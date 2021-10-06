const redis = require('redis');
const handlerList = require('./handlerlist');
const cachelist = redis.createClient({ prefix: 'cacheapi:' });

module.exports = handlerList(cachelist);