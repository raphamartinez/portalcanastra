const puppeteer = require('puppeteer');

class WebScraping {

    async listProsegurDetencion() {
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
            await page.screenshot({ path: 'teste2.png' })
            await page.waitForTimeout(1000)

            const form = await page.$('#form');

            await form.evaluate(form => form.submit());
            await page.waitForNavigation()

            await page.click(`#datatableStops_wrapper > div.top > div.dt-buttons > button:nth-child(1)`)
            await page.click(`#datatableStopsOnOff_wrapper > div.top > div.dt-buttons > button:nth-child(1)`)

            const dataPage = await page.evaluate(() => {
                const tdsStop = Array.from(document.querySelectorAll('#datatableStops tr td'))
                const tdsOnOff = Array.from(document.querySelectorAll('#datatableStopsOnOff tr td'))
                return {
                    Stop: tdsStop.map(td => td.innerText),
                    OnOff: tdsOnOff.map(td => td.innerText)
                }
            })

            console.log(dataPage)


        } catch (error) {
        }
    }

    async listProsegurMantenimiento() {
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

            const dataPage = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#DataTables_Table_0 tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))

                return tdsNeumaticos
            })

            console.log(dataPage)
        } catch (error) {
        }
    }

    async listProsegurNeumatico() {
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

            const dataPage = await page.evaluate(() => {
                const tdsNeumaticos = Array.from(document.querySelectorAll('#dt-neumaticos-listado tr'),
                    row => Array.from(row.querySelectorAll('tr, td'), cell => cell.innerText))
                return tdsNeumaticos
            })

            

            // const dataPage = await page.evaluate(() => {
            //     return tdsNeumaticos = document.querySelectorAll('#dt-neumaticos-listado tr').map( column => 
            //      Array.from(column.querySelectorAll('#dt-neumaticos-listado th, td').map(cell => cell.innerText))
            //     )
            // })

            console.log(dataPage)
        } catch (error) {
        }
    }
}

module.exports = new WebScraping