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
            
            return result[0].kmInstallation
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
            const sql = `SELECT dateHigh FROM ansa.prosegurmaintenance ORDER BY dateHigh DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].dateHigh
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
            const sql = `SELECT DATE_FORMAT(dateEnd, '%Y-%m-%d %H:%i:%s') as dateEnd FROM ansa.prosegurpower ORDER BY dateEnd DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].dateEnd
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
            const sql = `SELECT DATE_FORMAT(dateEnd, '%Y-%m-%d %H:%i:%s') as dateEnd  FROM ansa.prosegurarrest ORDER BY dateEnd DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].dateEnd
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async listInviolavel() {
        try {
            const sql = `SELECT date FROM ansa.inviolaveloffice ORDER BY date DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].date
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertInviolavel(title, date, desc, office){
        try {
            const sql = 'INSERT INTO ansa.inviolaveloffice (title, date, description, office, dateReg) values (?, ?, ?, ?, now())'
            const result = await query(sql, [title, date, desc, office])
            return result[0]
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }
    }

    async insertOffice(date, time, codconnection, contract, description) {
        try {
            const sql = 'INSERT INTO ansa.proseguroffice (date, time, codconnection, contract, description, dateReg) values (?, ?, ?, ?, ?, now())'
            const result = await query(sql, [date, time, codconnection, contract, description])
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listOffice() {
        try {
            const sql = `SELECT date FROM ansa.proseguroffice ORDER BY date DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].dateEnd
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

}

module.exports = new Prosegur()