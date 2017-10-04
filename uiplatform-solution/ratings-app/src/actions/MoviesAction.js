import api from '../api/index.js';
import * as Constants from '../utils/constants';

function getFetchXhr(category, page = 1, size) {
  let xhr;
  switch (category) {
    case Constants.POPULAR:
      xhr = api.fetchPopular(page, size);
      break;
    case Constants.WORST:
      xhr = api.fetchWorst(page, size);
      break;
    case Constants.ALL:
    default:
      xhr = api.retrieveMovies(page, size);
  }

  return xhr;
}

export function fetchMovies(category = Constants.ALL) {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_MOVIE_PENDING', category });
    const state = getState();
    const { size } = state.movies;

    return getFetchXhr(category, 1, size)
      .then(data => {
        dispatch({ type: 'FETCH_MOVIE_FULFILLED', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_MOVIE_REJECTED', error });
      });
  };
}

export function fetchNext() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_NEXT_PENDING' });

    const state = getState();
    const { category, page, size } = state.movies;
    return getFetchXhr(category, page + 1, size)
      .then(data => {
        dispatch({ type: 'FETCH_NEXT_FULFILLED', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_NEXT_REJECTED', error });
      });
  };
}

export function fetchStats() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_STATS_PENDING' });
    const state = getState();
    return api
      .fetchStats(state)
      .then(data => {
        dispatch({ type: 'FETCH_STATS_FULFILLED', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_STATS_REJECTED', error });
      });
  };
}

export function pushData({ stats }) {
  return { type: 'NEW_STATS_DATA', stats };
}

export function pushMovies({ movies }) {
  return { type: 'NEW_MOVIES_DATA', movies };
}
