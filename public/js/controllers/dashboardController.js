import { ViewDashboard } from "../views/dashboardView.js"
import { Service } from "../services/historyService.js"

window.onload = async function () {
    let divadmin = document.querySelector('[data-adm]')
    let user = JSON.parse(sessionStorage.getItem('user'))

    let perfil = user.perfil
    if(perfil !== 1){
        divadmin.innerHTML = " "
    }

    let table = document.querySelector('[data-table]')
    table.style.display = 'none';

    let title = document.querySelector('[data-title]')

    let cardHistory = document.querySelector('[data-card]')   

    let dividlogin = document.querySelector('[data-id_login-sy]')


    let history = await Service.historyDashoard()

    ViewDashboard.showCardHistory(cardHistory, history)
    ViewDashboard.showCardBd(cardHistory)

    let name = user.name.substring(0,(user.name + " ").indexOf(" "))
    let id_login = user.id_login
    console.log(perfil)
    let username = document.querySelector('[data-username]')
    username.innerHTML = name
    title.innerHTML = "Dashboard"
    dividlogin.dataset.iduselog= id_login


}
