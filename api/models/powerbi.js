const Repositorie = require('../repositories/powerbi')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class PowerBi {

    async insertPowerBi(powerbi) {
        try {
            console.log(powerbi)

            const result = await Repositorie.insert(powerbi)
            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async deletePowerBi(id_powerbi) {
        try {
            const result = await Repositorie.delete(id_powerbi)
            return result
        } catch (error) {
            throw new NotFound('Error')
        }
    }

    async updatePowerBi(id_powerbi, data) {
        try {

            const powerbi = {
                id_powerbi: id_powerbi,
                url: data.url,
                type: data.type,
                token: data.token,
                idreport: data.idreport,
            }

            const result = await Repositorie.update(powerbi)
            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async listPowerBis(id_login) {
        try {
            const data = await Repositorie.listLogin(id_login)

            data.forEach(powerbi => {
                if (powerbi.type = 1) {
                    powerbi.type = 'Informe'
                } else {
                    powerbi.type = 'Integrado'
                }
            })

            return data
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listPowerBi() {
        try {
            const data = await Repositorie.listLogin()

            data.forEach(powerbi => {
                if (powerbi.type = 1) {
                    powerbi.type = 'Relatório'
                } else {
                    powerbi.type = 'Informe Integrado'
                }
            })

            return data

        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async viewPowerBi(id_powerbi) {
        try {
            const powerbi = await Repositorie.view(id_powerbi)
            return powerbi
        } catch (error) {
            throw new NotFound('Error')
        }
    }
}

module.exports = new PowerBi