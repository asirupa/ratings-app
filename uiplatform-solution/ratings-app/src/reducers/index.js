import { combineReducers } from 'redux';
import MoviesReducer from './MoviesReducer';
import StatsReducer from './StatsReducer';

export default combineReducers({
  movies: MoviesReducer,
  stats: StatsReducer,
});
