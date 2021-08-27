const Repositorie = require('../repositories/viewpowerbi')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class ViewPowerBi {

    async insertPowerBi(powerbis, id_login) {
        try {
            powerbis.forEach(obj => {
                const viewpowerbi = {
                    id_powerbi: obj,
                    id_login: id_login
                }

                Repositorie.insert(viewpowerbi)
            })

            return true
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async deletePowerBi(id_viewpowerbi) {
        try {
            const result = await Repositorie.delete(id_viewpowerbi)
            return result
        } catch (error) {
            throw new NotFound('Error')
        }
    }

    listPowerBi() {
        try {
            return Repositorie.list()
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

}

module.exports = new ViewPowerBi