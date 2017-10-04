import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import MoviesContainer from './containers/MoviesContainer';
import MoviesStore from './stores/MoviesStore';
import './App.css';
import './containers/MovieContainer.css';
import './components/Movies.css';
import './components/Stats.css';
import './components/Movie.css';
import { render } from 'react-dom';
import React from 'react';

const store = MoviesStore(window.__PRELOADED_STATE__ || {});
delete window.__PRELOADED_STATE__;

render(
  <Provider store={store}>
    <MoviesContainer />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
