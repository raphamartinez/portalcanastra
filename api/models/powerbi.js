const Repositorie = require('../repositories/powerbi')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class PowerBi {

    async insertPowerBi(powerbi) {
        try {
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

    async updatePowerBi(data, id_powerbi) {
        try {

            const powerbi = {
                id_powerbi: id_powerbi,
                url: data.powerbi.url,
                type: data.powerbi.type,
                token: data.powerbi.token,
                idreport: data.powerbi.idreport,
                title: data.powerbi.title
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
                
                switch (powerbi.type) {
                    case 1: powerbi.typedesc = 'Impressora'
                        break

                    case 2: powerbi.typedesc = 'Manutenção'
                        break

                    case 3: powerbi.typedesc = 'Financeiro'
                        break

                    case 4: powerbi.typedesc = 'Operacional'
                        break
                }
            })

            return data
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listPowerBi(id_login, type) {
        try {
            const data = await Repositorie.listLoginType(id_login, type)

            data.map(powerbi => {
                if (powerbi.type = 1) {
                    powerbi.typeDesc = 'Relatório de PowerBi'
                } else {
                    powerbi.typeDesc = 'Relatório Integrado'
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