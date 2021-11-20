const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
// validation middleware
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  console.log(reviewId);
  const review = await reviewsService.read(reviewId);
  console.log(review);
  if (review.length) {
    res.locals.reviewId = reviewId;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}
// DELETE /reviews/:reviewId
async function destroy(_req, res, _next) {
  const { reviewId } = res.locals;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
