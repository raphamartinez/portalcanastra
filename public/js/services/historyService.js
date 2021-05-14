const context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
const url = window.location.host;

const historyDashoard =  async () => {
    const data = await fetch(`http://${url}/historyDashboard`)

    if (data.ok) {
        return data.json()
    }
    throw new Error('usuario o la contraseña no son válidos')
}

export const Service = {
    historyDashoard
}