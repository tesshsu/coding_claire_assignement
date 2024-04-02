const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Test API');
});

app.post('/emails', (req, res) => {
    try {
      const { to, subject, body } = req.body
      if (!to || !subject || !body) {
        throw new Error('One or more required fields are missing');
      }

      console.log(`Email received: To: ${to}, Subject: ${subject}, Body: ${body}`);
      res.sendStatus(200);
    } catch (error) {
        console.error('Error in /emails route:', error.message);
        res.status(400).send('Bad request: ' + error.message);
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});