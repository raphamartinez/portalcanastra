const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;

const listBiUser =  async () => {
    const data = await fetch(`http://${url}/powerbis`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const listUser =  async (id) => {
    const data = await fetch(`http://${url}/powerbis/${id}`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const insertBi =  async (powerbi) => {
    const data = await fetch(`http://${url}/powerbi` , {
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


const updateBi =  async (id_powerbi, reportId, id_user) => {
    const data = await fetch(`http://${url}/powerbi` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_powerbi: id_powerbi,
            reportId: reportId,
            id_user: id_user
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const deleteBi =  async (id_powerbi) => {
    const data = await fetch(`http://${url}/powerbi` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_powerbi: id_powerbi
        })
    })

    if (data.ok) {
        return data.json()
    }
    throw new Error('error')
}

const viewBi =  async (id_powerbi) => {
    const data = await fetch(`http://${url}/powerbi` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_powerbi: id_powerbi
        })
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