const request = require('request');
let moviesMetaData = [];

let images = [
  'https://occ-0-306-2218.1.nflxso.net/art/74fe5/967c585c9a187c334f96f04d58d9047403674fe5.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/dca5d/3988988ffe080763af38a3b8fb771edd1c6dca5d.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/df5d7/b11ddc0d897dcaabdb81fa3973c8466e772df5d7.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/6e6ea/69f797aa8b1a674a65fb189f1a1c4003e8d6e6ea.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/00bd2/2933822cb51d328ea44acd272216f5e098c00bd2.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/9de57/5419b8a20c3436b333f07f86cc9a15db2df9de57.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/9366e/b8b39e15f9cdaa6758dd734ee8fc72637ca9366e.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/30f62/75129da56285109461e5b418b3c0e51bb9830f62.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/319fa/0e2019ee7b46674fefeb3990f90ab057808319fa.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/5128d/d1ef3a354a657a393fe1482885094c042465128d.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/38e3e/a02d507b27573e196fe1da65f7addc24c7e38e3e.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/e1d73/53f0715aad2135e38782c79879c5567f8f0e1d73.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/2fb39/6f708c8a616ab18a78db303d3df192276562fb39.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/b8d38/04307608c592aba35ba4ef223034a360d97b8d38.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/46e7f/9dd7fc064cad183b8c399a2def11390ee1946e7f.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/edec3/3b40d2cfa6a38cf970b29787c1af629f404edec3.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/2fb39/6f708c8a616ab18a78db303d3df192276562fb39.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/5bc60/10f16a89300c84ec95fc77f082b0b2a808c5bc60.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/6366e/21439e1eb45009aa8fab56656cc33c5184a6366e.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/b8d38/04307608c592aba35ba4ef223034a360d97b8d38.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/b340a/16450a0578df67c7b1fb3cde55f1482b6f4b340a.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/46e7f/9dd7fc064cad183b8c399a2def11390ee1946e7f.jpg',
  'https://occ-0-306-2218.1.nflxso.net/art/edec3/3b40d2cfa6a38cf970b29787c1af629f404edec3.jpg',
];

let movieCounter = 0;

function start() {
  request('http://localhost:7999/')
    .on('data', function(data) {
      //console.log(data.toString('utf-8'));

      //console.log("data: "+data);

      let obj;

      try {
        obj = JSON.parse(data.toString('utf-8'));
      } catch (e) {
        console.error(e);
        return;
      }

      //console.log("data: "+data);

      let current = moviesMetaData.find(movie => {
        return movie.movieId == obj.movieId;
      });

      if (current) {
        current.totalRating += obj.rating;
        current.hits += 1;
        current.averageRating = current.totalRating / current.hits;
      } else {
        let newObj = {};
        newObj.movieId = obj.movieId;
        newObj.totalRating = obj.rating;
        newObj.hits = 1;
        newObj.averageRating = newObj.totalRating / newObj.hits;

        if (movieCounter <= 22) {
          newObj.imgSrc = images[movieCounter];
        } else {
          newObj.imgSrc =
            'https://faygoluvers.net/v5/wp-content/themes/original/images/no_image_available_s_large.jpg';
        }

        moviesMetaData.push(newObj);

        movieCounter++;
      }
      //console.log(JSON.stringify(moviesMetaData));
    })
    .on('error', error => {
      console.log('Could not connect to streaming server');
    });
}

function getMoviesData() {
  return moviesMetaData || [];
}

function getStats() {
  let obj = {};
  obj.totalMovies = moviesMetaData.length;

  let totalRatings;
  totalRatings = moviesMetaData.reduce(function(a, b) {
    return a + b.hits;
  }, 0);

  obj.totalRatings = totalRatings;

  obj.averageRating =
    moviesMetaData.reduce(function(a, b) {
      return a + b.totalRating;
    }, 0) / totalRatings;

  return obj;
}

module.exports = {
  start,
  getMoviesData,
  getStats,
};
