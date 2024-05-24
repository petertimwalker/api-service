const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 443;

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Store your API key securely in an environment variable
const API_KEY = process.env.API_KEY || 'API_KEY not defined';

// Middleware to log requests to the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route for the root URL '/'
app.get('/', (req, res) => {
  res.send('Hi from api.peterwalker.xyz');
});

// Route for '/api/key'
app.get('/api/key', (req, res) => {
  res.json({ apiKey: API_KEY });
});

// HTTPS options
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.peterwalker.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.peterwalker.xyz/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/api.peterwalker.xyz/chain.pem')
};

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});

