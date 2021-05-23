const puppeteer = require('puppeteer');
const Repositorie = require('../repositories/prosegur')
const moment = require('moment')

class WebScraping {

    async listProsegurPowerandStop() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', 'pviana05@gmail.com')
            await page.type('#pass', 'America+123')
            await page.click('#btn-submit')

            await page.waitForNavigation()
            await page.waitForTimeout(3000)

            await page.goto('https://localizacion.prosegur.com/informes/detenciones')
            await page.waitForTimeout(1000)

            await page.click(`select [value="ALL"]`)
            await page.waitForTimeout(1000)

            const form = await page.$('#form');

            await form.evaluate(form => form.submit());
            await page.waitForNavigation()

            await page.click(`#datatableStops_wrapper > div.top > div.dt-buttons > button:nth-child(1)`)
            await page.click(`#datatableStopsOnOff_wrapper > div.top > div.dt-buttons > button:nth-child(1)`)

            const tableStop = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#datatableStops tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))
                return tdsNeumaticos
            })

            const tableOnOff = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#datatableStopsOnOff tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))
                return tdsNeumaticos
            })

            const stop = tableStop.slice(1)
            const onOff = tableOnOff.slice(1)

            const lastInsertArrest = await Repositorie.listArrest()

            stop.forEach(async line => {
                const pop = line.pop()

                if(line[1] > lastInsertArrest){
                await Repositorie.insertArrest(line)
                }
            })

            const lastInsertPower = await Repositorie.listPower()

            onOff.forEach(async line => {
                const pop = line.pop()

                if(line[1] > lastInsertPower){
                await Repositorie.insertPower(line)
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurMaintenance() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', 'pviana05@gmail.com')
            await page.type('#pass', 'America+123')
            await page.click('#btn-submit')

            await page.waitForNavigation()
            await page.waitForTimeout(3000)

            await page.goto('https://localizacion.prosegur.com/vehiculos/mantenimiento/mantenimiento')
            await page.waitForTimeout(1000)

            const data = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#DataTables_Table_0 tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))
                return tdsNeumaticos
            })

            const lastInsertMaintenance = await Repositorie.listMaintenance()

            const maintenances = data.slice(1)

            maintenances.forEach(line => {
                if(line[0] > lastInsertMaintenance){
                    Repositorie.insertMaintenance(line.slice(1))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurTire() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', 'pviana05@gmail.com')
            await page.type('#pass', 'America+123')
            await page.click('#btn-submit')

            await page.waitForNavigation()
            await page.waitForTimeout(3000)

            await page.goto('https://localizacion.prosegur.com/neumaticos/listado')
            await page.waitForTimeout(1000)

            const data = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#dt-neumaticos-listado tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))
                return tdsNeumaticos
            })

            const lastInsertTire = await Repositorie.listTire()
            const tires = data.slice(1)

            tires.forEach(line => {
                if (line[6] > lastInsertTire) {
                    Repositorie.insertTire(line.slice(1))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new WebScraping