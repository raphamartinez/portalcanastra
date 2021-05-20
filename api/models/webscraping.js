const puppeteer = require('puppeteer');

class WebScraping {
    async listProsegurCars() {
        try {

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3')
            await page.type('#nombre', 'pviana05@gmail.com')
            await page.type('#pass', 'America+123')
            await page.click('#btn-submit')

            await page.waitForNavigation()
            await page.waitForTimeout(3000)
            await page.screenshot({path: 'teste.png'})

            await page.goto('https://localizacion.prosegur.com/informes/detenciones')
            await page.waitForNavigation()
            await page.waitForTimeout(4000)
            await page.screenshot({path: 'teste2.png'})

            await page.type('#vehicle_selected', 'ALL')
            const form = await page.$('#form');
            await page.screenshot({path: 'teste3.png'})

            await form.evaluate(form => form.submit());
            await page.waitForNavigation()
            await page.screenshot({path: 'teste4.png'})
            const dataPage = await page.evaluate(() => {
                // const lineDetenciones = Array.from(document.querySelectorAll('..gradeX odd'), element => element.textContent)
                // console.log(lineDetenciones)
                // const lineContacto = Array.from(document.querySelectorAll('..gradeX odd'), element => element.textContent)
                // console.log(lineContacto)
                return {
                    teste: document.querySelector('.center').innerHTML
                }
            })

            console.log(dataPage)

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new WebScraping