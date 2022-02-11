const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')
const {_logFunc} = require("nodemailer/lib/shared");

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smpt_login = process.env.SMTP_LOGIN || '---'
let smpt_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smpt_login,
        pass: smpt_password
    }
})

app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body
    console.log('OK')
    let info = await transporter.sendMail({
        from: 'PROFILE',
        to: smpt_login,
        subject: 'HR',
        html: `<b>Сообщение с портфолио</b>
                <div>name: ${name}</div>
                <div>email: ${email}</div>
                <div>${message}</div>`
    })


    res.send(req.body)

})
app.get('/', function (req, res) {
    res.send('Start')
})

let port = process.env.PORT || 3010

app.listen(port, function () {
    console.log('well')
})