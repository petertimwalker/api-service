const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const booksRouter = require('./books');
const cors = require('cors');
const isProduction = process.env.NODE_ENV === 'production';
const API_KEY = process.env.API_KEY || 'API_KEY not defined';
const PORT = isProduction ? 443 : 3001;
const allowedOrigins = ['https://peterwalker.xyz'];

if (isProduction) {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          return callback(new Error('Origin not specified'), false);
        }
        if (!allowedOrigins.includes(origin)) {
          return callback(new Error('Not allowed by CORS'), false);
        }
        return callback(null, true);
      },
    }),
  );
  createHTTPSServer();
} else {
  app.use(cors());
  createHTTPServer();
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`Request origin: ${origin}`);
  next();
});

// Route for the root URL '/'
app.get('/', (req, res) => {
  res.send('Hi from api.peterwalker.xyz');
});

// Route for '/api/key'
app.get('/api/key', (req, res) => {
  console.log('API key requested');
  res.json({ apiKey: API_KEY });
});

app.use('/api/books', booksRouter);

function createHTTPServer() {
  const http = require('http');

  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
  });
}

function createHTTPSServer() {
  const https = require('https');
  const fs = require('fs');

  const options = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/api.peterwalker.xyz/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/api.peterwalker.xyz/fullchain.pem',
    ),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
  });
}
