const sendEmail = require('@sendgrid/mail')
sendEmail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = sendEmail;