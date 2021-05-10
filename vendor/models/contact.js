const repositorie = require('../repositories/contact')

class Contact {

    insertContact(contact){
        return repositorie.insert(contact)
            .then(result => {
                return result
            })
    }

    updateContact(contact, id){
        return repositorie.update(contact, id)
            .then(result => {
                return result
            })
    }

    deleteContact(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    viewContact(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    listContact(){
        return repositorie.list()
    }
}

module.exports = new Contact