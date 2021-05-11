const repositorie = require('../repositories/contact')

class Contact {

    async insertContact(contact){
        return result = await repositorie.insert(contact)
    }

    async updateContact(contact, id){
        return result = await repositorie.update(contact, id)
    }

    async deleteContact(id){
        return result = await repositorie.delete(id)
    }

    async viewContact(id){
        return result = await repositorie.view(id)
    }

    listContact(){
        return repositorie.list()
    }
}

module.exports = new Contact