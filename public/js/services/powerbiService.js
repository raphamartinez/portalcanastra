const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;
const split = document.URL.split("/")
const protocol = split[0]

const listBiUser =  async (id) => {
    const data = await fetch(`https://${url}/powerbis/${id}`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const listUser =  async (id) => {
    const data = await fetch(`https://${url}/powerbis/${id}`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const insertBi =  async (powerbi) => {
    const data = await fetch(`https://${url}/powerbi` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            powerbi: powerbi
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}


const updateBi =  async (powerbi, id) => {
    const data = await fetch(`https://${url}/powerbi/${id}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            powerbi: powerbi
        })
    })

    const result = await data.json()

    if (result === true) {
        return result
    }
    throw new Error('error')
}

const deleteBi =  async (id) => {
    const data = await fetch(`https://${url}/powerbi/${id}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await data.json()

    if (result === true) {
        return result
    }
    throw new Error('error')
}

const viewBi =  async (id) => {
    const data = await fetch(`https://${url}/powerbi/${id}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

export const Service = {
    listBiUser,
    listUser,
    insertBi,
    updateBi,
    deleteBi,
    viewBi
}