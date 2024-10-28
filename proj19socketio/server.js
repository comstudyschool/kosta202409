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

io.on('connection', (socket) => {
  console.log('클라이언트 연결됨:', socket.id);

  // 클라이언트가 방에 참가할 때
  socket.on('joinRoom', (room) => {
    socket.join(room); // 방에 참가
    console.log(`${socket.id}가 ${room}에 참가했습니다.`);
    socket.to(room).emit('message', `${socket.id}가 ${room}에 참가했습니다.`);
  });

  // 특정 방에 메시지 전송
  socket.on('message', ({ room, message }) => {
    console.log(`방(${room})에서 메시지: ${message}`);
    io.to(room).emit('message', message); // 해당 방에 메시지 브로드캐스트
  });

  // 클라이언트가 연결 해제되었을 때
  socket.on('disconnect', () => {
    console.log('클라이언트 연결 해제됨:', socket.id);
  });
});

app.use('/', router);
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));