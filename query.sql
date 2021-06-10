#SQL para listar personas

SELECT wk.Name,wk.Phone,wk.Mobile,wk.BirthDate AS Cumpleanos,wk.Code AS Legajo,JobName AS Cargo, wk.modality as Modalidad, wk.EmployeeKind,
wk.StartDate AS InicioEmpresa, wk.IDNro AS Cedula, wk.Office AS SucCode, ofi.Name as Sucursal, wk.EndDate, wk.Sex AS SexCode from Workers as wk 
LEFT JOIN City ct ON ct.Code =  wk.BirthPl 
LEFT JOIN Office ofi ON wk.Office = ofi.Code 


#SQL para listar salarios

SELECT jm.SerNr,jm.EmployeeCode,jm.EmployeeName,jm.WorkDepCode,jm.WorkDepName,jm.JobName,jm.Office,jm.Status,jm.ActiveFlag,jm.TransDate,jm.Amount 
FROM JobMovement jm INNER JOIN Workers w on  w.Code = jm.EmployeeCode


#salario

SELECT sa.SerNr, sa.TransDate, sa.TransTime, sa.Office, sa.BaseRate, sa.CurrencyRate, sa.Comment, sa.Reference, sa.Base2CreditSum, sa.EmployeeCode, sa.EmployeeName FROM SalaryPayment sa


#Contas a Receber

SELECT SerNr,SalesMan,Code,Name,CustomerGroup,TransDate,Office,Days,rowNr,SUM(d15) AS d15,SUM(d30) AS d30 ,SUM(d60) AS d60,SUM(d90) AS d90,SUM(d120) AS d120,SUM(dm120) AS dm120,SUM(Vencido) AS Vencido,
ItemGroup,DueDate,Saldo,itemDesc,Total,LastPayDate,Currency,CurrencyRate,BaseRate FROM (SELECT i.SerNr,i.Salesman,c.Code,c.GroupCode as CustomerGroup,i.TransDate,i.Office,c.Name,DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW()) AS Days,ir.rowNr,i.Currency,i.CurrencyRate,i.BaseRate
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 0 AND DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 <= 15,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS d15
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 15 AND DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 <= 30,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS d30
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 30 AND DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 <= 60,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS d60 
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 60 AND DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 <= 90,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS d90 
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 90 AND DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 <= 120,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS d120
,SUM(IF(DATEDIFF(IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate),NOW())*-1 > 120,IF(ir.Saldo > 0,ir.Saldo,i.Saldo ),0)) AS dm120
,SUM(IF(DATEDIFF(ir.DueDate,NOW()) < 0,ir.Saldo,0)) AS Vencido,IF(ir.DueDate IS NULL,i.DueDate,ir.DueDate) AS DueDate,i.Saldo,iir.Name AS itemDesc,i.Total 
,(SELECT MAX(TransDate)  FROM Receipt r INNER JOIN ReceiptInvoiceRow rr ON rr.masterId = r.internalId WHERE rr.InvoiceNr = i.SerNr AND r.Status = 1 AND (r.Invalid = 0 OR r.Invalid IS NULL)) AS LastPayDate   
,it.ItemGroup 
FROM  Invoice i 
INNER JOIN Customer c ON c.Code = i.CustCode  
LEFT JOIN InvoiceItemRow AS iir ON (iir.masterId = i.internalId AND iir.rowNr = 0)  
LEFT JOIN Item it ON it.Code = iir.ArtCode 
LEFT JOIN InvoiceInstallRow AS ir ON (ir.masterId = i.internalId AND ir.Saldo > 0)   
WHERE i.Saldo > 10 AND i.STATUS = 1 AND (i.Invalid = 0 OR i.Invalid IS NULL ) GROUP BY i.SerNr,ir.rowNr )
AS a GROUP BY SerNr
