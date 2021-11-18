if (process.env.USER) require('dotenv').config();
const express = require('express');
const cors = require('cors');

app.use(cors());
const app = express();

module.exports = app;
