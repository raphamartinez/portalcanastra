const redis = require('redis');
const blocklist = redis.createClient({ prefix: 'blocklist-access-token:' });
const handlerList = require('./handlerlist');
const handlerBlocklist = handlerList(blocklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

module.exports = {
  async add(token) {
    const dateExp = jwt.decode(token).exp;
    const tokenHash = generateTokenHash(token);
    await handlerBlocklist.add(tokenHash, '', dateExp);
  },
  async containsToken(token) {
    const tokenHash = generateTokenHash(token);
    return handlerBlocklist.containsKey(tokenHash);
  },
};
