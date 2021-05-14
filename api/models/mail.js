const nodemailer = require('nodemailer')

const configMailProduct = () => ({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    secure: true
})

const configMailTest = (accountTest) => ({
    host: 'smtp.ethereal.email',
    auth: accountTest
})

async function createConfigMail() {
    if (process.env.NODE_ENV === 'production') {
        return configMailProduct
    } else {
        const accountTest = await nodemailer.createTestAccount()
        return configMailTest(accountTest)
    }
}

class Mail {

    async sendMail() {
        const configMail = await createConfigMail();
        const transport = nodemailer.createTransport(configMail)
        const info = await transport.sendMail(this)

        if(process.env.NODE_ENV !== 'production'){
            console.log('URL: ' + nodemailer.getTestMessageUrl(info));
        }
    }
}

class VerifyMail extends Mail {

    constructor(login) {
        super()
        this.from = '"Ansa" noreply@ansa.com.br'
        this.to = login.mail
        this.subject = 'Mail Verify'
        this.text = `Hello, verify your mail in the link in the right: ${address}`
        this.html = `<h1>Hello<h1>, verify your mail in the link in the right: <a href="${address}">${address}</a>`
    }
}



module.exports = { VerifyMail }