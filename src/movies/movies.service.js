const knex = require('../db/connection');

function list() {
  return knex('movies').select('*');
}

function getMoviesShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('*')
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

function getMovieReviews(movieId) {
  return knex('movies as m')
    .join('reviews as r', 'r.movie_id', 'm.movie_id')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select(
      'r.review_id',
      'm.movie_id',
      'c.preferred_name',
      'c.surname',
      'c.organization_name'
    )
    .distinct('r.movie_id')
    .where({ 'm.movie_id': movieId });
}

module.exports = {
  read,
  list,
  getMoviesShowing,
  getTheatersShowingMovie,
  getMovieReviews,
};
