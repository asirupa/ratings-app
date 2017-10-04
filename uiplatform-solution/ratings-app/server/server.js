const path = require('path');
const React = require('react');
const fs = require('fs');
const createStore = require('redux').createStore;
const Provider = require('react-redux').Provider;
const renderToString = require('react-dom/server').renderToString;
const MoviesStore = require('../src/stores/MoviesStore').default;
const MoviesContainer = require('../src/containers/MoviesContainer').default;
const moviesServer = require('./movies');

module.exports = function server(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html', err);
      return res.status(404).end();
    }
    const stats = moviesServer.getStats();
    const store = MoviesStore({ stats });

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <MoviesContainer />
      </Provider>
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    const RenderedApp = htmlData
      .replace('@html@', html)
      .replace(
        '@state@',
        JSON.stringify(preloadedState).replace(/</g, '\\u003c')
      );

    console.log(RenderedApp);
    res.send(RenderedApp);
  });
};
