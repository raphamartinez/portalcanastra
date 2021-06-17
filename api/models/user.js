const Repositorie = require('../repositories/user')
const RepositorieLogin = require('../repositories/login')
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
            const verifyMail = await RepositorieLogin.checkMail(data.user.login.mail)

            if (verifyMail === true) {
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
                    status: 1,
                    login: {
                        id_login: obj.id_login
                    }
                }
                console.log(user);

                const result = await Repositorie.insert(user)

                return result
            } else {
                throw new InvalidArgumentError('Error, ya existe este email!')
            }
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

            const verifyMail = await RepositorieLogin.checkMail(data.user.mail)

            if (verifyMail === true) {
                const user = {
                    id_user: id_user,
                    name: data.user.name,
                    perfil: data.user.perfil,
                }

                const login = {
                    id_login: data.user.id_login,
                    mail: data.user.mail
                }

                await Repositorie.update(user)
                await RepositorieLogin.update(login)
                return true
            } else {
                throw new InvalidArgumentError('Ya existe Este email!')
            }
        } catch (error) {
            throw new InvalidArgumentError('Error')
        }
    }

    async listUsers() {
        try {
            let data = await Repositorie.list()

            data.forEach(obj => {
                switch (obj.perfil) {
                    case 1: obj.perfilDesc = "master"
                        break

                    case 2: obj.perfilDesc = "admin"
                        break

                    case 3: obj.perfilDesc = "user"
                        break

                    case 4: obj.perfilDesc = "operational"
                        break

                    default: obj.perfilDesc = "operational"
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