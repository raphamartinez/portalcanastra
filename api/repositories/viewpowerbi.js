const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class ViewPowerBi {
    async insert(viewpowerbi) {
        try {
            const sql = 'INSERT INTO portalcanastra.viewpowerbi (id_powerbi, id_login, dateReg) values (?, ?, now() )'
            const result = query(sql, [viewpowerbi.id_powerbi, viewpowerbi.id_login])
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    list() {
        try {
            const sql = `SELECT id_viewpowerbi, id_powerbi, id_login, dateReg FROM portalcanastra.viewpowerbi `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async delete(id_viewpowerbi) {
        try {
            const sql = `DELETE from viewpowerbi WHERE id_viewpowerbi = ${id_viewpowerbi}`
            const result = await query(sql)
            return result[0]
        } catch (error) {
            throw new NotFound(error)
        }
    }
}

module.exports = new ViewPowerBi()