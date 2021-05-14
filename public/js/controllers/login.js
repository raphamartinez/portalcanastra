import {Connection} from "../services/connection.js"
import {View} from "../views/login.js"

Connection.GetService("/login").then(response => {
    View.dashboard(response, false)
})