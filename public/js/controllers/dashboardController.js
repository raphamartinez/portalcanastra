import { ViewDashboard } from "../views/dashboardView.js"
import { Service } from "../services/historyService.js"

window.onload = async function () {
    let table = document.querySelector('[data-table]')
    table.style.display = 'none';

    let title = document.querySelector('[data-title]')

    let cardHistory = document.querySelector('[data-card]')

    let history = await Service.historyDashoard()

    ViewDashboard.showCardHistory(cardHistory, history)
    ViewDashboard.showCardBd(cardHistory)

    let user = JSON.parse(sessionStorage.getItem('user'))
    let name = user.name.substring(0,(user.name + " ").indexOf(" "))
    let username = document.querySelector('[data-username]')
    username.innerHTML = name
    title.innerHTML = "Dashboard"

}
