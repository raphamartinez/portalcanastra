const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Car {

    list() {
        try {
            const sql = `SELECT it.plate, IF(qt.status = 1,COUNT(qt.id), 0) as quotations, IF(it.status = 0,COUNT(it.id),0) as mountPending, IF(it.status = 1,COUNT(it.id),0) as mountQuoted
            , IF(it.status = 2,COUNT(it.id),0) as mountApproved, IF(it.status = 3,COUNT(it.id),0) as mountPurchased
            FROM api.item it 
            LEFT JOIN api.quotation qt ON it.id = qt.id_item
            GROUP BY plate
            ORDER BY plate`

            return query(sql)
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los login')
        }
    }
}

module.exports = new Car()