const repositorie = require('../repositories/office')

class Office {

    async createOffice(office){
        return result = await repositorie.insert(office)
    }

    async updateOffice(office, id){
        return result = await repositorie.update(office, id)
    }

    async deleteOffice(id){
        return result = await repositorie.delete(id)
    }

    async viewOffice(id){
        return result = await repositorie.view(id)
    }

    listOffice(){
        return repositorie.list()
    }

}

module.exports = new Office