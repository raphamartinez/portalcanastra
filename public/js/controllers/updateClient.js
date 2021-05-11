import { Service } from '../services/client'

(async () => {
    const url = new URL(window.location)

    const id = url.searchParams.get('id')

    const name = document.querySelector('[data-name]')
    const mail = document.querySelector('[data-mail]')

    const data = await Service.showClient(id)

    name.value = data.name
    mail.value = data.mail

})


const form = document.querySelector('[data-form]')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    await Service.updateClient(id, name.value, mail.value)
    window.location.href = "../page_generic.html"

})