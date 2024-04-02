const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Test API');
});

app.post('/emails', (req, res) => {
    const { to, subject, body } = req.body;
    console.log(`Email received: To: ${to}, Subject: ${subject}, Body: ${body}`);
    res.sendStatus(200);
  });
  

app.post('/emailSMTP', async(req, res) => {
    const {to, subject, body} = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "testaccomptegit@gmail.com",
          pass: "vJcPTF9MCKNU"
        },
      });

    try {
        await transporter.sendMail({
            from: '"Test assign Claire English" <testaccomptegit@gmail.com>', // sender address
            to,
            subject,
            text: body,
        });
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});