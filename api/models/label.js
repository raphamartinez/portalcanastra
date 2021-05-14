const repositorie = require('../repositories/label')

class Label {

    listLabel(){
        return repositorie.list()
    }


    insertLabel(label){
        return repositorie.insert(label)
            .then(result => {
                return result
            })
    }

    deleteLabel(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    updateLabel(id, label){
        return repositorie.update(label, id)
            .then(result => {
                return result
            })
    }
}

module.exports = new Label