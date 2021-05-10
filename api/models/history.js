const repositorie = require('../repositories/history')

class History {

    listHistory(){
        return repositorie.list()
    }

    viewHistory(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    insertHistory(history){
        return repositorie.insert(history)
            .then(result => {
                return result
            })
    }

    deleteHistory(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    updateHistory(id, history){
        return repositorie.update(history, id)
            .then(result => {
                return result
            })
    }
}

module.exports = new History