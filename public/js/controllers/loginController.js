import { LoginService } from '../services/loginService.js'

window.onSubmit = onSubmit

async function onSubmit () {

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