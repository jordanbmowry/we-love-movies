# WeLoveMovies

This project is is a REST API built using Node.js, Express.js and uses Knex.js to query a postgresql database. It displays movie details.

## Live Demo

[WeLoveMovies](https://we-love-movies-jguc.onrender.com/movies)

## Tech Stack

**Server:** Node, Express, Knex

| Routes                        | Response                                                                |
| ----------------------------- | ----------------------------------------------------------------------- |
| GET /movies                   | Lists all movies.                                                       |
| GET /movies?is_showing=true   | Lists all movies where is_showing is true.                              |
| GET /movies/:movieId          | Reads one single movie depending on the url param.                      |
| GET /movies/:movieId/theaters | Lists all theaters where the movie is playing .                         |
| GET /movies/:movieId/reviews  | Lists all reviews for the movie including critic details.               |
| DELETE /reviews/:reviewId     | Deletes a review depending on the url param.                            |
| PUT /reviews/:reviewId        | Updates a review. "content" and "score" keys are required in json body. |
| GET /theaters                 | Lists all theaters and movies playing at each theatre.                  |

## Run Locally

Fork the project

Clone the project

```bash
  git clone https://github.com/jordanbmowry/we-love-movies.git
```

Go to the project directory

```bash
  cd we-love-movies
```

Install dependencies

```bash
  npm install
```

create .env file

```bash
  touch .env
```

connect to your postgresql db in .env file

```.env
DEVELOPMENT_DATABASE_URL=postgres://phrawv:QTHOwQKmpVDvEwwG-Vpx9jZsG98EOS@batyr.db.elephantsql.com/example1
PRODUCTION_DATABASE_URL=postgres://phrawv:QTHOwQKmpVDvEwwG-Vpx9jZsG98EOS@batyr.db.elephantsql.com/example2
```

run migrations

```bash
  npx knex migrate:latest
```

seed data

```bash
  npx knex seed:run
```

run server

```bash
  npm start
```
