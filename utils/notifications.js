const nodemailer = require("nodemailer");
require("dotenv").config("../.env");

const sender = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: sender,
    pass: pass,
  },
});

exports.sendEmail = ({ email, subject, html }) => {
  transport
    .sendMail({
      from: sender,
      to: email,
      subject: subject,
      html: html,
    })
    .catch((err) => console.log(err));
};

//Notifications for now is based on emails
exports.notify = ({ user, message }) => {
  transport
    .sendMail({
      from: sender,
      to: user.email,
      subject: "Your URL status has been changed",
      html: `<p>${message}</p>`,
    })
    .catch((err) => console.log(err));
};
