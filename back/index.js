require('dotenv').config();
const { authenticateJWT, createJWT } = require('./auth');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.DEFAULT_PORT || 3000;
const states = require('./states');

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
      const { to, subject, body } = req.body;
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

app.use(express.static(path.join(__dirname, '..', 'front')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});