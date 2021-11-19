const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
// validation middleware
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.foundMovie = movie;
    res.locals.movieId = movieId;
    return next();
  }
  next({ message: 'Movie cannot be found.', status: 404 });
}

// route handlers
// GET /movies
async function list(req, res, _next) {
  const { is_showing } = req.query;
  if (is_showing === 'true') {
    const data = await moviesService.getMoviesShowing();
    return res.json({ data });
  }
  const data = await moviesService.list();
  res.json({ data });
}
//GET /movies/:movieId
async function read(req, res, next) {
  const data = res.locals.foundMovie;
  res.json({ data });
}
//GET /movies/:movieId/theaters
async function readTheaterWhereMovieIsPlaying(req, res, _next) {
  const { movieId } = res.locals;
  const data = await moviesService.getTheatersMovieIsPlaying(movieId);
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  readTheaterWhereMovieIsPlaying: [
    asyncErrorBoundary(movieExists),
    readTheaterWhereMovieIsPlaying,
  ],
  list: asyncErrorBoundary(list),
};
