const AccessControl = require('accesscontrol')
const controll = new AccessControl()

// 0 - master
// 1 - admin 
// 2 - usuario
// 3 - operacional

controll.grant('1')
    .readAny('user', ['*'])
    .createAny('user')
    .deleteAny('user')
    .updateAny('user', ['*'])

controll.grant('2')
    .readOwn('user', ['*'])

controll.grant('3')
    .readOwn('user', ['*'])

controll.grant('4')
    .readAny('user', ['*'])

controll.grant('5')
    .readOwn('user', ['*'])

module.exports = controll