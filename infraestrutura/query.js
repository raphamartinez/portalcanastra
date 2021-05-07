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
}