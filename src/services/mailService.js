const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Email error:', err.message);
    throw err;
  }
};
