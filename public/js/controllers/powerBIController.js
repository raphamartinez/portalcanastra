import { ViewPowerBI } from "../views/powerbiView.js"


const init = async () => {
    const btn = document.querySelector('[data-btnSimpleBI]')

    btn.addEventListener('click', async (event) => {
        event.preventDefault()

        ViewPowerBI.showSimplePowerBI()
    })

}

export const PowerBI = {
    init
}