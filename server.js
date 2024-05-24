const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Store your API key securely in an environment variable
const API_KEY = process.env.API_KEY || 'API_KEY not defined';

// Middleware to log requests to the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  console.log(`request from ${req}`);
  res.send('Hi from api.peterwalker.xyz');
});

app.get('/api/key', (req, res) => {
  console.log(`request from ${req}`);
  res.json({ apiKey: API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

