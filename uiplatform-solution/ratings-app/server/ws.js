const url = require('url');
const WebSocket = require('ws');
const streamingServer = require('./movies');

const sockets = new Set();

module.exports = server => {
  const wss = new WebSocket.Server({ server });

  function sendMovies(ws) {
    const stats = streamingServer.getStats();
    ws.send(JSON.stringify({ stats }));
  }

  function sendFilteredMovies(ws, movieIds) {
    const movies = streamingServer.getMoviesData().filter(movie => {
      return movieIds.includes(movie.movieId);
    });

    ws.send(JSON.stringify({ movies }));
  }

  wss.on('connection', function connection(ws, req) {
    console.log('ws client connected');

    sockets.add(ws);
    ws.on('close', () => sockets.delete(ws));
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
      try {
        const data = JSON.parse(message);
        if (data.movieIds) {
          sendFilteredMovies(ws, data.movieIds);
        }
      } catch (e) {}
    });
    ws.send('Hello from server!!!');

    const interval = setInterval(() => {
      sockets.forEach(socket => {
        sendMovies(socket);
      });
    }, 1000);
  });
};
