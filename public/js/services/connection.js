const host = window.location.host;
const split = document.URL.split("/")
const protocol = split[0]

const noBody = async (url, method) => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    try {
        const result = await fetch(`${protocol}//${host}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (result.ok) {
            return result.json()
        } else {
            if (result.status === 401) {
                const valid = await refresh()

                if (valid === true) {
                    try {
                        const newAccessToken = JSON.parse(localStorage.getItem('accessToken'))

                        const newresult = await fetch(`${protocol}//${host}/${url}`, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${newAccessToken}`
                            }
                        })

                        if (newresult.ok) {
                            return newresult.json()
                        } else {
                            alert('Erro no servidor.')
                            return result.json()
                        }
                    } catch (error) {
                        throw new Error(error)
                    }
                } else {
                    return false
                }
            }

            if (result.status === 404) {
                alert('Não foi encontrado.')
                return result.json()
            }

            if (result.status === 500) {
                alert('Erro no servidor.')
                return result.json()
            }
        }

    } catch (error) {
        return error
    }
}

const body = async (url, data, method) => {

    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    try {
        const result = await fetch(`${protocol}//${host}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })

        if (result.ok) {
            return result.json()
        } else {
            if (result.status === 401) {
                const valid = await refresh()

                if (valid === true) {
                    try {
                        const newAccessToken = JSON.parse(localStorage.getItem('accessToken'))

                        const newresult = await fetch(`${protocol}//${host}/${url}`, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${newAccessToken}`
                            }
                        })

                        if (newresult.ok) {
                            return newresult.json()
                        } else {
                            alert('Erro no servidor.')
                            return result.json()
                        }
                    } catch (error) {
                        throw new Error(error)
                    }
                } else {
                    return false
                }
            }

            if (result.status === 404) {
                alert('Não foi encontrado.')
                return result.json()
            }

            if (result.status === 500) {
                alert('Erro no servidor.')
                return result.json()
            }
        }
    } catch (error) {
        return error
    }
}

const noBearer = async (url, data, method) => {
    const result = await fetch(`${protocol}//${host}/${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (result.ok) {
        return result.json()
    } else {
        if (result.status === 401) {
            const valid = await refresh()

            if (valid === true) {
                try {
                    const newAccessToken = JSON.parse(localStorage.getItem('accessToken'))

                    const newresult = await fetch(`${protocol}//${host}/${url}`, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newAccessToken}`
                        }
                    })

                    if (newresult.ok) {
                        return newresult.json()
                    } else {
                        alert('Erro no servidor.')
                        return result.json()
                    }
                } catch (error) {
                    throw new Error(error)
                }
            } else {
                return false
            }
        }

        if (result.status === 404) {
            alert('Não foi encontrado.')
            return result.json()
        }

        if (result.status === 500) {
            alert('Erro no servidor.')
            return result.json()
        }
    }

    throw new Error('Usuário e/ou senha inválido!')
}


const refresh = async () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

    const data = await fetch(`${protocol}//${host}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
            accessToken: accessToken
        })
    })

    if (data.status === 401) {
        sessionStorage.clear()
        localStorage.clear()

        window.location.href = '../public/login.html'

        alert('Sua sessão foi encerrada por inatividade!')
    }

    if (data.ok) {
        const token = await data.json()

        localStorage.setItem('accessToken', JSON.stringify(token.accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken))

        return true
    }

    throw new Error('error')
}

export const Connection = {
    noBody,
    body,
    noBearer,
    refresh
}


