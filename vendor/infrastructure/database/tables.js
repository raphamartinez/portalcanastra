
class Tables {

  init(connection) {
    this.connection = connection
    createTableProsegur()
    createTableAddress() 
    createTableContact() 
    createTableOffice() 
    createTableClient() 
    createTableLogin() 
    createTableUser() 
    createTableHistory() 
    createTableLabel() 
    createTableItemGroup() 
    createTableItem()
    createTableAddressClient()
    createTableContactClient()
  }

  createTableProsegur() {
    const sql = `CREATE TABLE IF NOT EXISTS prosegur (id_prosegur int NOT NULL AUTO_INCREMENT, dateReg DATETIME NOT NULL, PRIMARY KEY (id_contact))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('prosegur table created')
      }
    })
  }

  createTableAddressClient() {
    const sql = `CREATE TABLE IF NOT EXISTS addressclient (id_addressclient int NOT NULL AUTO_INCREMENT, 
      id_address int, id_client int, dateReg DATETIME NOT NULL, PRIMARY KEY (id_addressclient))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('addressclient table created')
      }
    })
  }

  createTableContactClient() {
    const sql = `CREATE TABLE IF NOT EXISTS contactclient (id_contactclient int NOT NULL AUTO_INCREMENT, 
      id_contact int, id_client int, dateReg DATETIME NOT NULL, PRIMARY KEY (id_contactclient))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('contactclient table created')
      }
    })
  }

  createTableAddress() {
    const sql = `CREATE TABLE IF NOT EXISTS address (id_address int NOT NULL AUTO_INCREMENT, road VARCHAR (50), number int, zipcode VARCHAR (10)
        city VARCHAR (40), state VARCHAR (40), dateReg DATETIME NOT NULL, PRIMARY KEY (id_address))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('address table created')
      }
    })
  }

  createTableContact() {
    const sql = `CREATE TABLE IF NOT EXISTS contact (id_contact int NOT NULL AUTO_INCREMENT, name VARCHAR (40), 
        phone VARCHAR (20), taxregnr VARCHAR (20), mail VARCHAR (30), dateReg DATETIME NOT NULL, PRIMARY KEY (id_contact))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('contact table created')
      }
    })
  }

  createTableOffice() {
    const sql = `CREATE TABLE IF NOT EXISTS office (id_office int NOT NULL AUTO_INCREMENT,name VARCHAR (150) NOT NULL,
        status int NOT NULL, dateReg DATETIME NOT NULL, PRIMARY KEY (id_office))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('office table created')
      }
    })
  }

  createTableClient() {
    const sql = `CREATE TABLE IF NOT EXISTS client (id_client int NOT NULL AUTO_INCREMENT,name VARCHAR (150) NOT NULL,
        status int NOT NULL, dateReg DATETIME NOT NULL, PRIMARY KEY (id_client))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('client table created')
      }
    })
  }

  createTableLogin() {
    const sql = `CREATE TABLE IF NOT EXISTS login (id_login int NOT NULL AUTO_INCREMENT,mail VARCHAR NOT NULL,
        password VARCHAR NOT NULL, status int NOT NULL, dateReg DATETIME NOT NULL, PRIMARY KEY (id_login))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('login table created')
      }
    })
  }

  createTableUser() {
    const sql = `CREATE TABLE IF NOT EXISTS user (id_user int NOT NULL AUTO_INCREMENT,name VARCHAR (100) NOT NULL, perfil int NOT NULL,
        dateBirthday DATE, status int NOT NULL, dateReg DATETIME NOT NULL, id_login int NOT NULL, id_office int, 
        PRIMARY KEY (id_user), FOREIGN KEY (id_login) REFERENCES login(id_login), FOREIGN KEY (id_office) REFERENCES office(id_office)`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('user table created')
      }
    })
  }

  createTableHistory() {
    const sql = `CREATE TABLE IF NOT EXISTS history (id_history int NOT NULL AUTO_INCREMENT, 
        description VARCHAR NOT NULL, status int NOT NULL, dateReg DATETIME NOT NULL, id_user int NOT NULL, PRIMARY KEY (id_history),
        FOREIGN KEY (id_user) REFERENCES user(id_user))`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('history table created')
      }
    })
  }

  createTableLabel() {
    const sql = `CREATE TABLE IF NOT EXISTS label (id_label int NOT NULL AUTO_INCREMENT, code VARCHAR (20) NOT NULL,
      name VARCHAR (30) NOT NULL, type VARCHAR (10), jerarquia VARCHAR (20) NOT NULL, dateReg DATETIME NOT NULL, PRIMARY KEY (id_label))`;

  this.connection.query(sql, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('label table created')
    }
  })
  }

  createTableItemGroup() {
    const sql = `CREATE TABLE IF NOT EXISTS itemGroup (id_itemGroup int NOT NULL AUTO_INCREMENT, code VARCHAR (20) NOT NULL,
      name VARCHAR (30) NOT NULL, vatcode VARCHAR (5), dateReg DATETIME NOT NULL, PRIMARY KEY (id_itemGroup)`;

  this.connection.query(sql, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('itemGroup table created')
    }
  })
  }

  createTableItem() {
    const sql = `CREATE TABLE IF NOT EXISTS item (id_item int NOT NULL AUTO_INCREMENT, code VARCHAR (100) NOT NULL,
      name VARCHAR (100) NOT NULL, brandCode VARCHAR (50) NOT NULL, unit text, vatcode VARCHAR (5), type int, cost double, price double, status int NOT NULL, dateReg DATETIME NOT NULL, 
      id_label int NOT NULL, id_group int NOT NULL, PRIMARY KEY (id_item),
      FOREIGN KEY (id_label) REFERENCES label(id_label), FOREIGN KEY (id_itemGroup) REFERENCES itemGroup(id_itemGroup)`;

  this.connection.query(sql, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('item table created')
    }
  })
  }
}

module.exports = new Tables