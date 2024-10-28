const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // 정적 파일 제공

io.on('connection', (socket) => {
  console.log(`사용자 연결됨: ${socket.id}`);

  socket.on('message', (msg) => {
    io.emit('message', `${socket.id}: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log(`사용자 연결 해제: ${socket.id}`);
  });
});

// Step 1-2: Namespace(네임스페이스) 추가
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
    console.log('Chat 네임스페이스에 연결됨:', socket.id);

    socket.on('message', (msg) => {
        chatNamespace.emit('message', `${socket.id}: ${msg}`);
    });

    // Step 1-3: Room(채팅방) 추가
    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.to(room).emit('message', `${socket.id}가 ${room}에 참가했습니다.`);
    });

    // Step 1-4: 귓속말 기능 추가
    socket.on('whisper', ({ to, message }) => {
        console.log('whisper > ',to, message);
        io.to(to).emit('message', `귓속말: ${message}`);
    });
});

const newsNamespace = io.of('/news');
newsNamespace.on('connection', (socket) => {
    console.log('News 네임스페이스에 연결됨:', socket.id);

    socket.on('message', (msg) => {
        newsNamespace.emit('message', `${socket.id}: ${msg}`);
    });

    // Step 1-3: Room(채팅방) 추가
    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.to(room).emit('message', `${socket.id}가 ${room}에 참가했습니다.`);
    });

    // Step 1-4: 귓속말 기능 추가
    socket.on('whisper', ({ to, message }) => {
        io.to(to).emit('message', `귓속말: ${message}`);
    });
      
});

server.listen(PORT, () => console.log(`>>> http://localhost:${PORT}`));