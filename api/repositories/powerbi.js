const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class PowerBi {
    async insert(powerbi = '', id_login) {
        try {
            const sql = 'INSERT INTO ansa.powerbi (url, title, type, dateReg) values (?, ?, ?, now())'
            await query(sql, [powerbi.url, powerbi.title, powerbi.type])

            const sqlId = 'select LAST_INSERT_ID() as id_powerbi from ansa.powerbi LIMIT 1'
            const obj = await query(sqlId)

            const sqlView = 'INSERT INTO ansa.viewpowerbi (id_powerbi, id_login, dateReg) values (?, 3, now())'
            const result = await query(sqlView, obj[0].id_powerbi)

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT id_powerbi, url, type, token, idreport, dateReg FROM powerbi `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    listLogin(id_login) {
        try {
            const sql = `SELECT BI.id_powerbi, BI.title, BI.url, BI.type, BI.token, BI.idreport, DATE_FORMAT(BI.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM ansa.powerbi BI, ansa.viewpowerbi VB WHERE VB.id_powerbi = BI.id_powerbi and VB.id_login = 3`
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async delete(id_powerbi) {
        try {

            const sqlView = `DELETE from viewpowerbi WHERE id_powerbi = ${id_powerbi}`
            const resultView = await sqlView(sql)

            const sql = `DELETE from powerbi WHERE id_powerbi = ${id_powerbi}`
            const result = await query(sql)

            return resultView[0]
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async count(id_login) {
        try{

            const sql = `SELECT COUNT(id_viewpowerbi) as count FROM ansa.viewpowerbi WHERE id_login = 3`
            return query(sql)
        }catch(error){

        }
    }

    async update(powerbi) {
        try {
            const sql = 'UPDATE powerbi SET url = ?, type = ?, token = ?, idreport = ? WHERE id_powerbi = ?'
            const result = await query(sql, [powerbi.url, powerbi.type, powerbi.token, powerbi.idreport, powerbi.id_powerbi])
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_powerbi) {
        try {
            const sql = `SELECT id_powerbi, url, type, token, idreport, dateReg FROM powerbi WHERE id_powerbi = ${id_powerbi}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

}

module.exports = new PowerBi()