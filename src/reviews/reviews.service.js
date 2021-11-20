const knex = require('../db/connection');
// For validation
function read(reviewId) {
  return knex('reviews').select('*').where({ review_id: reviewId });
}
// DELETE /reviews/:reviewId
function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  delete: destroy,
};
