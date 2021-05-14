const repositorie = require('../repositories/office')

class Office {

    createOffice(office){
        return repositorie.insert(office)
            .then(result => {
                return result
            })
    }

    updateOffice(office, id){
        return repositorie.update(office, id)
            .then(result => {
                return result
            })
    }

    deleteOffice(id){
        return repositorie.delete(id)
            .then(result => {
                return result
            })
    }

    viewOffice(id){
        return repositorie.view(id)
            .then(result => {
                return result
            })
    }

    listOffice(){
        return repositorie.list()
    }

}

module.exports = new Office