const moment = require('moment')
const connection = require('../infraestrutura/connection')
const functions = require('../functions/login')

class Login {
    login(mail, password, res) {

        const mailvalid = mail.lenght >= 9
        const passwordValida = password.lenght >= 9

        const validacoes = [
            {
                name: 'mail',
                valid: mailvalid,
                message: 'Ingrese el código de acceso y la contraseña correctamente'
            },
            {
                name: 'password',
                valid: passwordValida,
                message: 'Ingrese el código de acceso y la contraseña correctamente'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valid)

        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            functions.checkMail(mail)
                .then(passHash => functions.checkPass(pass, passHash, mail))
                .then(usuario => functions.criarTokenJWT(usuario))
                .then(obj => {
                    token = obj.token
                    usuario = obj.usuario

                    res.setHeader('Authorization', token)
                    res.status(200).json(usuario)
                })
                .catch(error => {
                    res.status(400).json('Acceso y / o contraseña (s) no válidos')
                })
        }
    }



    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clientevalid = atendimento.cliente.lenght >= 5

        const validacoes = [
            {
                name: 'data',
                valid: dataValida,
                message: 'La fecha debe ser mayor o igual que la fecha actual'
            },
            {
                name: 'cliente',
                valid: clientevalid,
                message: 'El cliente debe tener al menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valid)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos set ?'

            connection.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`

        connection.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    alterar(id, valores, res) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format
        }

        connection.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(...valores, id)
            }
        })
}

    deletar(id, res) {
        const sql = 'DELETE from Atendimentos WHERE id=?'

        connection.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Login