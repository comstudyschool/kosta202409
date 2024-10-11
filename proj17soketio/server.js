const http = require('http');
const express = require('express');
const cors = require('cors');

const countApp = require('./app');
const mainApp = express();

mainApp.use('/count', countApp);
mainApp.use(cors());
mainApp.use("/", express.static('public'));

const server = http.createServer(mainApp);
server.listen(3000, function() {
    console.log(`running on server with http://localhost:${3000}`);
});
