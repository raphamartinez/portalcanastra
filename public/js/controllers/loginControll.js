import { Service } from '../services/loginService.js'

const button = document.querySelector('[data-form]')

button.addEventListener('submit', (event) => {
    event.preventDefault()

    const mail = document.querySelector('[data-mail]').value
    const password = document.querySelector('[data-password]').value

    Service.login(mail, password)
        .then(data => {
            const accessToken = data.accessToken
            const refreshToken = data.refreshToken

            const user = data.user

            sessionStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))

            window.location.href = data.url
        })
        .catch(error => {
            alert(error)
        })
})