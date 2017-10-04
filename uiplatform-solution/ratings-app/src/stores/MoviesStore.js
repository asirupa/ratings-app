import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

export default function configureStore(initialState = {}) {
  if (process.env.NODE_ENV === 'production') {
    return createStore(reducers, initialState, applyMiddleware(thunk));
  } else {
    return createStore(reducers, initialState, applyMiddleware(thunk, logger));
  }
}
