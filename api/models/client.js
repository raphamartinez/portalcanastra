const repositorie = require('../repositories/client')

class Client {

    async createClient(client) {
        return result = await repositorie.insert(client)
    }

    async updateClient(client, id) {
        return result = await repositorie.update(client, id)
    }

    async deleteClient(id) {
        return result = await repositorie.delete(id)
    }

    async viewClient(id) {
        return result = await repositorie.view(id)
    }

    listClient() {
        return repositorie.list()
    }
}

module.exports = new Client