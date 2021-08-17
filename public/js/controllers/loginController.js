import { Connection } from '../services/connection.js'

function onCod (event) {
    event.preventDefault()
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


window.onlogin = onlogin

async function onlogin(event) {
    event.preventDefault()
    
    const mail = document.querySelector('[data-mail]').value
    const password = document.querySelector('[data-password]').value

    try{

        const body = {mail, password}

        const data = await Connection.noBearer('login',body,'POST')

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

        const data = Connection.body('accesscod', {accesscod: cod}, 'POST')

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
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

        const data = await Connection.body('logout',{refreshToken: refreshToken},'POST')

        sessionStorage.clear()
        localStorage.clear()

        window.location.href = data.url
    }catch(error){
        alert(error)
    }
}