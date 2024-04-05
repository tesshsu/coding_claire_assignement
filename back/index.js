require('dotenv').config();
const { authenticateJWT, createJWT } = require('./auth');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.DEFAULT_PORT || 3000;
const states = require('./states');
const { sendEmail } = require('./sendMail');

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Test API');
});

app.get('/states', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const filteredStates = states
                        .filter(state => state.toLowerCase().includes(query))
                        .sort()
                        .slice(0, 8);
  
  res.json(filteredStates);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simplified authentication: in a real application, you'd check the credentials
  if (username === 'admin' && password === 'password') {
      const token = createJWT({ username });
      res.json({ token });
  } else {
      res.status(401).send('Unauthorized');
  }
});

app.post('/emails', authenticateJWT, (req, res) => {
  try {
      const { to, subject, textBody, htmlPart } = req.body;
      if (!to || !subject || !textBody || !htmlPart) {
        throw new Error('One or more required fields are missing');
      }

      // Send mail through Google mail service
      sendEmail(to, subject, textBody, htmlPart)
        .then(() => {
          res.status(200).send('Email sent successfully');
        })
        .catch((error) => {
          console.error('Error sending email:', error.message);
          res.status(500).send('Internal Server Error');
        });
  } catch (error) {
      console.error('Error in /emails route:', error.message);
      res.status(400).send('Bad request: ' + error.message);
  }
});

app.use(express.static(path.join(__dirname, '..', 'front')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});