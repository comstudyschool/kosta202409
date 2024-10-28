const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const router = express.Router();
const socketio = require('socket.io');

app.use(express.static('public'));

app.use('/', router);
const server = http.createServer(app);
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = socketio(server);
io.on('connection', (socket)=>{
    console.log('>>> 외부 접속 완료!');
});