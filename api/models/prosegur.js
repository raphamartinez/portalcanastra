const axios = require('axios')
const repositorie = require('../repositories/prosegur')

class Prosegur {

    async listData() {
        const data = await axios.post('https://localizacion.prosegur.com/login?origin=subdomain&timezone=3', { nombre: 'pviana05@gmail.com', pass: 'America+123' })

        return repositorie.insert(data)
            .then(result => {
                return result
            })
    }
}