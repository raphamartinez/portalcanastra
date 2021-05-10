const repositorie = require('../repositories/item')

class Item {

    createItem(item){
        return repositorie.insert(item)
            .then(result => {
                return result
            })
    }

    updateItem(item, id){
        return repositorie.update(item, id)
            .then(result => {
                return result
            })
    }

    deleteItem(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    viewItem(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    listItem(){
        return repositorie.list()
    }
}

module.exports = new Item