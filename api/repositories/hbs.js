const query = require('../infrastructure/database/queries')
const { InvalidArgumentError, InternalServerError, NotFound } = require('../models/error')

class Hbs {

    listSalary() {
        try {
            const sql = ` SELECT jm.SerNr,jm.EmployeeCode,jm.EmployeeName,jm.WorkDepCode,jm.WorkDepName,jm.JobName,jm.Office,jm.Status,jm.ActiveFlag,jm.TransDate,jm.Amount 
            FROM JobMovement jm INNER JOIN Workers w on  w.Code = jm.EmployeeCode `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }

    listUsers() {
        try {
            const sql = ` SELECT wk.Name,wk.Phone,wk.Mobile,wk.BirthDate AS Cumpleanos,wk.Code AS Legajo,JobName AS Cargo, wk.modality as Modalidad, wk.EmployeeKind,
            wk.StartDate AS InicioEmpresa, wk.IDNro AS Cedula, wk.Office AS SucCode, ofi.Name as Sucursal, wk.EndDate, wk.Sex AS SexCode from Workers as wk 
            LEFT JOIN City ct ON ct.Code =  wk.BirthPl 
            LEFT JOIN Office ofi ON wk.Office = ofi.Code `
            return query(sql)
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}

module.exports = new Hbs()