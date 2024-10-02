const http = require("http");
const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();

app.set('port', 3001);
app.use(cors());

router.route('/').get( (req, res) => {
    console.log('User list');
    res.end("<h1>User list</h1>")
})

app.use('/', router);

module.exports = app;