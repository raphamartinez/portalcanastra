const nodemailer = require('nodemailer')

const configMailProduct = () => ({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

const configMailTest = (accountTest) => ({
    host: 'smtp.ethereal.email',
    auth: accountTest
})

async function createConfigMail() {
    if (process.env.NODE_ENV !== 'production') {
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

        if (process.env.NODE_ENV !== 'production') {
            console.log('URL: ' + nodemailer.getTestMessageUrl(info));
        }
    }
}

class VerifyMail extends Mail {

    constructor(login) {
        super()
       
    }
}

class ResetPasswordMail extends Mail {

    constructor(mailenterprise, token) {
        super()
        
    }
}


class AttachmentBi extends Mail {

    constructor(title, body, recipients, cc, bcc, attachment) {
        super()
        
    }
}


module.exports = { VerifyMail, ResetPasswordMail, AttachmentBi }