const puppeteer = require('puppeteer');
const Repositorie = require('../repositories/prosegur')
const fs = require('fs')

class WebScraping {


    async init() {
        try {
            this.listProsegurPowerandStop()
            this.listProsegurMaintenance()
            this.listProsegurTire()
            // this.listProsegurOffice()
            // this.listInviolavel()
        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurPowerandStop() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', process.env.PROSEGUR_MAIL)
            await page.type('#pass', process.env.PROSEGUR_PASSWORD)
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
                if (line[1] > lastInsertArrest) {
                    await Repositorie.insertArrest(line)
                }
            })

            const lastInsertPower = await Repositorie.listPower()

            onOff.forEach(async line => {
                const pop = line.pop()
                if (line[1] > lastInsertPower) {
                    await Repositorie.insertPower(line)
                }
            })

            await browser.close();

        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurMaintenance() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', process.env.PROSEGUR_MAIL)
            await page.type('#pass', process.env.PROSEGUR_PASSWORD)
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
                if (line[0] > lastInsertMaintenance) {
                    Repositorie.insertMaintenance(line.slice(1))
                }
            })

            await browser.close();

        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurTire() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', process.env.PROSEGUR_MAIL)
            await page.type('#pass', process.env.PROSEGUR_PASSWORD)
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
                if (line[5] !== lastInsertTire) {
                    Repositorie.insertTire(line.slice(1))
                }
            })

            await browser.close();

        } catch (error) {
            console.log(error)
        }
    }

    async listProsegurOffice() {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://smart.prosegur.com/smart-web-min/smart-login/#/negocios')
            await page.type('#txt_user_name', process.env.PROSEGUR_MAIL)
            await page.type('#txt_user_pass', process.env.PROSEGUR_PASSWORD)
            await page.click('#btn_enter')

            await page.waitForNavigation()
            await page.waitForTimeout(3000)

            await page.goto('https://smart.prosegur.com/smart-web-min/smart-multisede/#/reports')



            fs.readFile('./file.csv', async (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log(await neatCsv(data))
            })

            await browser.close();

        } catch (error) {

        }
    }

    async listInviolavel() {
        try {

            const provider = "0686"

            const logins = [
                [
                    "3500",
                    "345",
                    "ANSA3500"
                ],
                [
                    "3502",
                    "371",
                    "ANSA3502"
                ],
                [
                    "3532",
                    "233",
                    "ANSA3532"
                ],
                [
                    "3533",
                    "583",
                    "ANSA3533"
                ],
                [
                    "3537",
                    "494",
                    "ANSA3537"
                ],
                [
                    "3538",
                    "493",
                    "ANSA3538"
                ],
                [
                    "3539",
                    "288",
                    "ANSA3539"
                ],
                [
                    "3540",
                    "511",
                    "ANSA3540"
                ],
                [
                    "3541",
                    "936",
                    "ANSA3541"
                ],
                [
                    "3543",
                    "911",
                    "ANSA3543"
                ],
                [
                    "3587",
                    "232",
                    "ANSA3587"
                ]
            ]

            const results = []

            logins.forEach(async login => {

                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                await page.goto('https://webalarme.com.br/')
                await page.type('body > div.login.ng-scope > div.content > form > div.row.form-group.inline-fields.ng-scope > div.field.margin-right-10-percent > input', provider)
                await page.type('body > div.login.ng-scope > div.content > form > div.row.form-group.inline-fields.ng-scope > div:nth-child(2) > input', login[1])
                await page.type('body > div.login.ng-scope > div.content > form > div:nth-child(4) > div.form-group > div > input', login[2])
                await page.click('body > div.login.ng-scope > div.content > form > div.form-actions.padding-login > button')

                await page.waitForNavigation()
                await page.waitForTimeout(3000)

                await page.goto('https://webalarme.com.br/#!/events')
                await page.waitForTimeout(1000)

                const data = await page.evaluate(() => {
                    const tdsNeumaticos = Array.from(document.querySelectorAll('body > div.page-wrapper.ng-scope > div.page-container > div.page-content-wrapper > div > div.col-12.ng-scope > div > div.portlet-body > div '),
                        row => Array.from(row.querySelectorAll('div > div > div.mt-comment, -body > div.mt-comment-text.ng-binding.ng-scope, td'),
                            cell => cell.innerText))
                    return tdsNeumaticos
                })

                // const lastInsert = await Repositorie.listInviolavel()
                let obj = []


                data.forEach(function (item, index, object) {

                    const result = object.toString()
                    const removeSpace = result.split('\n').toString()
                    const removeCommon = removeSpace.split(',')
                    obj = removeCommon
                    // if (removeCommon[index] === 'TESTE AUTOMATICO DO RADIO   ') {
                    //     removeCommon.splice(index, 2);
                    // }



                    // for (let i = 0; i < removeCommon.length; i += 3) {
                    //     const chunk = removeCommon.slice(i, i + 3)
                    //     res.push(chunk)
                    // }

                    // if(res[2] > lastInsert){
                    //     Repositorie.insertInviolavel(removeCommon)
                    // }
                })
                console.log(obj)
                const id = obj.indexOf('TESTE AUTOMATICO DO RADIO')
                console.log(id)

                await browser.close();
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new WebScraping