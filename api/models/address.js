const repositorie = require('../repositories/address')

class Address {

    insertAddress(address){
        return repositorie.insert(address)
            .then(result => {
                return result
            })
    }

    updateAddress(address, id){
        return repositorie.update(address, id)
            .then(result => {
                return result
            })
    }

    deleteAddress(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    viewAddress(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    listAddress(){
        return repositorie.list()
    }
}

module.exports = new Address