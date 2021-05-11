import { Service } from '../services/client'

const form = document.querySelector('[data-form')

form.addEventListener('submit', (event) => {
    const name = event.target.querySelector('[data-nome]').value
    const mail = event.target.querySelector('[data-mail]').value

    Service.createClient(name, mail)
        .then(data => {
            window.location.href = '../page_generic.html'
            data.forEach(data => {
                table.appendChild(newLine(data.id_client, data.name, data.dateReg))
            });
        })
        .catch(error => {
            console.log(error)
        })
})