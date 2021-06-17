import { ViewDashboard } from "../views/dashboardView.js"

window.onload = async function () {
    let loading = document.querySelector('[data-loading]')
    loading.innerHTML = `
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`

    let divadmin = document.querySelector('[data-adm]')
    let user = JSON.parse(sessionStorage.getItem('user'))

    let perfil = user.perfil
    if (perfil !== 1) {
        divadmin.innerHTML = " "
    }

    let table = document.querySelector('[data-table]')
    table.style.display = 'none';

    let title = document.querySelector('[data-title]')

    let name = user.name.substring(0, (user.name + " ").indexOf(" "))
    let username = document.querySelector('[data-username]')
    username.innerHTML = name
    loading.innerHTML = " "
    title.innerHTML = "Portal Canastra"
}
