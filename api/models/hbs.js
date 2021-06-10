const moment = require('moment')
const Repositorie = require('../repositories/hbs')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

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
                const date = moment(dt).format("YYYY-MM-DD HH:mm:ss")
                Repositorie.insertSalary(obj, date)
            });

            return true
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async listReceive() {
        try {
            const data = await Repositorie.listReceive()
            data.forEach(obj => {
                Repositorie.insertReceive(obj)
            });

            return true
        } catch (error) {
            throw new InternalServerError('Error')
        }
    }
}

module.exports = new Hbs