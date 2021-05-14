import { ViewDashboard } from "../views/dashboardView.js"
import { PowerBI } from "./powerBIController.js"
import { Service } from "../services/historyService.js"


window.onload = async function () {

    await ViewDashboard.showHeader()
    
    ViewDashboard.showFooter()

    let cardHistory = document.getElementById('cardHistory')

    let history = await Service.historyDashoard()

    ViewDashboard.showCardHistory(cardHistory, history)
    ViewDashboard.showCardBd()

    let user = JSON.parse(sessionStorage.getItem('user'))
    let name = user.name.substring(0,(user.name + " ").indexOf(" "))
    let username = document.querySelector('[data-username]')
    username.innerHTML = name

    let simpleBi = document.getElementById('powerbi')

    PowerBI.init(simpleBi, cardHistory)

}
