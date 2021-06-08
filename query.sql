#SQL para listar personas

SELECT wk.Name,wk.Phone,wk.Mobile,wk.BirthDate AS Cumpleanos,wk.Code AS Legajo,JobName AS Cargo, wk.modality as Modalidad,
wk.StartDate AS InicioEmpresa, wk.IDNro AS Cedula, wk.Office AS SucCode, ofi.Name as Sucursal, wk.EndDate, wk.Sex AS SexCode from Workers as wk 
LEFT JOIN City ct ON ct.Code =  wk.BirthPl 
LEFT JOIN Office ofi ON wk.Office = ofi.Code 


#SQL para listar salarios

SELECT jm.SerNr,jm.EmployeeCode,jm.EmployeeName,jm.WorkDepCode,jm.WorkDepName,jm.JobName,jm.Office,jm.Status,jm.ActiveFlag,jm.TransDate,jm.Amount 
FROM JobMovement jm INNER JOIN Workers w on  w.Code = jm.EmployeeCode


#salario

SELECT sa.SerNr, sa.TransDate, sa.TransTime, sa.BaseRate, sa.CurrencyRate, sa.Comment, sa.Reference, sa.Base2CreditSum, sa.EmployeeCode FROM SalaryPayment sa
