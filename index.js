const customExpress = require('./config/customExpress')
const connection = require('./infraestrutura/connection')
const tables = require('./infraestrutura/tables')

connection.connect((error => {

    if (error) {
        console.log(error)
    } else {
        const app = customExpress()

        tables.init(connection)
        app.listen(3000, () => console.log('servidor ejecutando'))
    }

}))



