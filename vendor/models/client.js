const repositorie = require('../repositories/client')

class Client {

    createClient(client){
        return repositorie.insert(client)
            .then(result => {
                return result
            })
    }

    updateClient(client, id){
        return repositorie.update(client, id)
            .then(result => {
                return result
            })
    }

    deleteClient(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    viewClient(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    listClient(){
        return repositorie.list()
    }
}

module.exports = new Client