const repositorie = require('../repositories/itemgroup')

class ItemGroup {

    insertItemGroup(itemgroup){
        return repositorie.insert(itemgroup)
            .then(result => {
                return result
            })
    }

    updateItemGroup(itemgroup, id){
        return repositorie.update(itemgroup, id)
            .then(result => {
                return result
            })
    }

    deleteItemGroup(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    listItemGroup(){
        return repositorie.list()
    }
}

module.exports = new ItemGroup