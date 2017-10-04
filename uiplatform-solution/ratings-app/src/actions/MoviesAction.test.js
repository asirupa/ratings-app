import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMovies } from './MoviesAction';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as Constants from '../utils/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates FETCH_MOVIE_PENDING when fetching movies', done => {
    const movies = [
      {
        movieId: 128,
        totalRating: 549,
        hits: 195,
        averageRating: 2.8153846153846156,
        imgSrc:
          'https://occ-0-306-2218.1.nflxso.net/art/74fe5/967c585c9a187c334f96f04d58d9047403674fe5.jpg',
      },
      {
        movieId: 182,
        totalRating: 477,
        hits: 164,
        averageRating: 2.9,
        imgSrc:
          'https://occ-0-306-2218.1.nflxso.net/art/dca5d/3988988ffe080763af38a3b8fb771edd1c6dca5d.jpg',
      },
      {
        movieId: 121,
        totalRating: 555,
        hits: 185,
        averageRating: 3,
        imgSrc:
          'https://occ-0-306-2218.1.nflxso.net/art/df5d7/b11ddc0d897dcaabdb81fa3973c8466e772df5d7.jpg',
      },
    ];

    fetchMock
      .get(
        'http://localhost:3001/api/retrieve-movies?results=20&page=1',
        () => {
          return {
            status: 200,
            body: JSON.stringify(movies),
          };
        }
      )
      .catch(unmatchedUrl => {
        console.log(unmatchedUrl);
      });

    const expectedActions = [
      { category: 'ALL', type: 'FETCH_MOVIE_PENDING' },
      { type: 'FETCH_MOVIE_FULFILLED', payload: movies },
    ];

    const store = mockStore({ movies: { data: [], size: 20 } });

    return store.dispatch(fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
