const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;

const insertUser =  async (user) => {
    const data = await fetch(`http://${url}/user` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user
        })
    })

    if (data === true) {
        return data.json()
    }
    throw new Error('error')
}

const listOffice =  async () => {
    const data = await fetch(`http://${url}/offices`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}


const updateUser =  async (user) => {
    const data = await fetch(`http://${url}/user` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const deleteUser =  async (id_user) => {
    const data = await fetch(`http://${url}/user` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_user: id_user
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const viewUser =  async (id_user) => {
    const data = await fetch(`http://${url}/user` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_user: id_user
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}


const listUsers =  async () => {
    const data = await fetch(`http://${url}/users`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

export const Service = {
    insertUser,
    updateUser,
    deleteUser,
    viewUser,
    listUsers,
    listOffice
}