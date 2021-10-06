const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')
const xlsx = require('read-excel-file/node')
const Repositorie = require('../repositories/car')

class Car {

    dashboard() {
        try {
            return Repositorie.list()
        } catch (error) {
            throw new InternalServerError('Error.')
        }
    }

    async list() {
        try {
            const filePath = `Vehiculos.xlsx`

            const data = await xlsx(filePath).then((rows) => {
                return rows
            })

            data.shift()
            
            return data

        } catch (error) {
            console.log(error);
            throw new InternalServerError('Error.')
        }
    }
}

module.exports = new Car