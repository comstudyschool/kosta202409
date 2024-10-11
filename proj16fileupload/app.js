const express = require('express');
const app = express();
const shopRouter = require('./routes/shop');
const path = require('path');

app.use("/", shopRouter);
module.exports = app;