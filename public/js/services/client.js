
const listClients = () => {
    return fetch(`http://localhost:3000/clients`)
        .then(data => {
            if (data.ok) {
                return data.json()
            }
            throw new Error('Could not list customers')
        })

}

const createClient = (name, mail) => {
    return fetch(`http://localhost:3000/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            mail: mail
        })
    })
        .then(response => {
            if (response.ok) {
                return response.body
            }
            throw new Error('Could not create a customer')
        })
}

const deleteClient = (id) => {
    return fetch(`http://localhost:3000/client/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                return response.body
            }
            throw new Error('Could not delete a customer')
        })
}

const showClient = (id) => {
    return fetch(`http://localhost:3000/client/${id}`)
        .then(data => {
            if (data.ok) {
                return data.json()
            }
            throw new Error('Could not show a customer')
        })
}

const updateClient = (id, name, mail) => {
    return fetch(`http://localhost:3000/client/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            mail: mail
        })
    })
        .then(data => {
            if (data.ok) {
                return data.json()
            }
            throw new Error('Could not update a customer')
        })
}


export const Service = {
    listClients,
    createClient,
    deleteClient,
    showClient,
    updateClient
}