const repositorie = require('../repositories/itemgroup')

class ItemGroup {

    async insertItemGroup(itemgroup){
        return result = await repositorie.insert(itemgroup)
    }

    async updateItemGroup(itemgroup, id){
        return result = await repositorie.update(itemgroup, id)
    }

    async deleteItemGroup(id){
        return result = await repositorie.delete(id)
    }

    listItemGroup(){
        return repositorie.list()
    }
}

module.exports = new ItemGroup