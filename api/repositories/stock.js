const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Stock {

    async insert(stock) {
        try {
            const sql = 'INSERT INTO api.stock () values ()'
            const result = await query(sql)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async update(stock) {
        try {
            const sql = 'UPDATE api.stock SET ? WHERE id = ?'
            const result = await query(sql, [stock.id])

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    list() {
        try {
            const sql = `SELECT * FROM api.stock `

            return query(sql)
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los login')
        }
    }

    delete(stock) {
        try {
            const sql = `DELETE FROM api.stock WHERE id = ?`

            return query(sql, stock.id)
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los login')
        }
    }

}

module.exports = new Stock()