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
async function read(_req, res, _next) {
  const data = res.locals.foundMovie;
  res.json({ data });
}
//GET /movies/:movieId/theaters
async function getTheatersPlayingMovie(_req, res, _next) {
  const { movieId } = res.locals;
  const data = await moviesService.getTheatersShowingMovie(movieId);
  res.json({ data });
}
// GET /movies/:movieId/reviews
async function listReviewsByMovieId(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.listReviewsByMovieId(
    Number.parseInt(movieId, 10)
  );
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  getTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(getTheatersPlayingMovie),
  ],
  listReviewsByMovieId: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviewsByMovieId),
  ],
  list: asyncErrorBoundary(list),
};
