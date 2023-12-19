const nodemailer = require("nodemailer");
const transportador = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

module.exports = transportador;
