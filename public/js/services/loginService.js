const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;
//window.location.protocol + "//" +
const login = (mail, password) => {
    return fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mail: mail,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('usuario o la contraseña no son válidos')
        })
}

export const Service = {
    login
}