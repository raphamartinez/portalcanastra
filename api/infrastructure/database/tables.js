
class Tables {

  init(connection) {
    this.connection = connection
    this.createTableLogin()
    this.createTableUser()
    this.createTableHistory()
    this.createTablePowerBI()
    this.createTableViewPowerBI()

    return true
  }

  createTableViewPowerBI() {
    const sql = `CREATE TABLE IF NOT EXISTS viewpowerbi (id_viewpowerbi int NOT NULL AUTO_INCREMENT, id_powerbi int NOT NULL, id_login int NOT NULL,
     dateReg DATETIME NOT NULL, PRIMARY KEY (id_viewpowerbi),  FOREIGN KEY (id_powerbi) REFERENCES powerbi (id_powerbi), 
     FOREIGN KEY (id_login) REFERENCES login (id_login))`

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
      }
    })
  }

  createTablePowerBI() {
    const sql = `CREATE TABLE IF NOT EXISTS powerbi (id_powerbi int NOT NULL AUTO_INCREMENT, url VARCHAR (1000) NOT NULL, title VARCHAR (50) NOT NULL,
    type int, token VARCHAR (250), idreport VARCHAR (100), dateReg DATETIME NOT NULL, PRIMARY KEY (id_powerbi))`

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
      }
    })
  }

  createTableLogin() {
    const sql = `CREATE TABLE IF NOT EXISTS login (id_login int NOT NULL AUTO_INCREMENT,mail VARCHAR (100) NOT NULL,
        password VARCHAR (250) NOT NULL, mailVerify int,  status int NOT NULL, dateReg DATETIME NOT NULL, PRIMARY KEY (id_login))`

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
      }
    })
  }

  createTableUser() {
    const sql = `CREATE TABLE IF NOT EXISTS user (id_user int NOT NULL AUTO_INCREMENT,name VARCHAR (100) NOT NULL, perfil int NOT NULL, 
    status int NOT NULL, dateReg DATETIME NOT NULL, id_login int NOT NULL, 
        PRIMARY KEY (id_user), FOREIGN KEY (id_login) REFERENCES login(id_login))`

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
      }
    })
  }

  createTableHistory() {
    const sql = `CREATE TABLE IF NOT EXISTS history (id_history int NOT NULL AUTO_INCREMENT, 
        description VARCHAR (50) NOT NULL, status int NOT NULL, dateReg DATETIME NOT NULL, id_login int NOT NULL, PRIMARY KEY (id_history),
        FOREIGN KEY (id_login) REFERENCES login(id_login))`

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
      }
    })
  }
}

module.exports = new Tables