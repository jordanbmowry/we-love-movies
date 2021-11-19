if (process.env.USER) require('dotenv').config();
const express = require('express');
const cors = require('cors');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');
const moviesRouter = require('./movies/movies.router');

const app = express();
app.use(cors());

app.use('/movies', moviesRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
