const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const CLIENT_ID = '15523683173-n9c2bbbcril6qg1hbbfdfgv5rdeblf7s.apps.googleusercontent.com'
const CLIENT_SECRET = 'J0zpT2X85MV_hu3Injt6TYos'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04RfTFA1MQL1uCgYIARAAGAQSNgF-L9IrP9EGRWncHNcmkgbdZgmsm2QYAqf-pe1CJYtK-fqLM0KaVgwDsxIx-8ECXLha24QBBw'

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'fideliswaweru19@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions = {
            from: 'fidelis <fideliswaweru19@gmail.com>',
            to: "fideliswairimu19@gmail.com",
            subject: 'Hello there',
            text: "Hello from gmail.nodemailer",
            html: "<Hello from gmail.nodemailer",

         } ;
   const result =await transport.sendMail(mailOptions)
    return result
} catch (error) {
        return error
    }
}
sendMail()
.then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));