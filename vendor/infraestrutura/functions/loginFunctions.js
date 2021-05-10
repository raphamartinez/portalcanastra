const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.checkMail = (mail) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT password FROM login where mail = ${mail}`
    conexao.query(sql)
      .then(res => {
        const password = res.rows[0].password;
        resolve(password)
      })
      .catch(e => {
        reject(null)
      })
  });
}

exports.checkPass = (password, passwordDb, mail) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordDb, (err, isMatch) => {
      if (err) return false
      if (isMatch) {

        const sql = `SELECT AG.id_agente, AG.nome, AG.foto, LO.id_login, LO.status, LO.perfil FROM Login LO, Agente AG where AG.id_login = LO.id_login and LO.email =  ${mail}`

        conexao.query(sql)
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

exports.validation = (mail,password) => {
  return new Promise((resolve,reject) => {
    
    var passwordValid = password.lenght >= 9

    var variations = {
      digits: /\d/.test(mail),
      lower: /[a-z]/.test(mail),
      upper: /[A-Z]/.test(mail),
    }
    if(passwordValid && variations && mail != null && password && null){
      resolve(true)
    }else{
      reject(true)
    }
  })
}

