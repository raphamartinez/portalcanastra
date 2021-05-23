const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Prosegur {

    async insertTire(values) {
        try {
            console.log(values)

            const sql = 'INSERT INTO ansa.prosegurtire (nrSerie, state, location, car, brand, measures, kmInstallation, kmTotal, user, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, now())'
            const result = await query(sql, values)
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listTire() {
        try {
            const sql = `SELECT kmInstallation FROM ansa.prosegurtire ORDER BY id_prosegurtire DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }
            
            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertMaintenance(values) {
        try {
            const sql = 'INSERT INTO ansa.prosegurmaintenance (dateHigh, car, work, invoice, cost, typeNotice, warnAfter, state, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, now())'
            const result = await query(sql, values)
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listMaintenance() {
        try {
            const sql = `SELECT dateHigh FROM ansa.prosegurmaintenance ORDER BY id_prosegurmaintenance DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertPower(values) {
        try {
            console.log(values);
            const sql = 'INSERT INTO ansa.prosegurpower (dateStart, dateEnd, plate, alias, type, stoppedTime, direction, detentionDistance, coordinates, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, now())'
            const result = await query(sql, values)
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listPower() {
        try {
            const sql = `SELECT dateEnd FROM ansa.prosegurpower ORDER BY id_prosegurpower DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertArrest(values) {
        console.log(values)

        try {
            const sql = 'INSERT INTO ansa.prosegurarrest (dateStart, dateEnd, plate, alias, stoppedTime, direction, detentionDistance, coordinates, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, now())'
            const result = await query(sql, values)
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listArrest() {
        try {
            const sql = `SELECT dateEnd FROM ansa.prosegurarrest ORDER BY id_prosegurarrest DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0]
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }
}

module.exports = new Prosegur()