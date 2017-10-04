import * as Constants from '../utils/constants';

const initalState = {
  category: Constants.ALL,
  data: [],
  loading: true,
  error: null,
  page: 1,
  size: 20,
  done: false,
};

export default function MoviesReducer(state = initalState, action) {
  let data;
  switch (action.type) {
    case 'FETCH_MOVIE_PENDING':
      return {
        ...state,
        loading: true,
        page: 1,
        category: action.category || initalState.category,
        done: false,
      };
    case 'FETCH_MOVIE_FULFILLED':
      data = action.payload || [];
      return { ...state, loading: false, data, done: data.length < state.size };
    case 'FETCH_MOVIE_REJECTED':
      return { ...state, loading: false, error: action.error };

    case 'FETCH_NEXT_PENDING':
      return { ...state, loading: true };
    case 'FETCH_NEXT_FULFILLED':
      data = action.payload || [];
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        data: state.data.concat(data),
        done: data.length < state.size,
      };
    case 'FETCH_NEXT_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'NEW_MOVIES_DATA':
      const newMovies = action.movies.reduce((m, movie) => {
        m[movie.movieId] = movie;
        return m;
      }, {});

      const newData = state.data.map(d => {
        return {
          ...d,
          ...newMovies[d.movieId],
        };
      });
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
}
