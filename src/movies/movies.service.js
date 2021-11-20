const knex = require('../db/connection');

function list() {
  return knex('movies').select('*');
}

function getMoviesShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select(
      'm.movie_id',
      'm.title',
      'm.runtime_in_minutes',
      'm.rating',
      'm.description',
      'm.image_url'
    )
    .where('mt.is_showing', true)
    .groupBy('m.movie_id');
}

function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

function getTheatersShowingMovie(movieId) {
  return knex('movies_theaters as mt')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('*')
    .where({ movie_id: movieId, is_showing: true });
}

module.exports = {
  read,
  list,
  getMoviesShowing,
  getTheatersShowingMovie,
};
