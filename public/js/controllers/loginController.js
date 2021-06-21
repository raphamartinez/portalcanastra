import { LoginService } from '../services/loginService.js'

function onCod () {
    try {
        const url = '../public/cod.html'
        window.location.href = url
    } catch (error) {
        alert(error)
    }
}
window.onMail = onMail

function onMail () {
    try {
        const url = '../public/login.html'
        window.location.href = url
    } catch (error) {
        alert(error)
    }
}
window.onCod = onCod


window.login = login

async function login () {

    const mail = document.querySelector('[data-mail]').value
    const password = document.querySelector('[data-password]').value

    try{

        const data = await LoginService.login(mail, password)

        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
    
        const user = data.user
    
        sessionStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', JSON.stringify(accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
    
        window.location.href = data.url
        
    }catch(error){
        alert(error)
    }
}

window.onSubmitCod = onSubmitCod

async function onSubmitCod () {

    const cod = document.querySelector('[data-cod]').value

    try{

        const data = await LoginService.login(mail, password)

        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
    
        const user = data.user
    
        sessionStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', JSON.stringify(accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
    
        window.location.href = data.url
        
    }catch(error){
        alert(error)
    }
}

window.onLogout = onLogout

async function onLogout () {

    try{
        const data = await LoginService.logout()

        sessionStorage.clear()
        localStorage.clear()

        window.location.href = data.url
    }catch(error){
        alert(error)
    }
}