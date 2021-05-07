const conexao = require('../infraestrutura/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.checkMail = (mail) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "SELECT senha FROM Login where email = $1",
      values: [mail]
    }
    conexao.query(query)
      .then(res => {
        const senha = res.rows[0].senha;
        resolve(senha)
      })
      .catch(e => {
        reject(null)
      })
  });
}

exports.checkPass = (pass, senhaDb, mail) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, senhaDb, (err, isMatch) => {
      if (err) return false
      if (isMatch) {
        const query = {
          text: "SELECT AG.id_agente, AG.nome, AG.foto, LO.id_login, LO.status, LO.perfil FROM Login LO, Agente AG where AG.id_login = LO.id_login and LO.email =  $1",
          values: [mail]
        }
        conexao.query(query)
          .then(res => {
            const login = ({ 'id': res.rows[0].id_login, 'perfil': res.rows[0].perfil, 'status': res.rows[0].status })
            const user = ({ 'id': res.rows[0].id_agente, 'nome': res.rows[0].nome, 'foto': res.rows[0].foto, 'login': login })
            resolve(user)
          })
          .catch(e => {
            reject(null)
          })
      } else {
        reject(null)
      }
    })
  })
}

exports.criarTokenJWT = (usuario) => {
  return new Promise((resolve) => {
    const payload = ({
      'id': usuario.id_login
    });
    const token_string = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, { algorithm: 'RS256' })
    const obj = {
      'token': token_string,
      'usuario': usuario
    }
    resolve(obj)
  })
}

exports.validation = (email,senha) => {
  return new Promise((resolve,reject) => {
    
    var senhaValida = senha.lenght >= 9

    var variations = {
      digits: /\d/.test(email),
      lower: /[a-z]/.test(email),
      upper: /[A-Z]/.test(email),
    }
    if(senhaValida && variations && email != null && senha && null){
      resolve(true)
    }else{
      reject(true)
    }
  })
}

