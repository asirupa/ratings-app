export function fetchMovies(page = 1, RESULTS_SIZE) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3001/api/retrieve-movies?results=${RESULTS_SIZE}&page=${page}`
    )
      .then(response => {
        if (response.ok) {
          return resolve(response.json());
        }
        throw Error('Movies fetch failed.');
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function fetchStats() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/retrieve-stats')
      .then(response => {
        if (response.ok) {
          return resolve(response.json());
        }
        throw Error('Movies stats failed.');
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function fetchPopular(page = 1, RESULTS_SIZE) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3001/api/popular-movies?results=${RESULTS_SIZE}&page=${page}`
    )
      .then(response => {
        if (response.ok) {
          return resolve(response.json());
        }
        throw Error('Popular movies fetch failed.');
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function fetchWorst(page, RESULTS_SIZE) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3001/api/worst-movies?results=${RESULTS_SIZE}&page=${page}`
    )
      .then(response => {
        if (response.ok) {
          return resolve(response.json());
        }
        throw Error('Most Unpopular movies fetch failed.');
      })
      .catch(error => {
        reject(error);
      });
  });
}

const Api = {
  retrieveMovies: fetchMovies,
  fetchStats,
  fetchPopular,
  fetchWorst,
};

export default Api;
