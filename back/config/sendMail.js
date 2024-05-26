const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'r1884150@gmail.com',
    pass: 'udtckscnuptkyfla'
  }
})

const mailOptions = {
  from: {
    name: "Rohit",
    address: 'r1884150@gmail.com'
  },
  to: 'r.rohitpatil12@gmail.com',
  subject: "Hello from me",
  text: 'hello! how are you?',
  html: '<h1>Hello from me</h1>'
}

const sendMail = async() => {
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email send',info)
  } catch (error) {
    console.log(erro)
  }
}

sendMail()



