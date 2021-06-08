from OpenOrange import *
from Report import Report
from Person import Person
from Office import Office
from Currency import Currency
from Item import Item
from Invoice import Invoice
from PayMode import PayMode
from ChangeValues import ChangeValues
from Receipt import Receipt
from CommissionPercent import CommissionPercent
from CustomerCommissionPercent import CustomerCommissionPercent
from Customer import Customer

class CommissionSalesReport(Report):

    def defaults(self):
        Report.defaults(self)
        specs = self.getRecord()
        specs.ViewMode = 0
        specs.CalcMode = 0
        specs.ReportType = 0

    def getCommissionPercent(self, person, artcode, pricedeal, discountdeal, custcode, days):
        res = 0.0
        grPerc = 0.0
        itPerc = 0.0
        cuper = CustomerCommissionPercent.bring(custcode)
        if cuper:
            for drow in cuper.DaysPercent:
                if days <= drow.Days:
                    res = drow.Percent
            return res

        grCode = None
        cust = Customer.bring(custcode)
        if cust and cust.GroupCode:
            grCode = cust.GroupCode

        item = Item.bring(artcode)
        query = Query()
        query.sql = "SELECT * FROM CommissionPercent\n"
        query.sql += "WHERE Person = s|%s|\n" %person
        query.sql += "AND ConfigurationType = 1\n"
        query.sql += "AND PriceDeal = s|%s|\n" %pricedeal
        if discountdeal: query.sql += "AND DiscountDeal = s|%s|\n" %discountdeal
        else: query.sql += "AND DiscountDeal IS NULL\n"
        if grCode: query.sql += "AND CustomerGroup = s|%s|\n" %grCode
        query.sql += "ORDER BY DiscountDeal, ItemGroup, ArtCode\n"

        if query.open():
            for rec in query:
                if not rec.ArtCode and not rec.ItemGroup:
                    res = rec.Percent
                if rec.ArtCode == artcode:
                    itPerc = rec.Percent
                if rec.ItemGroup == item.ItemGroup:
                    grPerc = rec.Percent
                comp = CommissionPercent.bring(rec.Code)
                if comp:
                    if len(comp.DaysPercent):
                        res = 0.0
                        grPerc = 0.0
                        itPerc = 0.0
                    for drow in comp.DaysPercent:
                        if days <= drow.Days:
                            res = drow.Percent
                            break
            query.close()
        if grPerc: res = grPerc
        if itPerc: res = itPerc
        return res

    def showRecord(self,specs,rec,fromCreditNote):
        if self.currSerNr != rec.SerNr:
            if self.currSerNr and specs.ViewMode == 0 and (self.currInvoicePayPercent != 0 or specs.ShowCero):
                if specs.ShowCost:
                    self.addValue(self.invTotals["Cost"])
                self.addValue(self.invTotals["RowNet"])
                self.addValue(self.invTotals["RowTotal"])
                self.addValue(self.invTotals["Commission"])
                if specs.ShowPaidAmount:
                    invTotalCalc = self.invTotals["RowNet"]
                    if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                    self.addValue(invTotalCalc * self.currInvoicePayPercent/100)
                self.endRow()
            self.currInvoicePayPercent = self.getInvoicePaidPercent(rec.SerNr,fromCreditNote,beforePeriod=True)
            self.currInvoiceDays = self.getPaymentDays(rec.SerNr)
            if self.currInvoicePayPercent != 0 or specs.ShowCero:
                self.startRow()
                self.addValue(rec.Office)
                self.addValue(rec.Computer)
                self.addValue(rec.SerNr,Window="InvoiceWindow", FieldName="SerNr")
                self.addValue(rec.OfficialSerNr)
                self.addValue(rec.DocType)
                self.addValue(rec.Currency)
                self.addValue(rec.CustCode)
                self.addValue(rec.CustName)
                self.addValue(rec.User)
                self.addValue(rec.SalesManId)
                self.addValue(self.currInvoiceDays)
                if rec.Currency not in self.curList: self.curList.append(rec.Currency)
            self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
            self.currInvDaysDict = {"TransDate":None, "DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
            self.currSerNr = rec.SerNr
        if self.currInvoicePayPercent != 0 or specs.ShowCero:
            toCalc = rec.RowNet
            if specs.CalcMode: toCalc = rec.RowTotal
            commiPercent = self.getCommissionPercent(rec.SalesManId, rec.ArtCode, rec.PriceDeal, rec.DiscountDeal, rec.CustCode, self.currInvoiceDays)
            commission = toCalc * self.currInvoicePayPercent/100 * commiPercent/100
            # por factura
            if specs.ShowCost:
                self.invTotals["Cost"] += rec.Cost * rec.Qty
            self.invTotals["RowNet"] += rec.RowNet
            self.invTotals["RowTotal"] += rec.RowTotal
            self.invTotals["Commission"] += commission
            # totales
            if rec.Currency not in self.totals.keys():
                self.totals[rec.Currency] = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
            if specs.ShowCost:
                self.totals[rec.Currency]["Cost"] += rec.Cost * rec.Qty
            self.totals[rec.Currency]["RowNet"] += rec.RowNet
            self.totals[rec.Currency]["RowTotal"] += rec.RowTotal
            self.totals[rec.Currency]["Commission"] += commission
            if specs.ViewMode == 1:
                self.startRow()
                self.addValue("")
                self.addValue(rec.ArtCode)
                self.addValue(rec.Name)
                self.addValue(rec.Qty)
                if specs.ShowCost:
                    self.addValue(rec.Cost * rec.Qty)
                self.addValue(rec.RowNet)
                self.addValue(rec.RowTotal)
                self.addValue(commission)
                if specs.ShowCommissionPercent:
                    self.addValue(commiPercent)
                if specs.ShowPaidAmount:
                    invTotalCalc = rec.RowNet
                    if specs.CalcMode: invTotalCalc = rec.RowTotal
                    self.addValue(invTotalCalc * self.currInvoicePayPercent/100)
                self.endRow()
            smdict = self.salesManTotals.get(rec.SalesManId,{})
            smdict[rec.Currency] = smdict.get(rec.Currency,0.0) + commission
            cur = Currency.bring(rec.Currency)
            base1Amount, base2Amount = cur.convert(commission,rec.CurrencyRate,rec.BaseRate)
            smdict["base1"] = smdict.get("base1",0.0) + base1Amount
            smdict["base2"] = smdict.get("base2",0.0) + base2Amount
            self.salesManTotals[rec.SalesManId] = smdict

    def showNdInv(self,specs,rec):
        if self.currNdInvSerNr != rec.SerNr:
            if self.currNdInvSerNr and specs.ViewMode == 0 and (self.currNdPayPercent != 0 or specs.ShowCero):
                if specs.ShowCost:
                    self.addValue(self.invTotals["Cost"])
                self.addValue(self.invTotals["RowNet"])
                self.addValue(self.invTotals["RowTotal"])
                self.addValue(self.invTotals["Commission"])
                if specs.ShowPaidAmount:
                    invTotalCalc = self.invTotals["RowNet"]
                    if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                    self.addValue(invTotalCalc * self.ndInvPercent * self.currNdPayPercent/100)
                self.endRow()
            self.currInvoiceDays = 0 #self.getPaymentDays(rec.SerNr)
            if self.currNdPayPercent != 0 or specs.ShowCero:
                self.startRow()
                self.addValue(rec.Office)
                self.addValue(rec.Computer)
                self.addValue(rec.SerNr, Window="InvoiceWindow", FieldName="SerNr")
                self.addValue(rec.OfficialSerNr)
                self.addValue(rec.DocType)
                self.addValue(rec.Currency)
                self.addValue(rec.CustCode)
                self.addValue(rec.CustName)
                self.addValue(rec.User)
                self.addValue(rec.SalesManId)
                self.addValue(self.currInvoiceDays)
                if rec.Currency not in self.curList: self.curList.append(rec.Currency)
            self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
            self.currInvDaysDict = {"TransDate":None, "DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
            self.currNdInvSerNr = rec.SerNr
        if self.currNdPayPercent != 0 or specs.ShowCero:
            toCalc = rec.RowNet
            if specs.CalcMode: toCalc = rec.RowTotal
            commiPercent = self.getCommissionPercent(rec.SalesManId, rec.ArtCode, rec.PriceDeal, rec.DiscountDeal, rec.CustCode, self.currInvoiceDays)
            commission = toCalc * self.ndInvPercent * self.currNdPayPercent/100 * commiPercent/100
            # por factura
            if specs.ShowCost:
                self.invTotals["Cost"] += rec.Cost * rec.Qty
            self.invTotals["RowNet"] += rec.RowNet
            self.invTotals["RowTotal"] += rec.RowTotal
            self.invTotals["Commission"] += commission
            # totales
            if rec.Currency not in self.totals.keys():
                self.totals[rec.Currency] = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
            if specs.ShowCost:
                self.totals[rec.Currency]["Cost"] += rec.Cost * rec.Qty
            self.totals[rec.Currency]["RowNet"] += rec.RowNet
            self.totals[rec.Currency]["RowTotal"] += rec.RowTotal
            self.totals[rec.Currency]["Commission"] += commission
            if specs.ViewMode == 1:
                self.startRow()
                self.addValue("")
                self.addValue(rec.ArtCode)
                self.addValue(rec.Name)
                self.addValue(rec.Qty)
                if specs.ShowCost:
                    self.addValue(rec.Cost * rec.Qty)
                self.addValue(rec.RowNet)
                self.addValue(rec.RowTotal)
                self.addValue(commission)
                if specs.ShowCommissionPercent:
                    self.addValue(commiPercent)
                if specs.ShowPaidAmount:
                    invTotalCalc = rec.RowNet
                    if specs.CalcMode: invTotalCalc = rec.RowTotal
                    self.addValue(invTotalCalc * self.ndInvPercent * self.currNdPayPercent/100)
                self.endRow()
            smdict = self.salesManTotals.get(rec.SalesManId,{})
            smdict[rec.Currency] = smdict.get(rec.Currency,0.0) + commission
            cur = Currency.bring(rec.Currency)
            base1Amount, base2Amount = cur.convert(commission,rec.CurrencyRate,rec.BaseRate)
            smdict["base1"] = smdict.get("base1",0.0) + base1Amount
            smdict["base2"] = smdict.get("base2",0.0) + base2Amount
            self.salesManTotals[rec.SalesManId] = smdict

    def traceCheque(self, chequenr, fromCreditNote, beforePeriod=False):
        self.currInvDaysDict["HasCheque"] = True
        chqper = 0.0
        specs = self.getRecord()
        queryDp = Query()
        queryDp.sql = "select drw.ChequeNr, d.TransDate\n"
        queryDp.sql += "from Deposit d\n"
        queryDp.sql += "inner join DepositRow drw on d.internalId = drw.masterId\n"
        if not fromCreditNote:
            queryDp.sql += "WHERE?AND d.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryDp.sql += "WHERE?AND d.Status = 1 and (d.Invalid = 0 or d.Invalid is null)\n"
        queryDp.sql += "WHERE?AND drw.ChequeNr = i|%s|\n" %chequenr
        if queryDp.open():
            for rec in queryDp:
                self.currInvDaysDict["ChequeDate"] = rec.TransDate
                chqper += 100.0
            queryDp.close()

        queryEc = Query()
        queryEc.sql = "select ecrw.ChequeNr, ec.TransDate\n"
        queryEc.sql += "from ExchangeCoupon ec\n"
        queryEc.sql += "inner join ExchangeCouponRow ecrw on ec.internalId = ecrw.masterId\n"
        if not fromCreditNote:
            queryEc.sql += "WHERE?AND ec.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryEc.sql += "WHERE?AND ec.Status = 2 and (ec.Invalid = 0 or ec.Invalid is null)\n"
        queryEc.sql += "WHERE?AND ecrw.ChequeNr = i|%s|\n" %chequenr
        if queryEc.open():
            for rec in queryEc:
                self.currInvDaysDict["ChequeDate"] = rec.TransDate
                chqper += 100.0
            queryEc.close()

        queryCB = Query()
        queryCB.sql = "select cb.ChequeNr\n"
        queryCB.sql += "from ChequeBounce cb\n"
        if not fromCreditNote:
            queryCB.sql += "WHERE?AND cb.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryCB.sql += "WHERE?AND cb.Status = 1 and (cb.Invalid = 0 or cb.Invalid is null)\n"
        queryCB.sql += "WHERE?AND cb.ChequeNr = i|%s|\n" %chequenr
        if queryCB.open():
            for rec in queryCB:
                chqper -= 100.0
            queryCB.close()

        # Considerar canjes de valores o.O
        queryCv = Query()
        queryCv.sql = "select cv.SerNr\n"
        queryCv.sql += "from ChangeValues cv\n"
        if not fromCreditNote:
            if beforePeriod:
                queryCv.sql += "WHERE?AND cv.TransDate <= d|%s|\n" %(specs.ToDate)
            else:
                queryCv.sql += "WHERE?AND cv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryCv.sql += "WHERE?AND cv.Status = 1 and (cv.Invalid = 0 or cv.Invalid is null)\n"
        queryCv.sql += "WHERE?AND cv.ChequeNr = i|%s|\n" %chequenr
        if queryCv.open():
            for rec in queryCv:
                cv = ChangeValues.bring(rec.SerNr)
                if cv:
                    for cvrow in cv.ChangeValuesRows:
                        pm = PayMode.bring(cvrow.PayMode)
                        if pm.PayType == 0:
                            if cv.TransDate >= specs.FromDate or fromCreditNote:
                                chqper += cvrow.Amount/cv.TotalCheque * 100.0
                        elif pm.PayType == 1:
                            chqper += (cvrow.Amount * self.traceCoupon(0, 0, 0, fromCreditNote, couponnr=cvrow.ChequeNr)/100.0)/cv.TotalCheque * 100.0
                        elif pm.PayType in [2,104]:
                            chqper += (cvrow.Amount * self.traceCheque(cvrow.ChequeNr, fromCreditNote, beforePeriod)/100.0)/cv.TotalCheque * 100.0
            queryCv.close()
        return chqper

    def traceCoupon(self, origintype, sernr, rownr, fromCreditNote, couponnr=0):
        specs = self.getRecord()
        query = Query()
        query.sql = "select crw.Coupon\n"
        query.sql += "from CouponCons c\n"
        query.sql += "inner join CoupConCpnRow crw on (c.internalId = crw.masterId)\n"
        query.sql += "inner join Coupon cu on cu.SerNr = crw.Coupon\n"
        if not fromCreditNote:
            query.sql += "WHERE?AND c.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        query.sql += "WHERE?AND c.Status = 1 and (c.Invalid = 0 or c.Invalid is null)\n"
        if couponnr:
            query.sql += "WHERE?AND cu.SerNr = i|%s|\n" %couponnr
        else:
            query.sql += "WHERE?AND cu.OriginSerNr = i|%s|\n" %sernr
            query.sql += "WHERE?AND cu.OriginRowNr = i|%s|\n" %rownr
            query.sql += "WHERE?AND cu.OriginType = i|%s|\n" %origintype
        coupper = 0.0
        if query.open():
            if query.count()>0:
                coupper = 100.0
            query.close()
        return coupper

    def getInvoicePaidPercent(self, invoicenr , fromCreditNote, beforePeriod=False):
        specs = self.getRecord()
        if specs.ReportType == 1:
            return 100.0
        paid = 0.0
        inv = Invoice.bring(invoicenr)
        if inv:
            for pay in inv.Payments:
                pm = PayMode.bring(pay.PayMode)
                if pm.PayType in [0,9]: # efectivo o retencion de venta
                    if inv.TransDate >= specs.FromDate or fromCreditNote:
                        paid += pay.Paid
                elif pm.PayType == 1:
                    paid += pay.Paid * self.traceCoupon(1, inv.SerNr, pay.rowNr, fromCreditNote)/100.0
                elif pm.PayType in [2,104]:
                    paid += pay.Paid * self.traceCheque(pay.ChequeNr, fromCreditNote, beforePeriod)/100.0
            if paid == 0.0 and inv.InvoiceType == Invoice.CREDITNOTE:
                if inv.OriginType == Invoice.Origin["Invoice"]:
                    paid = inv.Total * self.getInvoicePaidPercent(inv.OriginNr,fromCreditNote,beforePeriod)/ 100.0
                elif inv.OriginType == Invoice.Origin["SalesOrder"]:
                    querySOInv = Query()
                    querySOInv.sql = "select SerNr\n"
                    querySOInv.sql += "from Invoice\n"
                    querySOInv.sql += "where Status = 1 and (Invalid = 0 or Invalid is null)\n"
                    querySOInv.sql += "and OriginNr = i|%s| and OriginType = i|%s|\n" %(inv.OriginNr, inv.OriginType)
                    querySOInv.sql += "and InvoiceType = 0\n" # Facturas
                    querySOInv.sql += "union all\n"
                    querySOInv.sql += "select inv.SerNr\n"
                    querySOInv.sql += "from Invoice inv\n"
                    querySOInv.sql += "inner join SalesOrderToInvoice soti on (inv.OriginNr = soti.SerNr)\n"
                    querySOInv.sql += "inner join SalesOrderToInvoiceRow sotirw on (soti.internalId = sotirw.masterId and soti.Status = 1 and (soti.Invalid = 0 or soti.Invalid is null))\n"
                    querySOInv.sql += "where inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
                    querySOInv.sql += "and inv.OriginType = i|%s|\n" %Invoice.Origin["SalesOrderToInvoice"]
                    querySOInv.sql += "and sotirw.SalesOrderNr = i|%s|\n" %inv.OriginNr
                    querySOInv.sql += "and InvoiceType = 0\n"
                    if querySOInv.open():
                        soinvpaid = 0.0
                        soinvtot = 0.0
                        for recsi in querySOInv:
                            soinv = Invoice.bring(recsi.SerNr)
                            if soinv:
                                soinvpaid += soinv.Total * self.getInvoicePaidPercent(recsi.SerNr,fromCreditNote,beforePeriod)/100
                                soinvtot += soinv.Total
                        paid = inv.Total * (soinvpaid/soinvtot/100.0)
                        querySOInv.close()
        queryRcp = Query()
        queryRcp.sql = "select r.SerNr, rirw.InvoiceAmount, inv.Total\n"
        queryRcp.sql += "from Receipt r\n"
        queryRcp.sql += "inner join ReceiptInvoiceRow rirw on r.internalId = rirw.masterId\n"
        queryRcp.sql += "inner join Invoice inv on (rirw.InvoiceNr = inv.SerNr and (inv.InvoiceType = 0 or inv.InvoiceType = 2))\n"
        if beforePeriod:
            queryRcp.sql += "where r.TransDate <= d|%s|\n" %(specs.ToDate)
        else:
            queryRcp.sql += "where r.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryRcp.sql += "and r.Status = 1 and (r.Invalid = 0 or r.Invalid is null)\n"
        queryRcp.sql += "and rirw.InvoiceNr = i|%s|\n" %invoicenr
        if queryRcp.open():
            for rec in queryRcp:
                rcp = Receipt.bring(rec.SerNr)
                if inv and rcp:
                    icount = 0
                    for irrow in rcp.Invoices:
                        if irrow.InvoiceNr: icount += 1
                    self.currInvDaysDict["ReceiptDate"] = rcp.TransDate
                    self.currInvDaysDict["DueDate"] = inv.DueDate
                    self.currInvDaysDict["TransDate"] = inv.TransDate
                    #self.currInvDays = dateDiff(inv.DueDate, rcp.TransDate)
                    for irrow in rcp.Invoices:
                        if irrow.InvoiceNr == inv.SerNr and irrow.InstallNr:
                            self.currInvDaysDict["InstallDate"] = irrow.DueDate
                            #self.currInvDays = dateDiff(irrow.DueDate, rcp.TransDate)
                        if irrow.OnAccNr and rcp.TransDate >= specs.FromDate:
                            paid += irrow.InvoiceAmount * -1 / icount
                if rcp.PayTotal:
                    for pay in rcp.PayModes:
                        pm = PayMode.bring(pay.PayMode)
                        if pm.PayType in [0,9]: # efectivo o retencion de venta
                            if rcp.TransDate >= specs.FromDate or fromCreditNote:
                                paid += rec.InvoiceAmount * (pay.Amount/rcp.PayTotal)
                        elif pm.PayType == 1:
                            paid += rec.InvoiceAmount * (pay.Amount/rcp.PayTotal) * self.traceCoupon(2, rcp.SerNr, pay.rowNr, fromCreditNote)/100.0
                        elif pm.PayType in [2,104]:
                            paid += rec.InvoiceAmount * (pay.Amount/rcp.PayTotal) * self.traceCheque(pay.ChequeNr, fromCreditNote, beforePeriod)/100.0
            queryRcp.close()
        if inv:
            return round(paid/inv.Total * 100.0 ,2)
        return 0.0

    # Halla facturas relacionadas a cheques depositados en el periodo
    def traceChequeInvoices(self, chequenr):
        res = []
        queryInv = Query()
        queryInv.sql = "select SerNr\n"
        queryInv.sql += "from Invoice i\n"
        queryInv.sql += "inner join InvoicePayModeRow iprw on i.internalId = iprw.masterId\n"
        queryInv.sql += "where iprw.ChequeNr = i|%s|\n" %chequenr
        if queryInv.open():
            if queryInv.count()>0:
                res.append(queryInv[0].SerNr)
            queryInv.close()

        queryRcp = Query()
        queryRcp.sql = "select SerNr\n"
        queryRcp.sql += "from Receipt r inner join ReceiptPayModeRow rprw on r.internalId = rprw.masterId\n"
        queryRcp.sql += "where rprw.ChequeNr = i|%s|\n" %chequenr
        if queryRcp.open():
            for rec in queryRcp:
                rcp = Receipt.bring(rec.SerNr)
                if rcp:
                    for invrow in rcp.Invoices:
                        if invrow.InvoiceNr:
                            res.append(invrow.InvoiceNr)
            queryRcp.close()

        # Canje de valores por detalle
        queryCV = Query()
        queryCV.sql =  "select cv.ChequeNr\n"
        queryCV.sql += "from ChangeValues cv inner join ChangeValuesRow cvrw on cv.internalId = cvrw.masterId\n"
        queryCV.sql += "inner join PayMode pm on (pm.Code = cvrw.PayMode and pm.PayType in (2,104))\n"
        queryCV.sql += "where cvrw.ChequeNr = i|%s|\n" %chequenr
        if queryCV.open():
            for rec in queryCV:
                res += self.traceChequeInvoices(rec.ChequeNr)
            queryCV.close()
        return res

    # Halla facturas anteriorores relacionadas a recibos, depositos y liquidaciones de cupones
    def getBeforePeriodInvoices(self, specs):
        invoicePreList = []
        queryDp = Query()
        queryDp.sql =  "select drw.ChequeNr\n"
        queryDp.sql += "from Deposit d\n"
        queryDp.sql += "inner join DepositRow drw on d.internalId = drw.masterId\n"
        queryDp.sql += "where d.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryDp.sql += "and d.Status = 1 and (d.Invalid = 0 or d.Invalid is null)\n"
        if queryDp.open():
            for rec in queryDp:
                for invnr in self.traceChequeInvoices(rec.ChequeNr):
                    if invnr not in invoicePreList:
                        invoicePreList.append(invnr)
            queryDp.close()

        queryCB = Query()
        queryCB.sql = "select cb.ChequeNr\n"
        queryCB.sql += "from ChequeBounce cb\n"
        queryCB.sql += "where cb.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryCB.sql += "and cb.Status = 1 and (cb.Invalid = 0 or cb.Invalid is null)\n"
        if queryCB.open():
            for rec in queryCB:
                for invnr in self.traceChequeInvoices(rec.ChequeNr):
                    if invnr not in invoicePreList:
                        invoicePreList.append(invnr)
            queryCB.close()

        queryCCon = Query()
        queryCCon.sql = "select crw.Coupon, cu.OriginSerNr, cu.OriginRowNr, cu.OriginType\n"
        queryCCon.sql += "from CouponCons c\n"
        queryCCon.sql += "inner join CoupConCpnRow crw on (c.internalId = crw.masterId)\n"
        queryCCon.sql += "inner join Coupon cu on cu.SerNr = crw.Coupon\n"
        queryCCon.sql += "where c.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryCCon.sql += "and c.Status = 1 and (c.Invalid = 0 or c.Invalid is null)\n"
        if queryCCon.open():
            for rec in queryCCon:
                if rec.OriginType == 1: # Origen Factura
                    invoicePreList.append(rec.OriginSerNr)
                elif rec.OriginType == 2: # Origen Recibo
                    rcp = Receipt.bring(rec.OriginSerNr)
                    if rcp:
                        for invrow in rcp.Invoices:
                            if invrow.InvoiceNr:
                                if invrow.InvoiceNr not in invoicePreList:
                                    invoicePreList.append(invrow.InvoiceNr)
                else: # Asume Canje de Valores
                    queryCv = Query()
                    queryCv.sql =  "select cv.ChequeNr\n"
                    queryCv.sql += "from ChangeValues cv inner join ChangeValuesRow cvrw on cv.internalId = cvrw.masterId\n"
                    queryCv.sql += "inner join PayMode pm on (pm.Code = cvrw.PayMode and pm.PayType = 1)\n"
                    queryCv.sql += "where cvrw.ChequeNr = i|%s|\n" %rec.Coupon
                    queryCv.sql += "and cv.Status = 1 and (cv.Invalid = 0 or cv.Invalid is null)\n"
                    if queryCv.open():
                        for reccv in queryCv:
                            invoicePreList += self.traceChequeInvoices(reccv.ChequeNr)
                        queryCv.close()
            queryCCon.close()

        queryEc = Query()
        queryEc.sql = "select ecrw.ChequeNr\n"
        queryEc.sql += "from ExchangeCoupon ec\n"
        queryEc.sql += "inner join ExchangeCouponRow ecrw on ec.internalId = ecrw.masterId\n"
        queryEc.sql += "where ec.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryEc.sql += "and ec.Status = 2 and (ec.Invalid = 0 or ec.Invalid is null)\n"
        if queryEc.open():
            for recec in queryEc:
                invoicePreList += self.traceChequeInvoices(recec.ChequeNr)
            queryEc.close()

        #Recibos que poseen pagos en efectivo
        queryRcp = Query()
        queryRcp.sql = "select r.SerNr\n"
        queryRcp.sql += "from Receipt r inner join ReceiptPayModeRow rprw on r.internalId = rprw.masterId\n"
        queryRcp.sql += "inner join PayMode pm on (pm.Code = rprw.PayMode and pm.PayType in (0,9))\n"
        queryRcp.sql += "where r.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryRcp.sql += "and r.Status = 1 and (r.Invalid = 0 or r.Invalid is null)\n"
        if queryRcp.open():
            for recrcp in queryRcp:
                rcp = Receipt.bring(recrcp.SerNr)
                if rcp:
                    for invrow in rcp.Invoices:
                        if invrow.InvoiceNr:
                            if invrow.InvoiceNr not in invoicePreList:
                                invoicePreList.append(invrow.InvoiceNr)
            queryRcp.close()

        #Recibos que poseen anticipos
        queryRcpOnAcc = Query()
        queryRcpOnAcc.sql = "select r.SerNr\n"
        queryRcpOnAcc.sql += "from Receipt r inner join ReceiptInvoiceRow rirw on r.internalId = rirw.masterId\n"
        queryRcpOnAcc.sql += "where r.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryRcpOnAcc.sql += "and r.Status = 1 and (r.Invalid = 0 or r.Invalid is null)\n"
        queryRcpOnAcc.sql += "and (rirw.InvoiceNr = 0 or rirw.InvoiceNr is null)\n"
        if queryRcpOnAcc.open():
            for recrcp in queryRcpOnAcc:
                rcp = Receipt.bring(recrcp.SerNr)
                if rcp:
                    for invrow in rcp.Invoices:
                        if invrow.InvoiceNr:
                            if invrow.InvoiceNr not in invoicePreList:
                                invoicePreList.append(invrow.InvoiceNr)
            queryRcpOnAcc.close()

        #Canjes de valores efectivos sobre cheques
        queryCve = Query()
        queryCve.sql =  "select cv.ChequeNr\n"
        queryCve.sql += "from ChangeValues cv\n"
        queryCve.sql += "where cv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryCve.sql += "and cv.Status = 1 and (cv.Invalid = 0 or cv.Invalid is null)\n"
        if queryCve.open():
            for reccve in queryCve:
                for invnr in self.traceChequeInvoices(reccve.ChequeNr):
                    if invnr not in invoicePreList:
                        invoicePreList.append(invnr)
            queryCve.close()
        return invoicePreList

    def run(self):
        specs = self.getRecord()

        if not currentUserCanDo("CanSeeCostOnCommissionSalesReport",False):
            specs.ShowCost = False

        self.printReportTitle("Commission Sales Report")

        self.startTable()
        headList = ["Office","Computer","Nro","Invoice Nr","DocType","Currency","Customer","","User","SalesMan","Days"]
        if specs.ViewMode == 0:
            if specs.ShowCost: headList += ["Cost"]
            headList += ["Neto","Total","Commission"]
            if specs.ShowPaidAmount:
                headList += ["Pagado"]
        self.startHeaderRow()
        for h in headList:
            self.addValue(tr(h))
        self.endHeaderRow()
        if specs.ViewMode == 1:
            headList = ["","ArtCode","Name","Qty"]
            if specs.ShowCost:
                headList += ["Cost"]
            headList += ["Neto","Total","Commission"]
            if specs.ShowCommissionPercent:
                headList += ["%"]
            if specs.ShowPaidAmount:
                headList += ["Pagado"]
            self.startHeaderRow()
            for h in headList:
                self.addValue(tr(h))
            self.endHeaderRow()

        salesManField = "if(inv.OriginType = 407 or inv.OriginType = 0, so.SalesMan, inv.SalesMan)" # 407: SalesOrderToInvoice
        salesManFieldIv = "inv.SalesMan" # 407: SalesOrderToInvoice
        if specs.ReportType == 1: # Administrative
            salesManField = "s|%s|" %specs.AdministrativePersonForCommission
            salesManFieldIv = "s|%s|" %specs.AdministrativePersonForCommission
        elif specs.ReportType == 2: # Gerentes
            if not specs.AdministrativePersonForCommission:
                message("No ingreso persona")
                return False
            if not specs.Office:
                message("No ingreso sucursal")
                return False
            qperof = Query()
            qperof.sql = "select * from PersonOfficeRelation\n"
            qperof.sql += "where PersonCode = s|%s|\n" %specs.AdministrativePersonForCommission
            qperof.sql += "and OfficeCode = s|%s|\n" %specs.Office
            if qperof.open() and qperof.count()<=0:
                message("La persona %s no esta relacionada a la sucursal %s" %(specs.AdministrativePersonForCommission, specs.Office))
                return False
            salesManField = "s|%s|" %specs.AdministrativePersonForCommission
            salesManFieldIv = "s|%s|" %specs.AdministrativePersonForCommission

        query = Query()
        query.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'FV' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, %s SalesManId,\n" %salesManField
        query.sql += "if(inv.OriginType = 407 or inv.OriginType = 0, so.PriceDeal, inv.PriceDeal) PriceDeal, inv.DiscountDeal, inv.Currency, inv.CurrencyRate, inv.BaseRate, invrw.ArtCode, invrw.Name, invrw.Qty, invrw.Cost, invrw.RowNet, invrw.RowTotal\n"
        query.sql += "from Invoice inv\n"
        query.sql += "inner join InvoiceItemRow invrw on inv.internalId = invrw.masterId\n"
        query.sql += "inner join SalesOrderItemRow sorw on (sorw.rowNr = invrw.OriginRowNr)\n"
        query.sql += "inner join SalesOrder so on (so.internalId = sorw.masterId and invrw.OriginSerNr = so.SerNr)\n"
        query.sql += "inner join Item it on invrw.ArtCode = it.Code\n"
        query.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        query.sql += "and inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
        query.sql += "and inv.InvoiceType = 0\n" #solo facturas
        # Filtros
        if specs.Office: query.sql += "AND inv.Office = s|%s|\n" %specs.Office
        if specs.SalesMan: query.sql += "AND %s = s|%s|\n" %(salesManField,specs.SalesMan)
        if specs.CustCode: query.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
        if specs.ArtCode: query.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
        if specs.ItemGroup: query.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
        if specs.Currency: query.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
        if specs.PriceDeal: query.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
        if specs.DiscountDeal: query.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
        if specs.GuaranteePayTerm: query.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

        self.curList = []
        self.salesManTotals = {}
        self.currSerNr = None
        self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
        self.totals = {}
        self.currInvoicePayPercent = 0.0
        self.invoiceProcessed = []
        self.currInvDaysDict = {"TransDate":None, "DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
        if query.open():
            for rec in query:
                self.showRecord(specs,rec,False)
                if rec.SerNr not in self.invoiceProcessed: self.invoiceProcessed.append(rec.SerNr)
            if self.currSerNr and specs.ViewMode == 0 and self.currInvoicePayPercent != 0.0:
                if specs.ShowCost:
                    self.addValue(self.invTotals["Cost"])
                self.addValue(self.invTotals["RowNet"])
                self.addValue(self.invTotals["RowTotal"])
                self.addValue(self.invTotals["Commission"])
                if specs.ShowPaidAmount:
                    invTotalCalc = self.invTotals["RowNet"]
                    if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                    self.addValue(invTotalCalc * self.currInvoicePayPercent/100)
                self.endRow()
            query.close()

        # Notas de Credito
        queryNc = Query()
        queryNc.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'NC' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, %s SalesManId,\n" %salesManField
        queryNc.sql += "if(inv.OriginType = 407 or inv.OriginType = 0, so.PriceDeal, inv.PriceDeal) PriceDeal, inv.DiscountDeal, inv.Currency, inv.CurrencyRate, inv.BaseRate,\n"
        queryNc.sql += "invrw.ArtCode, invrw.Name, invrw.Qty, -invrw.Cost Cost, -invrw.RowNet RowNet, -invrw.RowTotal RowTotal\n"
        queryNc.sql += "from Invoice inv\n"
        queryNc.sql += "inner join InvoiceItemRow invrw on inv.internalId = invrw.masterId\n"
        # Vendedor desde orden de venta
        queryNc.sql += "inner join SalesOrderItemRow sorw on (sorw.rowNr = invrw.OriginRowNr)\n"
        queryNc.sql += "inner join SalesOrder so on (so.internalId = sorw.masterId and invrw.OriginSerNr = so.SerNr)\n"
        queryNc.sql += "inner join Item it on invrw.ArtCode = it.Code\n"
        queryNc.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryNc.sql += "and inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
        queryNc.sql += "and inv.InvoiceType = 1\n" #solo notas de credito
        queryNc.sql += "and (inv.GuaranteeNr = 0 or inv.GuaranteeNr is null)\n" #no originadas en registro de garantía
        # Filtros
        if specs.Office: queryNc.sql += "AND inv.Office = s|%s|\n" %specs.Office
        if specs.SalesMan: queryNc.sql += "AND %s = s|%s|\n" %(salesManField,specs.SalesMan)
        if specs.CustCode: queryNc.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
        if specs.ArtCode: queryNc.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
        if specs.ItemGroup: queryNc.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
        if specs.Currency: queryNc.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
        if specs.PriceDeal: queryNc.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
        if specs.DiscountDeal: queryNc.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
        if specs.GuaranteePayTerm: queryNc.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

        self.currSerNr = None
        self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
        if queryNc.open():
            self.startHeaderRow()
            self.addValue("Notas de Credito", ColSpan="3")
            self.endHeaderRow()
            for rec in queryNc:
                self.showRecord(specs,rec,True)
            if self.currSerNr and specs.ViewMode == 0 and self.currInvoicePayPercent != 0.0:
                if specs.ShowCost:
                    self.addValue(self.invTotals["Cost"])
                self.addValue(self.invTotals["RowNet"])
                self.addValue(self.invTotals["RowTotal"])
                self.addValue(self.invTotals["Commission"])
                if specs.ShowPaidAmount:
                    invTotalCalc = self.invTotals["RowNet"]
                    if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                    self.addValue(invTotalCalc * self.currInvoicePayPercent/100)
                self.endRow()
            queryNc.close()

        # Facturas de periodos anteriores
        if specs.ReportType in [0,2]: # los administradores cobran siempre las facturas
            befpeInvList = []
            for bfpinv in self.getBeforePeriodInvoices(specs):
                if bfpinv not in self.invoiceProcessed:
                    befpeInvList.append(str(bfpinv))
            self.startHeaderRow()
            self.addValue("Facturas de Periodos Anteriores", ColSpan="3")
            self.endHeaderRow()
            # Facturas de periodos anteriores
            queryBefore = Query()
            queryBefore.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'FV' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, %s SalesManId,\n" %salesManField
            queryBefore.sql += "if(inv.OriginType = 407 or inv.OriginType = 0, so.PriceDeal, inv.PriceDeal) PriceDeal, inv.DiscountDeal, inv.Currency, inv.CurrencyRate, inv.BaseRate, invrw.ArtCode, invrw.Name, invrw.Qty, invrw.Cost, invrw.RowNet, invrw.RowTotal\n"
            queryBefore.sql += "from Invoice inv\n"
            queryBefore.sql += "inner join InvoiceItemRow invrw on inv.internalId = invrw.masterId\n"
            queryBefore.sql += "inner join SalesOrderItemRow sorw on (sorw.rowNr = invrw.OriginRowNr)\n"
            queryBefore.sql += "inner join SalesOrder so on (so.internalId = sorw.masterId and invrw.OriginSerNr = so.SerNr)\n"
            queryBefore.sql += "inner join Item it on invrw.ArtCode = it.Code\n"
            #queryBefore.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
            queryBefore.sql += "where inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
            queryBefore.sql += "and inv.InvoiceType = 0\n" #solo facturas
            queryBefore.sql += "and inv.SerNr in ('%s')\n" %"','".join(befpeInvList)
            # Filtros
            if specs.Office: queryBefore.sql += "AND inv.Office = s|%s|\n" %specs.Office
            if specs.SalesMan: queryBefore.sql += "AND %s = s|%s|\n" %(salesManField,specs.SalesMan)
            if specs.CustCode: queryBefore.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
            if specs.ArtCode: queryBefore.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
            if specs.ItemGroup: queryBefore.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
            if specs.Currency: queryBefore.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
            if specs.PriceDeal: queryBefore.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
            if specs.DiscountDeal: queryBefore.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
            if specs.GuaranteePayTerm: queryBefore.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

            self.currSerNr = None
            if queryBefore.open():
                for rec in queryBefore:
                    self.showRecord(specs,rec,False)
                if self.currSerNr and specs.ViewMode == 0 and self.currInvoicePayPercent != 0.0:
                    if specs.ShowCost:
                        self.addValue(self.invTotals["Cost"])
                    self.addValue(self.invTotals["RowNet"])
                    self.addValue(self.invTotals["RowTotal"])
                    self.addValue(self.invTotals["Commission"])
                    if specs.ShowPaidAmount:
                        invTotalCalc = self.invTotals["RowNet"]
                        if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                        self.addValue(invTotalCalc * self.currInvoicePayPercent/100)
                    self.endRow()
                queryBefore.close()

        # Notas de Debito
        queryNd = Query()
        queryNd.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'ND' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, inv.SalesMan SalesManId," # %s SalesManId,\n" %salesManField
        queryNd.sql += "inv.Currency, inv.CurrencyRate, inv.BaseRate, inv.Total, ch.SerNr ChSerNr\n"
        queryNd.sql += "from Invoice inv\n"
        queryNd.sql += "inner join Cheque ch on inv.OriginNr = ch.SerNr\n"
        queryNd.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
        queryNd.sql += "and inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
        queryNd.sql += "and inv.InvoiceType = 2 and inv.OriginType = 504\n"
        # Filtros
        if specs.Office: queryNd.sql += "AND inv.Office = s|%s|\n" %specs.Office
        if specs.SalesMan: queryNd.sql += "AND %s = s|%s|\n" %(salesManFieldIv,specs.SalesMan)
        if specs.CustCode: queryNd.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
        #if specs.ArtCode: queryNd.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
        #if specs.ItemGroup: queryNd.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
        if specs.Currency: queryNd.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
        #if specs.PriceDeal: queryNd.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
        #if specs.DiscountDeal: queryNd.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
        #if specs.GuaranteePayTerm: queryNd.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

        self.currNdPayPercent = 0
        self.currInvoiceDays = 0
        self.currInvDaysDict = {"TransDate":None, "DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
        self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
        if queryNd.open():
            self.startHeaderRow()
            self.addValue("Notas de Debito", ColSpan="3")
            self.endHeaderRow()
            for rec in queryNd:
                self.currNdPayPercent = self.getInvoicePaidPercent(rec.SerNr,False,beforePeriod=False)
                if rec.SerNr not in self.invoiceProcessed: self.invoiceProcessed.append(rec.SerNr)
                ###
                ndcur = Currency.bring(rec.Currency)
                ndb1Amount, ndb2Amount = ndcur.convert(rec.Total,rec.CurrencyRate,rec.BaseRate)
                ###
                if self.currNdPayPercent != 0 or specs.ShowCero:
                    self.startRow()
                    self.addValue(rec.Office)
                    self.addValue(rec.Computer)
                    self.addValue(rec.SerNr,Window="InvoiceWindow", FieldName="SerNr")
                    self.addValue(rec.OfficialSerNr)
                    self.addValue(rec.DocType)
                    self.addValue(rec.Currency)
                    self.addValue(rec.CustCode)
                    self.addValue(rec.CustName)
                    self.addValue(rec.User)
                    self.addValue(rec.SalesManId)
                    self.addValue(self.currInvoiceDays)
                    if rec.Currency not in self.curList: self.curList.append(rec.Currency)

                    ndinvrel = {}
                    queryRcp = Query()
                    queryRcp.sql = "select SerNr\n"
                    queryRcp.sql += "from Receipt r inner join ReceiptPayModeRow rprw on r.internalId = rprw.masterId\n"
                    queryRcp.sql += "where rprw.ChequeNr = i|%s|\n" %rec.ChSerNr
                    if queryRcp.open():
                        for rrec in queryRcp:
                            rcp = Receipt.bring(rrec.SerNr)
                            if rcp:
                                ndinvrel["ReceiptTotal"] = rcp.PayTotal
                                for invrow in rcp.Invoices:
                                    if invrow.InvoiceNr:
                                        if invrow.InvoiceNr not in ndinvrel.keys():
                                            ndinvrel[invrow.InvoiceNr] = {}
                                        ndinvrel[invrow.InvoiceNr]["SerNr"] = invrow.InvoiceNr
                                        ndinvrel[invrow.InvoiceNr]["InvoiceTotal"] = invrow.InvoiceTotal
                                        ndinvrel[invrow.InvoiceNr]["InvoiceAmount"] = invrow.InvoiceAmount
                                        ndinvrel[invrow.InvoiceNr]["Amount"] = invrow.Amount
                        queryRcp.close()

                    # Procesa facturas relacionadas a la nota de debito
                    relinvlst = self.traceChequeInvoices(rec.ChSerNr)
                    queryNdInv = Query()
                    queryNdInv.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'FV' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, %s SalesManId,\n" %salesManField
                    queryNdInv.sql += "if(inv.OriginType = 407 or inv.OriginType = 0, so.PriceDeal, inv.PriceDeal) PriceDeal, inv.DiscountDeal, inv.Currency, inv.CurrencyRate, inv.BaseRate, inv.Total, invrw.ArtCode, invrw.Name, invrw.Qty, invrw.Cost, invrw.RowNet, invrw.RowTotal\n"
                    queryNdInv.sql += "from Invoice inv\n"
                    queryNdInv.sql += "inner join InvoiceItemRow invrw on inv.internalId = invrw.masterId\n"
                    queryNdInv.sql += "inner join SalesOrderItemRow sorw on (sorw.rowNr = invrw.OriginRowNr)\n"
                    queryNdInv.sql += "inner join SalesOrder so on (so.internalId = sorw.masterId and invrw.OriginSerNr = so.SerNr)\n"
                    queryNdInv.sql += "inner join Item it on invrw.ArtCode = it.Code\n"
                    #queryNdInv.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
                    queryNdInv.sql += "where inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
                    queryNdInv.sql += "and inv.InvoiceType = 0\n" #solo facturas
                    queryNdInv.sql += "and inv.SerNr in ('%s')\n" %"','".join(map(str,relinvlst))
                    # Filtros
                    if specs.Office: queryNdInv.sql += "AND inv.Office = s|%s|\n" %specs.Office
                    if specs.SalesMan: queryNdInv.sql += "AND %s = s|%s|\n" %(salesManField,specs.SalesMan)
                    if specs.CustCode: queryNdInv.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
                    if specs.ArtCode: queryNdInv.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
                    if specs.ItemGroup: queryNdInv.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
                    if specs.Currency: queryNdInv.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
                    if specs.PriceDeal: queryNdInv.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
                    if specs.DiscountDeal: queryNdInv.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
                    if specs.GuaranteePayTerm: queryNdInv.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

                    if queryNdInv.open():
                        self.currNdInvSerNr = None
                        for rndi in queryNdInv:
                            ###
                            if rec.Currency != rndi.Currency:
                                ivcur = Currency.bring(rndi.Currency)
                                ivb1Amount, ivb2Amount = ivcur.convert(rndi.Total,rndi.CurrencyRate,rndi.BaseRate)
                                self.ndInvPercent = ndb1Amount/ivb1Amount
                            else:
                                self.ndInvPercent = rec.Total/rndi.Total
                            ###
                            if self.ndInvPercent > 1:
                                propndreceipt = rndi.Total/ndinvrel["ReceiptTotal"]
                                if rndi.Total != ndinvrel[rndi.SerNr]["InvoiceAmount"]:
                                    propndreceipt = ndinvrel[rndi.SerNr]["InvoiceAmount"]/ndinvrel[rndi.SerNr]["InvoiceTotal"]
                                self.ndInvPercent = rec.Total * propndreceipt / rndi.Total
                            ###
                            self.showNdInv(specs,rndi)
                        if self.currNdInvSerNr and specs.ViewMode == 0 and self.currNdPayPercent != 0.0:
                            if specs.ShowCost:
                                self.addValue(self.invTotals["Cost"])
                            self.addValue(self.invTotals["RowNet"])
                            self.addValue(self.invTotals["RowTotal"])
                            self.addValue(self.invTotals["Commission"])
                            if specs.ShowPaidAmount:
                                invTotalCalc = self.invTotals["RowNet"]
                                if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                                self.addValue(invTotalCalc * self.ndInvPercent * self.currNdPayPercent/100)
                            self.endRow()
                        queryNdInv.close()
            queryNd.close()

        # Notas de Debito Periodos Anteriores
        if specs.ReportType in [0,2]: # los administradores cobran siempre las facturas
            befpeNdList = []
            for bfpinv in self.getBeforePeriodInvoices(specs):
                if bfpinv not in self.invoiceProcessed:
                    befpeNdList.append(str(bfpinv))

            queryNdBefore = Query()
            queryNdBefore.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'ND' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, inv.SalesMan SalesManId," # %s SalesManId,\n" %salesManField
            queryNdBefore.sql += "inv.Currency, inv.CurrencyRate, inv.BaseRate, inv.Total, ch.SerNr ChSerNr\n"
            queryNdBefore.sql += "from Invoice inv\n"
            queryNdBefore.sql += "inner join Cheque ch on inv.OriginNr = ch.SerNr\n"
            #queryNdBefore.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
            queryNdBefore.sql += "where inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
            queryNdBefore.sql += "and inv.InvoiceType = 2 and inv.OriginType = 504\n"
            queryNdBefore.sql += "and inv.SerNr in ('%s')\n" %"','".join(befpeNdList)
            # Filtros
            if specs.Office: queryNdBefore.sql += "AND inv.Office = s|%s|\n" %specs.Office
            if specs.SalesMan: queryNdBefore.sql += "AND %s = s|%s|\n" %(salesManFieldIv,specs.SalesMan)
            if specs.CustCode: queryNdBefore.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
            #if specs.ArtCode: queryNdBefore.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
            #if specs.ItemGroup: queryNdBefore.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
            if specs.Currency: queryNdBefore.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
            #if specs.PriceDeal: queryNdBefore.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
            #if specs.DiscountDeal: queryNdBefore.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
            #if specs.GuaranteePayTerm: queryNdBefore.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

            self.currNdPayPercent = 0
            self.currInvoiceDays = 0
            self.currInvDaysDict = {"TransDate":None, "DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
            self.invTotals = {"Cost":0.0,"RowNet":0.0,"RowTotal":0.0,"Commission":0.0}
            if queryNdBefore.open():
                self.startHeaderRow()
                self.addValue("Notas de Debito de Periodos Anteriores", ColSpan="3")
                self.endHeaderRow()
                for rec in queryNdBefore:
                    self.currNdPayPercent = self.getInvoicePaidPercent(rec.SerNr,False,beforePeriod=True)
                    ###
                    ndcur = Currency.bring(rec.Currency)
                    ndb1Amount, ndb2Amount = ndcur.convert(rec.Total,rec.CurrencyRate,rec.BaseRate)
                    ###
                    if self.currNdPayPercent != 0 or specs.ShowCero:
                        self.startRow()
                        self.addValue(rec.Office)
                        self.addValue(rec.Computer)
                        self.addValue(rec.SerNr,Window="InvoiceWindow", FieldName="SerNr")
                        self.addValue(rec.OfficialSerNr)
                        self.addValue(rec.DocType)
                        self.addValue(rec.Currency)
                        self.addValue(rec.CustCode)
                        self.addValue(rec.CustName)
                        self.addValue(rec.User)
                        self.addValue(rec.SalesManId)
                        self.addValue(self.currInvoiceDays)
                        if rec.Currency not in self.curList: self.curList.append(rec.Currency)

                        ndinvrel = {}
                        queryRcp = Query()
                        queryRcp.sql = "select SerNr\n"
                        queryRcp.sql += "from Receipt r inner join ReceiptPayModeRow rprw on r.internalId = rprw.masterId\n"
                        queryRcp.sql += "where rprw.ChequeNr = i|%s|\n" %rec.ChSerNr
                        if queryRcp.open():
                            for rrec in queryRcp:
                                rcp = Receipt.bring(rrec.SerNr)
                                if rcp:
                                    ndinvrel["ReceiptTotal"] = rcp.PayTotal
                                    for invrow in rcp.Invoices:
                                        if invrow.InvoiceNr:
                                            if invrow.InvoiceNr not in ndinvrel.keys():
                                                ndinvrel[invrow.InvoiceNr] = {}
                                            ndinvrel[invrow.InvoiceNr]["SerNr"] = invrow.InvoiceNr
                                            ndinvrel[invrow.InvoiceNr]["InvoiceTotal"] = invrow.InvoiceTotal
                                            ndinvrel[invrow.InvoiceNr]["InvoiceAmount"] = invrow.InvoiceAmount
                                            ndinvrel[invrow.InvoiceNr]["Amount"] = invrow.Amount
                            queryRcp.close()

                        # Procesa facturas relacionadas a la nota de debito
                        relinvlst = self.traceChequeInvoices(rec.ChSerNr)
                        queryNdBeforeInv = Query()
                        queryNdBeforeInv.sql = "select inv.Office, inv.Computer, inv.SerNr, inv.OfficialSerNr, 'FV' DocType, inv.CustCode, inv.CustName, inv.User, inv.SalesMan, %s SalesManId,\n" %salesManField
                        queryNdBeforeInv.sql += "if(inv.OriginType = 407 or inv.OriginType = 0, so.PriceDeal, inv.PriceDeal) PriceDeal, inv.DiscountDeal, inv.Currency, inv.CurrencyRate, inv.BaseRate, inv.Total, invrw.ArtCode, invrw.Name, invrw.Qty, invrw.Cost, invrw.RowNet, invrw.RowTotal\n"
                        queryNdBeforeInv.sql += "from Invoice inv\n"
                        queryNdBeforeInv.sql += "inner join InvoiceItemRow invrw on inv.internalId = invrw.masterId\n"
                        queryNdBeforeInv.sql += "inner join SalesOrderItemRow sorw on (sorw.rowNr = invrw.OriginRowNr)\n"
                        queryNdBeforeInv.sql += "inner join SalesOrder so on (so.internalId = sorw.masterId and invrw.OriginSerNr = so.SerNr)\n"
                        queryNdBeforeInv.sql += "inner join Item it on invrw.ArtCode = it.Code\n"
                        #queryNdBeforeInv.sql += "where inv.TransDate between d|%s| and d|%s|\n" %(specs.FromDate,specs.ToDate)
                        queryNdBeforeInv.sql += "where inv.Status = 1 and (inv.Invalid = 0 or inv.Invalid is null)\n"
                        queryNdBeforeInv.sql += "and inv.InvoiceType = 0\n" #solo facturas
                        queryNdBeforeInv.sql += "and inv.SerNr in ('%s')\n" %"','".join(map(str,relinvlst))
                        # Filtros
                        if specs.Office: queryNdBeforeInv.sql += "AND inv.Office = s|%s|\n" %specs.Office
                        if specs.SalesMan: queryNdBeforeInv.sql += "AND %s = s|%s|\n" %(salesManField,specs.SalesMan)
                        if specs.CustCode: queryNdBeforeInv.sql += "AND inv.CustCode = s|%s|\n" %specs.CustCode
                        if specs.ArtCode: queryNdBeforeInv.sql += "AND inv.ArtCode = s|%s|\n" %specs.ArtCode
                        if specs.ItemGroup: queryNdBeforeInv.sql += "AND it.ItemGroup = s|%s|\n" %specs.ItemGroup
                        if specs.Currency: queryNdBeforeInv.sql += "AND inv.Currency = s|%s|\n" %specs.Currency
                        if specs.PriceDeal: queryNdBeforeInv.sql += "AND inv.PriceDeal = s|%s|\n" %specs.PriceDeal
                        if specs.DiscountDeal: queryNdBeforeInv.sql += "AND inv.DiscountDeal = s|%s|\n" %specs.DiscountDeal
                        if specs.GuaranteePayTerm: queryNdBeforeInv.sql += "AND inv.PayTerm not in ('%s')" %"','".join(specs.GuaranteePayTerm.split(","))

                        if queryNdBeforeInv.open():
                            self.currNdInvSerNr = None
                            for rndi in queryNdBeforeInv:
                                ###
                                if rec.Currency != rndi.Currency:
                                    ivcur = Currency.bring(rndi.Currency)
                                    ivb1Amount, ivb2Amount = ivcur.convert(rndi.Total,rndi.CurrencyRate,rndi.BaseRate)
                                    self.ndInvPercent = ndb1Amount/ivb1Amount
                                else:
                                    self.ndInvPercent = rec.Total/rndi.Total
                                ###
                                if self.ndInvPercent > 1:
                                    propndreceipt = rndi.Total/ndinvrel["ReceiptTotal"]
                                    if rndi.Total != ndinvrel[rndi.SerNr]["InvoiceAmount"]:
                                        propndreceipt = ndinvrel[rndi.SerNr]["InvoiceAmount"]/ndinvrel[rndi.SerNr]["InvoiceTotal"]
                                    self.ndInvPercent = rec.Total * propndreceipt / rndi.Total
                                ###
                                self.showNdInv(specs,rndi)
                            if self.currNdInvSerNr and specs.ViewMode == 0 and self.currNdPayPercent != 0.0:
                                if specs.ShowCost:
                                    self.addValue(self.invTotals["Cost"])
                                self.addValue(self.invTotals["RowNet"])
                                self.addValue(self.invTotals["RowTotal"])
                                self.addValue(self.invTotals["Commission"])
                                if specs.ShowPaidAmount:
                                    invTotalCalc = self.invTotals["RowNet"]
                                    if specs.CalcMode: invTotalCalc = self.invTotals["RowTotal"]
                                    self.addValue(invTotalCalc * self.ndInvPercent * self.currNdPayPercent/100)
                                self.endRow()
                            queryNdBeforeInv.close()
                queryNdBefore.close()

        # Totales generales
        for cur in self.totals.keys():
            self.startHeaderRow()
            csSP = "11"
            if specs.ViewMode == 1: csSP = "9"
            self.addValue("Total %s" %cur,ColSpan=csSP)
            if specs.ShowCost:
                self.addValue(self.totals[cur]["Cost"])
            self.addValue(self.totals[cur]["RowNet"])
            self.addValue(self.totals[cur]["RowTotal"])
            self.addValue(self.totals[cur]["Commission"])
            self.endHeaderRow()

        self.row("   ")
        self.header("Resumen11","","")
        self.startHeaderRow()
        base1,base2 = Currency.getBases()
        for h in ["SalesMan","Name"]+["Total-%s"%c for c in self.curList]+["Total Base1-%s" %base1,"Total Base2-%s" %base2]:
            self.addValue(tr(h))
        self.endHeaderRow()
        smresTotal = {}
        for k in self.salesManTotals.keys():
            self.startRow()
            self.addValue(k)
            self.addValue(self.getName(k,specs))
            for kc in self.curList:
                self.addValue(self.salesManTotals[k].get(kc,0.0))
                smresTotal[kc] = smresTotal.get(kc,0.0) + self.salesManTotals[k].get(kc,0.0)
            self.addValue(self.salesManTotals[k].get("base1",0.0)) # base1
            self.addValue(self.salesManTotals[k].get("base2",0.0)) # base2
            dta = k + ";" + str(self.salesManTotals[k].get("base2",0.0)) + ";" + base2
            self.addValue("Generar Fac. Compra", CallMethod="genPurchaseInvoice", Parameter=dta,ColSpan=3)
            self.endRow()
            smresTotal["base1"] = smresTotal.get("base1",0.0) + self.salesManTotals[k].get("base1",0.0)
            smresTotal["base2"] = smresTotal.get("base2",0.0) + self.salesManTotals[k].get("base2",0.0)
        self.startHeaderRow()
        self.addValue("Total")
        self.addValue("")
        for kt in self.curList:
            self.addValue(smresTotal[kt])
        self.addValue(smresTotal.get("base1",0.0))
        self.addValue(smresTotal.get("base2",0.0))
        self.endHeaderRow()
        self.endTable()

    def getName(self,code,specs):
        res = "No encontrado"
        person = Person.bring(code)
        if person: res = person.Name
        return res

    def getPaymentDays(self, invSerNr):
        #self.currInvDaysDict = {"DueDate":None, "InstallDate":None, "ReceiptDate":None, "HasCheque":True, "ChequeDate":None}
        if self.currInvDaysDict["HasCheque"] and self.currInvDaysDict["ChequeDate"]:
            if self.currInvDaysDict["InstallDate"]:
                return dateDiff(self.currInvDaysDict["InstallDate"], self.currInvDaysDict["ChequeDate"])
            elif self.currInvDaysDict["DueDate"]:
                return dateDiff(self.currInvDaysDict["DueDate"], self.currInvDaysDict["ChequeDate"])
            elif self.currInvDaysDict["TransDate"]:
                return dateDiff(self.currInvDaysDict["TransDate"], self.currInvDaysDict["ChequeDate"])
        else:
            if self.currInvDaysDict["ReceiptDate"]:
                if self.currInvDaysDict["InstallDate"]:
                    return dateDiff(self.currInvDaysDict["InstallDate"], self.currInvDaysDict["ReceiptDate"])
                elif self.currInvDaysDict["DueDate"]:
                    return dateDiff(self.currInvDaysDict["DueDate"], self.currInvDaysDict["ReceiptDate"])
                elif self.currInvDaysDict["TransDate"]:
                    return dateDiff(self.currInvDaysDict["TransDate"], self.currInvDaysDict["ReceiptDate"])
        return 0

    def genPurchaseInvoice(self,param, value):
        from PurchaseInvoice import PurchaseInvoice,PurchaseInvoiceRow
        from VATCode import VATCode
        specs = self.getRecord()
        daux=param.split(";")
        p = Person.bring(daux[0])
        if (p):
            query = Query()
            query.sql = "SELECT Code,CostAcc from Supplier where TaxRegNr = s|%s | " % p.ID
            if (query.open() and query.count()):
               pinv = PurchaseInvoice()
               pinv.defaults()
               pinv.SupCode = query[0].Code
               pinv.pasteSupCode()
               pinv.Currency = daux[2]
               pinv.CurrencyRate = 1

               pirow = PurchaseInvoiceRow()
               pirow.Account = query[0].CostAcc
               pirow.pasteAccount(pinv)
               pirow.RowTotal = daux[1]
               pirow.pasteRowTotal(pinv)
               pinv.PurchaseInvoiceRows.append(pirow)
               pinv.setTotal()
               pinv.sumUp()
               from PurchaseInvoiceWindow import PurchaseInvoiceWindow
               grw = PurchaseInvoiceWindow()
               grw.setRecord(pinv)
               grw.open()
