const { use } = require('passport');
const moment = require('moment')
const Repositorie = require('../repositories/hbs')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

async function formatStringDatetoCompare(data) {
    var ano = data.split("-")[2];
    var mes = data.split("-")[1];
    var dia = data.split("-")[0];

    return ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2) + '-' + ano;
}

class Hbs {

    async init() {
        try {
            console.log('list hbs ok');
        } catch (error) {
            console.log('list hbs error' - error);
            throw new InternalServerError(error)
        }
    }

    async listUsers() {
        try {
            const data = await Repositorie.listUsers()
            data.forEach(user => {

                if (user.phone) {
                    user.phone = `${user.phone} - ${user.mobile}`
                } else {
                    user.phone = user.mobile
                }

                if (user.sex === 1) {
                    user.sex = 'H'
                } else {
                    user.sex = 'M'
                }

                switch (user.modalidad) {
                    case 1: "IPS"
                        break
                    case 2: "Sem Contrato"
                        break
                    case 3: "Contrato"
                        break
                }

                Repositorie.insertUser(user)
            });
            return true
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listSalary() {
        try {
            const data = await Repositorie.listSalary()
            data.forEach(obj => {
                const dt = `${obj.date} ${obj.time}`

                var ano = dt.split("-")[0];
                var mes = dt.split("-")[1];
                var dia = dt.split("-")[2];
            
                const dt1 = ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2) +'-'+ ano;

                const date1 = new Date(dt1);
                const date = moment(date1).format("YYYY-MM-DD HH:mm:ss")
                Repositorie.insertSalary(obj, date)
            });

            return true
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

}

module.exports = new Hbs