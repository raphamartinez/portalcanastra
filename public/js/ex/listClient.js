import { Service } from '../services/client'

const newLine = (id_client, name, dateReg) => {
    const line = document.createElement('tr')

    const content =
        ` <th scope="row">1</th>
        <td>${id_client}</td>
        <td>${name}</td>
        <td>${dateReg}</td>
      </tr>`

    line.innerHTML = content
    line.dataset.id = id_client

    return line
}

table.addEventListener('click', async (event) => {
    let btn = event.target.className === 'btn-class'

    if (btn) {
        try {
            const lineClient = event.target.closest('[data-id')
            let id = lineClient.dataset.id
            await Service.deleteClient(id)
            lineClient.remove()
        } catch (error) {
            console.log(error)
            window.location.href = '../page_error.html'
        }


    }
})

const table = document.querySelector('[data-table]')

const render = async () => {
    try {
        const service = await Service.listClients()

        service.forEach(data => {
            table.appendChild(newLine(data.id_client, data.name, data.dateReg))
        });
    } catch (error) {
        console.log(error)
        window.location.href = '../page_error.html'
    }
}

render()


