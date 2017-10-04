const http = require('http');
const app = require('./app');
const ws = require('./ws');
const streamingServer = require('./movies');
const port = 3001;

const server = http.createServer(app);
ws(server);

server.listen(port, () => {
  streamingServer.start();
  console.log('Listening on %d', server.address().port);
});

server.on('error', error => {
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires more privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
