const knex = require('../db/connection');

function list() {
  return knex('movies').select('*');
}

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

function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

function getTheatersShowingMovie(movieId) {
  return knex('movies')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .join('theaters', 'theaters.theater_id', 'movies_theaters.theater_id')
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
    .andWhere('movies.movie_id', movieId);
}

module.exports = {
  read,
  list,
  getMoviesShowing,
  getTheatersShowingMovie,
};
