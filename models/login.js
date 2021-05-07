const moment = require('moment')
const conexao = require('../infraestrutura/connection')
const functions = require('../functions/login')

class Login {
    logar(email, senha, res) {

        const emailValido = email.lenght >= 9
        const senhaValida = senha.lenght >= 9

        const validacoes = [
            {
                nome: 'email',
                valido: emailValido,
                mensagem: 'Digite o código de acesso e a senha corretamente'
            },
            {
                nome: 'senha',
                valido: senhaValida,
                mensagem: 'Digite o código de acesso e a senha corretamente'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

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
                    res.status(400).json('Acesso e/ou Senha inválido(s)')
                })
        }
    }



    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.lenght >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: ' Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: ' Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos set ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
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

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`

        conexao.query(sql, (erro, resultados) => {
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

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(...valores, id)
            }
        })
}

    deletar(id, res) {
        const sql = 'DELETE from Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Login