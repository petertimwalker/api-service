const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Store your API key securely in an environment variable
const API_KEY = process.env.API_KEY || 'API_KEY not defined';

app.get('/api/key', (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

