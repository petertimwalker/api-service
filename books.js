const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const author = req.query.author;
  const apiKey = process.env.API_KEY;
  try {
    const books = await fetchBooks(author, apiKey);
    res.json(books);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
});

router.get('/book', async (req, res) => {
  const bookId = req.query.bookId;
  const apiKey = process.env.API_KEY;
  console.log(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`,
  );
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`,
    );
    res.json(response.data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching book details' });
  }
});

function fetchBooks(author, apiKey) {
  let request = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${apiKey}&orderBy=newest&maxResults=40`;

  return axios
    .get(request)
    .then((response) => response.data.items)
    .catch((error) =>
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      ),
    );
}

module.exports = router;
