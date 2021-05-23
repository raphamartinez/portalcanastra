const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;
const split = document.URL.split("/")
const protocol = split[0]
import { Connection } from "../services/connection.js"
const historyDashboard =  async () => {
    let count = 1
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    const data = await fetch(`${protocol}//${url}/history` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (data.status === 401) {
        do {
            count = 0
            await Connection.refresh()

            historyDashboard()
        } while (count)
    }else{
        if (data.ok) {
            return data.json()
        }
    }

    if(count === 0){
        if (data.ok) {
            return data.json()
        }
    }


    throw new Error('Usuario o la contraseña no son válidos')
}

const listHistory =  async () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    const data = await fetch(`${protocol}//${url}/historys` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (data.ok) {
        return data.json()
    }

    throw new Error('Usuario o la contraseña no son válidos')
}

const insertHistory =  async (description) => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    const data = await fetch(`${protocol}//${url}/history` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            description: description
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

export const ServiceHistory = {
    historyDashboard,
    listHistory,
    insertHistory
}