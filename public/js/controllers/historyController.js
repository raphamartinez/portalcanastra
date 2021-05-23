import { View } from "../views/historyView.js"
import { ServiceHistory } from "../services/historyService.js"

const btn = document.querySelector('[data-history]')
const cardHistory = document.querySelector('[data-card]')


btn.addEventListener('click', async (event) => {
    event.preventDefault()
    cardHistory.style.display = 'none';
    let loading = document.querySelector('[data-loading]')
loading.innerHTML = `
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
`
    try {
        let title = document.querySelector('[data-title]')
        let table = document.querySelector('[data-table]')
        let powerbi = document.querySelector('[data-powerbi]')
        let head = document.querySelector('[data-table-head]')
        let body = document.querySelector('[data-table-body]')


        title.innerHTML = "Historial"
        table.style.display = '';
        head.innerHTML = " "
        body.innerHTML = " "
        powerbi.innerHTML = " "
        loading.innerHTML = " "
        const data = await ServiceHistory.listHistory()

        head.appendChild(View.header())

        data.forEach(history => {
            body.appendChild(View.newLine(history))
        });
    } catch (error) {

    }
})