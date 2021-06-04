const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Prosegur {

    async insertHistory() {
        try {
            const sql = "INSERT INTO ansa.webscrapinghistory (dateReg) values ( now() - interval 4 hour )"
            const result = await query(sql)
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listHistoryWebscraping(){
        try {
            const sql = `SELECT DATE_FORMAT(dateReg, '%H:%i %d/%m/%Y') as date FROM ansa.webscrapinghistory ORDER BY dateReg DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }
            
            return result[0].date 
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertTire(values) {
        try {
            const sql = 'INSERT INTO ansa.prosegurtire (nrSerie, state, location, car, brand, measures, kmInstallation, kmTotal, user, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour )'
            const result = await query(sql, values)
            return result[0]
        } catch (error) {
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

    async insertMaintenance(car, brand, kmNow, currentLocation, maintenanceDate, kmMaintenance, typeWarning, kmElapsed, remaining, work, state) {
        try {
            const sql = 'INSERT INTO ansa.prosegurmaintenance (car, brand, kmNow, currentLocation, maintenanceDate, kmMaintenance, typeWarning, kmElapsed, remaining, work, state, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour )'
            const result = await query(sql, [car, brand, kmNow, currentLocation, maintenanceDate, kmMaintenance, typeWarning, kmElapsed, remaining, work, state])
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listMaintenance() {
        try {
            const sql = `SELECT maintenanceDate FROM ansa.prosegurmaintenance ORDER BY maintenanceDate DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].maintenanceDate
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

    async insertPower(values) {
        try {
            const sql = 'INSERT INTO ansa.prosegurpower (dateStart, dateEnd, plate, alias, type, stoppedTime, direction, detentionDistance, coordinates, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour )'
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

    async insertArrest(dateStart, dateEnd, plate, alias, stoppedTime, direction, detentionDistance, coordinates,office) {

        try {
            const sql = 'INSERT INTO ansa.prosegurarrest (dateStart, dateEnd, plate, alias, stoppedTime, direction, detentionDistance, coordinates, office, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour )'
            const result = await query(sql, [dateStart, dateEnd, plate, alias, stoppedTime, direction, detentionDistance, coordinates,office])
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
            const sql = 'INSERT INTO ansa.inviolaveloffice (title, date, description, office, dateReg) values (?, ?, ?, ?, now() - interval 4 hour )'
            const result = await query(sql, [title, date, desc, office])
            return result[0]
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }
    }

    async insertOffice(time, codconnection, contract, description) {
        try {
            const sql = 'INSERT INTO ansa.proseguroffice (time, codconnection, contract, description, dateReg) values (?, ?, ?, ?, now() - interval 4 hour )'
            const result = await query(sql, [time, codconnection, contract, description])
            return result[0]
        } catch (error) {
            console.log(error)
            throw new InvalidArgumentError(error)
        }
    }

    async listOffice() {
        try {
            const sql = `SELECT time FROM ansa.proseguroffice ORDER BY time DESC LIMIT 1 `
            const result = await query(sql)

            if(!result[0]){
                return 0
            }

            return result[0].time
        } catch (error) {
            throw new InvalidArgumentError(error)
        }
    }

}

module.exports = new Prosegur()