const openvpnmanager = require('node-openvpn');
const mysql = require('mysql2');



class Vpn {

  async connect() {

    console.log('chegou aqui')

    const opts = {
      host: process.env.VPN_HOST,
      port: process.env.VPN_PORT,
      timeout: 1500,
      logpath: 'log.txt' //optional write openvpn console output to file, can be relative path or absolute
    };
    console.log(opts)

    const auth = {
      user: process.env.VPN_USER,
      pass: process.env.VPN_PASSWORD,
    };
    console.log(auth)

    const openvpn = openvpnmanager.connect(opts)
    console.log(openvpn)

    openvpn.on('connected', () => {
      openvpnmanager.authorize(auth);
      console.log("Connected to VPN successfully...");

      const connection = mysql.createConnection({
        user: process.env.DBVPS_USER,
        host: process.env.DBVPS_HOST,
        database: process.env.DBVPS_NAME,
        password: process.env.DBVPS_PASSWORD,
        port: process.env.DBVPS_PORT
      })

      connection.connect((error => {

        if (error) {
          console.log(error)
        } else {
          console.log('banco conectado')
        }
      }))
      openvpnmanager.disconnect();

      // emits on disconnect
      openvpn.on('disconnected', () => {
        // finally destroy the disconnected manager 
        openvpnmanager.destroy()
      });

    });

  }
}

module.exports = new Vpn

