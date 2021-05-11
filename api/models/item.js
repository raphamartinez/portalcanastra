const repositorie = require('../repositories/item')

class Item {

    async createItem(item){
        return result = await repositorie.insert(item)
    }

    async updateItem(item, id){
        return result = await repositorie.update(item, id)
    }

    async deleteItem(id){
        return result = await repositorie.delete(id)
    }

    async viewItem(id){
        return result = await repositorie.view(id)
    }

    listItem(){
        return repositorie.list()
    }
}

module.exports = new Item