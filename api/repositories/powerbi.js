const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class PowerBi {
    async insert(powerbi) {
        try {

            const sql = 'INSERT INTO canastra.powerbi (url, title, type, cod, dateReg) values (?, ?, ?, ?, now() - interval 3 hour )'
            await query(sql, [powerbi.url, powerbi.title, powerbi.type, powerbi.cod])

            return true
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT id_powerbi, title, url, type, cod, idreport, dateReg FROM canastra.powerbi `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    listLoginType(id_login, type) {
        try {
            const sql = `SELECT BI.id_powerbi, BI.title, BI.url, BI.type as typedesc, BI.type, BI.cod, BI.idreport, DATE_FORMAT(BI.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM canastra.powerbi BI, canastra.viewpowerbi VB WHERE VB.id_powerbi = BI.id_powerbi and VB.id_login = ${id_login} and BI.type = ${type}`
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    listLogin(id_login, type) {
        try {
            const sql = `SELECT BI.id_powerbi, BI.title, BI.url, BI.type as typedesc, BI.type, BI.cod, BI.idreport, DATE_FORMAT(BI.dateReg, '%H:%i %d/%m/%Y') as dateReg FROM canastra.powerbi BI, canastra.viewpowerbi VB WHERE VB.id_powerbi = BI.id_powerbi and VB.id_login = ${id_login}`
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async delete(id_powerbi) {
        try {

            const sqlView = `DELETE from canastra.viewpowerbi WHERE id_powerbi = ${id_powerbi}`
            await query(sqlView)

            const sql = `DELETE from canastra.powerbi WHERE id_powerbi = ${id_powerbi}`
            await query(sql)

            return true
        } catch (error) {
            throw new NotFound(error)
        }
    }

    async count(id_login) {
        try {

            const sql = `SELECT COUNT(id_viewpowerbi) as count FROM canastra.viewpowerbi WHERE id_login = ${id_login}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async update(powerbi) {
        try {
            const sql = 'UPDATE canastra.powerbi SET url = ?, type = ?, title = ?, cod = ?, idreport = ? WHERE id_powerbi = ?'
            const result = await query(sql, [powerbi.url, powerbi.type, powerbi.title, powerbi.cod, powerbi.idreport, powerbi.id_powerbi])
            return true
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async view(id_powerbi) {
        try {
            const sql = `SELECT id_powerbi, url, type, token, idreport, dateReg FROM canastra.powerbi WHERE id_powerbi = ${id_powerbi}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}

module.exports = new PowerBi()