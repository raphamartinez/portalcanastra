import { ViewDashboard } from "../views/dashboardView.js"
import { PowerBI } from "./powerBIController.js"


    window.onload = async function () {

        ViewDashboard.showHeader().then(response => {
            ViewDashboard.showFooter()

            let user = JSON.parse(sessionStorage.getItem('user'))
            let username = document.querySelector('[data-username]')
            username.innerHTML = user.name

            PowerBI.init()
        })
    }
