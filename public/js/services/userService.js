const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;
const protocol = window.location.protocol

const insertUser =  async (user) => {
    const data = await fetch(`${protocol}//${url}/user` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user
        })
    })

    if (data) {
        return data.json()
    }
    throw new Error('error')
}

const listOffice =  async () => {
    const data = await fetch(`${protocol}//${url}/offices`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}


const updateUser =  async (user,id_user) => {
    const data = await fetch(`${protocol}//${url}/user/${id_user}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user
        })
    })

    const result = await data.json()

    if (result === true) {
        return result
    }
    throw new Error('error')
}

const deleteUser =  async (id_user) => {
    const data = await fetch(`${protocol}//${url}/user/${id_user}` , {
        method: 'DELETE'
    })

    const result = await data.json()

    if (result === true) {
        return result
    }
    throw new Error('error')
}

const viewUser =  async (id_user) => {
    const data = await fetch(`${protocol}//${url}/user` , {
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
    const data = await fetch(`${protocol}//${url}/users`)

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