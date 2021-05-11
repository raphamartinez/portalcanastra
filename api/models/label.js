const repositorie = require('../repositories/label')

class Label {

    listLabel(){
        return repositorie.list()
    }


    async insertLabel(label){
        return result = await repositorie.insert(label)
    }

    async deleteLabel(id){
        return result = await repositorie.delete(id)
    }

    async updateLabel(id, label){
        return result = await repositorie.update(label, id)
    }
}

module.exports = new Label