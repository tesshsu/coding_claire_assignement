require('dotenv').config();
const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY,
);

// Function to send email
function sendEmail(toEmail, subject, textContent, htmlContent) {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [{
      From: {
        Email: 'tess.hsu@gmail.com',
        Name: 'Sender'
      },
      To: [{
        Email: toEmail,
        Name: 'Recipient' // Optional
      }],
      Subject: subject,
      TextPart: textContent,
      HTMLPart: htmlContent
    }]
  });

  return request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}

module.exports = { sendEmail };