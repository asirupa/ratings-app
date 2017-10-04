const express = require('express');
const router = express.Router();

const streamingServer = require('../movies');

router.get('/popular-movies', (req, res) => {
  let page = parseInt(req.query.page);
  let results = parseInt(req.query.results);

  const moviesMetaData = streamingServer.getMoviesData() || [];
  const data = moviesMetaData.filter(movie => {
    return (
      movie.hits > 500 &&
      Math.floor(movie.totalRating / movie.hits * 10) / 10 >= 3.0
    );
  });

  const result = sliceResults(data, page, results);
  return res.send(result || []);

  res.send(result || []);
});

router.get('/worst-movies', (req, res) => {
  let page = parseInt(req.query.page);
  let results = parseInt(req.query.results);

  const moviesMetaData = streamingServer.getMoviesData() || [];
  const data = moviesMetaData.filter(movie => {
    return (
      movie.hits > 500 &&
      Math.floor(movie.totalRating / movie.hits * 10) / 10 < 3.0
    );
  });

  const result = sliceResults(data, page, results);
  return res.send(result || []);
});

router.get('/retrieve-movies', (req, res) => {
  let page = parseInt(req.query.page);
  let results = parseInt(req.query.results);

  const result = sliceResults(
    streamingServer.getMoviesData() || [],
    page,
    results
  );
  res.send(result);
});

router.get('/retrieve-stats', (req, res) => {
  let obj = streamingServer.getStats() || {};
  res.send(obj);
});

function sliceResults(data, page, size) {
  let start = (page - 1) * size;
  let end = start + size;
  return data.slice(start, end);
}

module.exports = router;
