const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/errorHandler");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});

const sendMail = async ({ email, subject, text, html }, next) => {
  const mailOptions = {
    from: {
      name: "Rohit",
      address: process.env.SMTP_EMAIL,
    },
    to: email,
    subject: subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    next();
  } catch (error) {
    return next(new ErrorHandler("Internal Error", 500));
  }
};

module.exports = sendMail;
