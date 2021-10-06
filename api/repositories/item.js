const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Item {

    async insert(item) {
        try {
            const sql = 'INSERT INTO api.item (code, name, brand, plate, status, type, km, description, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour)'
            await query(sql, [item.code, item.name, item.brand, item.plate, item.status, item.type, item.km, item.description])

            const sqlId = 'select LAST_INSERT_ID() as id from api.item LIMIT 1'
            const obj = await query(sqlId)
            return obj[0].id
        } catch (error) {
            throw new InvalidArgumentError('No se pudo ingresar el articulo en la base de datos')
        }
    }

    async update(item) {
        try {
            const sql = 'UPDATE api.item SET id_provider = ? WHERE id = ?'
            const result = await query(sql, [item.id_provider, item.id])

            return result
        } catch (error) {
            throw new InvalidArgumentError('No se pudo ingresar el login en la base de datos')
        }
    }

    list(plate) {
        try {
            let sql = `SELECT it.code, it.id, it.name, it.brand, it.plate, DATE_FORMAT(it.dateReg, '%H:%i %d/%m/%Y') as date, it.status, if(it.type = 1, "Presupuesto", "Stock") as type, it.km, it.description
            FROM api.item it `

           if(plate) sql+= `WHERE it.plate = '${plate}'`

           return query(sql)
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los login')
        }
    }

    delete(item) {
        try {
            const sql = `DELETE FROM api.item WHERE id = ?`

            return query(sql, item.id)
        } catch (error) {
            throw new InternalServerError('No se pudieron enumerar los login')
        }
    }

}

module.exports = new Item()