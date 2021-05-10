const customExpress = require('./vendor/config/customExpress')
const connection = require('./vendor/infraestrutura/database/connection')
const tables = require('./vendor/infraestrutura/database/tables')

connection.connect((error => {

    if (error) {
        console.log(error)
    } else {
        const app = customExpress()

        tables.init(connection)
        app.listen(3000, () => console.log('servidor ejecutando'))
    }

}))



