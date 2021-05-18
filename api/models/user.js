const Repositorie = require('../repositories/user')
const RepositorieLogin = require('../repositories/login')
const RepositorieBi = require('../repositories/powerbi')
const bcrypt = require('bcrypt')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class User {

    static generatePasswordHash(password) {
        const costHash = 12
        return bcrypt.hash(password, costHash)
    }

    async insertUser(data) {
        try {
            const password = await User.generatePasswordHash(data.user.login.password)

            const login = {
                mail: data.user.login.mail,
                password: password,
                mailVerify: 1,
                status: 1
            }

            const obj = await RepositorieLogin.insert(login)
            console.log(obj)

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
            console.log(result)

            return result
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async deleteStatus(id_user) {
        try {
            const status = 0
            const result = await Repositorie.deleteStatus(status, id_user)
            return result
        } catch (error) {
            throw new NotFound('Error')
        }
    }

    async updateUser(data, id_user) {
        try {

            const user = {
                id_user: id_user,
                name: data.user.name,
                perfil: data.user.perfil,
                dateBirthday: data.user.dateBirthday,
                office: {
                    id_office: data.user.id_office
                }
            }

            const login = {
                id_login: data.user.id_login,
                mail: data.user.mail
            }

            await Repositorie.update(user)
            await RepositorieLogin.update(login)
            return true
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async listUsers() {
        try {
            let data = await Repositorie.list()

            await data.forEach(async obj => {

                obj.count = await RepositorieBi.count(obj.id_login)

                switch (obj.perfil) {
                    case 1: obj.perfilDesc = "admin"
                        break

                    case 2: obj.perfilDesc = "vendedor"
                        break

                    case 3: obj.perfilDesc = "depositero"
                        break

                    case 4: obj.perfilDesc = "gerente"
                        break

                    case 5: obj.perfilDesc = "personal administrativo"
                        break

                    default: obj.perfilDesc = "usuario"
                        break
                }
            })

            return data

        } catch (error) {
            throw new InternalServerError('Error')
        }
    }

    async viewUser(id_user) {
        try {
            const user = await Repositorie.view(id_user)
            return user
        } catch (error) {
            throw new NotFound('Error')
        }
    }
}

module.exports = new User