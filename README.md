# WeLoveMovies

This project is from [Thinkful](https://www.thinkful.com/bootcamp/web-development/) and is designed to test the student's ability to both build complex servers and access data through a database. It is a REST API built using Node.js, Express.js and uses Knex.js to query a postgresql database.

## Tech Stack

**Server:** Node, Express, Knex

| Routes                        | Response                                                               |
| ----------------------------- | ---------------------------------------------------------------------- |
| GET /movies                   | Lists all movies.                                                      |
| GET /movies?is_showing=true   | Lists all movies where is_showing is true.                             |
| GET /movies/:movieId          | Reads one single movie depending on the url param.                     |
| GET /movies/:movieId/theaters | Lists all theaters where the movie is playing .                        |
| GET /movies/:movieId/reviews  | Lists all reviews for the movie including critic details.              |
| DELETE /reviews/:reviewId     | Deletes a review depending on the url param.                           |
| PUT /reviews/:reviewId     | Updates a review. "content" and "score" keys are required in json body.|
| GET /theaters                 | Lists all theaters and movies playing at each theatre.                 |
