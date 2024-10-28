const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;
const router = express.Router();
const socketio = require('socket.io');

app.use(express.static('public'));

const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (socket)=>{
    console.log('>>> 외부 접속 완료!');
});

// /chat 네임스페이스
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('Chat 네임스페이스에 클라이언트 연결됨:', socket.id);

  socket.on('message', (msg) => {
    console.log('Chat 메시지:', msg);
    chatNamespace.emit('message', msg); // 모든 클라이언트에게 메시지 전송
  });
});

// /news 네임스페이스
const newsNamespace = io.of('/news');
newsNamespace.on('connection', (socket) => {
  console.log('News 네임스페이스에 클라이언트 연결됨:', socket.id);

  socket.on('update', (msg) => {
    console.log('News 업데이트:', msg);
    newsNamespace.emit('update', msg); // 모든 클라이언트에게 업데이트 전송
  });
});

app.use('/', router);
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));