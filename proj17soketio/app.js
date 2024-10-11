const express = require('express');
const app = express();
const countRouter = require('./routes/CountRouter');

app.use('/', countRouter);

module.exports = app;