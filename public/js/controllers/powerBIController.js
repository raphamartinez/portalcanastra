import { ViewPowerBI } from "../views/powerbiView.js"


const init = async (simpleBI, cardHistory) => {
    const btn = document.getElementById('btnSimpleBi')

    btn.addEventListener('click', async (event) => {
        event.preventDefault()

        cardHistory.style.display = 'none';

        ViewPowerBI.showSimplePowerBI(simpleBI)
    })

}

export const PowerBI = {
    init
}