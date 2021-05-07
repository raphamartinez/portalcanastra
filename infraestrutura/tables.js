class Tables {
    init(connection){
        this.connection = connection
    }

    checkMail(){

        connection.query(
            'SELECT LO.password, LO.status, LO.id_login FROM Login LO WHERE LO.mail = ?',
            [mail],
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              console.log(fields); // fields contains extra meta data about results, if available
            }
          );
    }


    createTableLogin() {
      const sql = `CREATE TABLE IF NOT EXISTS Login (id_login int NOT NULL AUTO_INCREMENT,mail VARCHAR NOT NULL,
        password VARCHAR NOT NULL, status int NOT NULL, date DATETIME NOT NULL, PRIMARY KEY (id_login)`;

        this.connection.query(sql, (error) => {
          if(error){
            console.log(error)
          }else{
            console.log('tabela de login criada')
          }
        })

    }
}