const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// validation middleware
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movieId = movieId;
    res.locals.foundMovie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

// route handlers
// GET /movies
async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing === 'true') {
    const data = await moviesService.getMoviesShowing();
    return res.json({ data });
  }
  const data = await moviesService.list();
  res.json({ data });
}

async function read(req, res, next) {
  const data = res.locals.foundMovie;
  res.json({ data });
}

async function getTheatersPlayingMovie(req, res, next) {
  const { movieId } = res.locals;
  const data = await moviesService.getTheatersShowingMovie(movieId);
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  getTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(getTheatersPlayingMovie),
  ],
  list: asyncErrorBoundary(list),
};
