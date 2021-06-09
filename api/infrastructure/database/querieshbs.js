const connectionhbs = require('./connectionhbs')

const queryhbs = (query, parameters = '') => {
    return new Promise(
        (resolve, reject) => {
            connectionhbs.query(query, parameters, (errors, results, fields) => {
            if (errors) {
                reject(errors)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = queryhbs