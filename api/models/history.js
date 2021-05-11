const repositorie = require('../repositories/history')

class History {

    listHistory(){
        return repositorie.list()
    }

    async viewHistory(id){
        return result = await repositorie.view(id)
    }

    async insertHistory(history){
        return result = await repositorie.insert(history)
    }

    async deleteHistory(id){
        return result = await repositorie.delete(id)
    }

    async updateHistory(id, history){
        return result = await repositorie.update(history, id)
    }
}

module.exports = new History