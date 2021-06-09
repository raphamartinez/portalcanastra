const queryhbs = require('../infrastructure/database/querieshbs')
const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

async function formatStringDatetoCompare(data) {
    var ano = data.split("-")[2];
    var mes = data.split("-")[1];
    var dia = data.split("-")[0];

    return ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2) + '-' + ano;
}

class Hbs {

    listSalary() {
        try {
            const sql = ` SELECT sa.SerNr as serNr, sa.TransDate as date, sa.TransTime as time, sa.Office as office, sa.BaseRate as baserate, sa.CurrencyRate as currencyrate, sa.Comment as comment, 
            sa.Reference as reference, sa.Base2CreditSum as usd, sa.EmployeeName as name FROM SalaryPayment sa`
            return queryhbs(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async insertSalary(salary, date){

        try {
            const sql = `INSERT INTO ansa.salary (serNr, dateTime, office, comment, reference, usd, name) values (?, ?, ?, ?, ?, ?, ?)`
            await query(sql, [salary.serNr, date, salary.office, salary.comment, salary.reference, salary.usd, salary.name])

            return true
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }

    }

    listUsers() {
        try {
            const sql = ` SELECT wk.Name as name,wk.Phone as phone,wk.Mobile as mobile,wk.BirthDate AS dateBirthday,wk.Code AS cod,JobName AS responsibility, wk.modality as modalidad,
            wk.StartDate AS startCompany, wk.IDNro AS document, wk.Office AS officecode, ofi.Name as officename, wk.EndDate as endCompany, wk.Sex AS sex, wk.status from Workers as wk 
            LEFT JOIN City ct ON ct.Code =  wk.BirthPl 
            LEFT JOIN Office ofi ON wk.Office = ofi.Code `
            return queryhbs(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    async insertUser(user){
        try {
            const sql = `INSERT INTO ansa.user (name, perfil, dateBirthday, phone, cod, responsibility, modalidad, startCompany, document, officecode, officename, endCompany, status, sex, dateReg) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now() - interval 4 hour)`
            await query(sql, [user.name, 'user hbs', user.dateBirthday, user.phone, user.cod, user.responsibility, user.modalidad, user.startCompany, user.document, user.officecode, user.officename, user.endCompany, user.status, user.sex])

            return true
        } catch (error) {
            console.log(error);
            throw new InvalidArgumentError(error)
        }
    }
}

module.exports = new Hbs()