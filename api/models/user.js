const moment = require('moment')
const Repositorie = require('../repositories/user')
const RepositorieLogin = require('../repositories/login')
const RepositorieBi = require('../repositories/powerbi')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class User {

    async insertUser(data) {
        try {

            const login = {
                mail: data.user.login.mail,
                password: data.user.login.password,
                mailVerify: 1,
                status: 1
            }
            
            const obj = await RepositorieLogin.insert(login)

            const user = {
                name: data.user.name,
                perfil: data.user.perfil,
                dateBirthday: data.user.dateBirthday,
                status: 1,
                office: {
                    id_office: data.user.office.id_office
                },
                login: {
                    id_login: obj.id_login
                }
            }

            const result = await Repositorie.insert(user)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async deleteUser(id) {
        try {
            const result = await Repositorie.delete(id)
            return result
        } catch (error) {
            throw new NotFound('Error')
        }
    }

    async updateUser(id_user, data) {
        try {

            if (data.dateBirthday) {
                dateBirthday = moment(data.dateBirthday, 'DD/MM/YYYY').format
            }

            const user = {
                id_user: id_user,
                name: data.name,
                perfil: data.perfil,
                dateBirthday: dateBirthday,
                office: {
                    id_office: data.id_office
                }
            }

            const result = await Repositorie.update(user)
            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async listUsers() {
        try {
            let data = await Repositorie.list()
            let count

            data.forEach(user => {

                RepositorieBi.count(user.id_login)
                    .then(obj => {
                        count = obj[0].count
                    }).catch(error => {
                        throw new InternalServerError('Error')
                    })

                user['count'] = count

                switch (user.perfil) {
                    case 1: user.perfil = "admin"
                        break

                    case 2: user.perfil = "vendedor"
                        break

                    case 3: user.perfil = "depositero"
                        break

                    case 4: user.perfil = "gerente"
                        break

                    case 5: user.perfil = "personal administrativo"
                        break
                }
            })



            return data

        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async viewUser(id) {
        try {
            const user = await Repositorie.view(id)
            return user
        } catch (error) {
            throw new NotFound('Error')
        }
    }
}

module.exports = new User