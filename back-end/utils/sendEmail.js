const { Resend } = require('resend')

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: 'Traveler Wallet <onboarding@resend.dev>',
    to: [options.email],
    subject: options.subject,
    html: `<p>${options.message}</p>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

module.exports = sendEmail;
