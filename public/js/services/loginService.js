const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;
const split = document.URL.split("/")
const protocol = split[0]

const login = async (mail, password) => {
    const data = await fetch(`https://${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mail: mail,
            password: password
        })
    })

    if (data.ok) {
        return data.json()
    }

    throw new Error('usuario o la contraseña no son válidos')
}

const refresh = async (accessToken, refreshToken) => {
    const data = await fetch(`https://${url}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
            accessToken: accessToken
        })
    })

    if (data.ok) {
        return data.json()
    }

    throw new Error('error')
}

const logout = async (accessToken, refreshToken) => {
    const data = await fetch(`https://${url}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
            accessToken: accessToken
        })
    })

    if (data.ok) {
        return data.json()
    }

    throw new Error('error')
}

export const LoginService = {
    login,
    logout,
    refresh
}