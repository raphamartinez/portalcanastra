const repositorie = require('../repositories/address')

class Address {

    async insertAddress(address){
        return result = await repositorie.insert(address)
    }

   async updateAddress(address, id){
        return result = await repositorie.update(address, id)
    }

    async deleteAddress(id){
        return result = await repositorie.delete(id)
    }

    async viewAddress(id){
        return result = await repositorie.view(id)
    }

    listAddress(){
        return repositorie.list()
    }
}

module.exports = new Address