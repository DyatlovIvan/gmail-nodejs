const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')
const {_logFunc} = require("nodemailer/lib/shared");

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'dyatlovTest@gmail.com',
        pass: 'dyatlovTest111'
    }
})

app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body
    console.log('OK')
    let info = await transporter.sendMail({
        from: 'PROFILE',
        to: 'dyatlovTest@gmail.com',
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
app.listen(3010, function () {
    console.log('well')
})