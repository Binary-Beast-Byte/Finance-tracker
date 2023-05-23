const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const credentials = {
    host: 'mail.everestsound.com',
    port: 465,
    secure: true,
    auth: {
        user: "noreply@everestsound.com",
        pass: "PD*vTCchgF6b"
    }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {
    const contacts = {
        from: "noreply@everestsound.com",
        to : to ,
    }
    const email = Object.assign({}, content, contacts)
    await transporter.sendMail(email)

}