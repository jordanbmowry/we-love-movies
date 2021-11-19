const knex = require('../db/connection');
// GET /movies/:movieId
function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}
// GET /movies
function list() {
  return knex('movies').select('*');
}
// GET /movies?is_showing=true
function getMoviesShowing() {
  return knex('movies')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .select(
      'movies.movie_id',
      'movies.title',
      'movies.runtime_in_minutes',
      'movies.rating',
      'movies.description',
      'movies.image_url'
    )
    .where('movies_theaters.is_showing', true)
    .groupBy('movies.movie_id');
}
//GET /movies/:movieId/theaters
function getTheatersMovieIsPlaying(movieId) {
  return knex('movies')
    .join('movie_theaters', 'movies.movie_id', 'movie_theaters.movie_id')
    .join('theaters', 'theaters.theater_id', 'movie_theaters.theater_id')
    .select(
      'theaters.theater_id',
      'theaters.name',
      'theaters.address_line_1',
      'theaters.address_line_2',
      'theaters.city',
      'theaters.state',
      'theaters.zip',
      'movies_theaters.is_showing',
      'movies.movie_id'
    )
    .where('movies_theaters.is_showing', true)
    .where({ movie_id: movieId })
    .groupBy('movies.movie_id');
}

module.exports = {
  read,
  list,
  getMoviesShowing,
  getTheatersMovieIsPlaying,
};
