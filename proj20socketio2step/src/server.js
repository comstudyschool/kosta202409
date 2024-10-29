const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const router = express.Router();

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(cors()); // 웹 HTTP 접근 시 Access-Control-Allow-Origin
app.use(express.static(path.join(__dirname, '../public')));

// 라우터 설정 - 단순 포워딩
router.route('/home').get((req, res)=>res.render('ChatHome', {}));

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), ()=> console.log(`http://localhost:${app.get('port')}`));

// Socket.io 접근 시 cors 별도 설정
// const io = socketio(server);
const io = new Server(server, {
    cors: {methods: ['GET','POST','PUT','DELETE']}
});

io.on('connection', (socket)=>{
    console.log('클라이언트 소켓 접속:',  socket.id);
    socket.on('message', (msg) => {
        console.log(msg);
        //socket.emit('message', msg);
        io.emit('message', `${socket.id}: ${msg}`);
    });

    // socket 접속 해제 시 발생 이벤트
    socket.on('disconnect', () => {
        console.log(`사용자 연결 해제: ${socket.id}`);
    });
});

const chatNamespace = io.of('/chat');
const newsNamespace = io.of('/news');

chatNamespace.on('connection', (socket) => {
    console.log('Chat 네임스페이스 연결 됨:', socket.id);
    // echo 기법
    socket.on('message', ({room, msg}) => {
        console.log(`news>>> ${room}, ${msg}`);
        //socket.emit('message', msg);
        //newsNamespace.emit('message', `${socket.id}: ${msg}`);
        chatNamespace.to(room).emit('message', `${room}: ${socket.id}: ${msg}`);
    });

    // socket 접속 해제 시 발생 이벤트
    socket.on('disconnect', () => {
        console.log(`Chat 소켓 사용자 연결 해제: ${socket.id}`);
    });

    socket.on('joinRoom', (room) => {
        console.log(socket.currentRoom, room);
        if(socket.currentRoom) socket.leave(socket.currentRoom);
        socket.join(room);
        socket.currentRoom = room;
        socket.to(room).emit('message', `${socket.id}가 ${room}에 참가했습니다.`);
    });
});

newsNamespace.on('connection', (socket)=>{
    console.log('News 네임스페이스 연결 됨:', socket.id);
    // echo 기법
    socket.on('message', ({room, msg}) => {
        console.log(`news>>> ${msg}`);
        //socket.emit('message', msg);
        //newsNamespace.emit('message', `${socket.id}: ${msg}`);
        newsNamespace.to(room).emit('message', `${room}: ${socket.id}: ${msg}`);
    });

    // socket 접속 해제 시 발생 이벤트
    socket.on('disconnect', () => {
        console.log(`Chat 소켓 사용자 연결 해제: ${socket.id}`);
    });

    socket.on('joinRoom', (room) => {
        if(socket.currentRoom) socket.leave(socket.currentRoom);
        socket.join(room);
        socket.currentRoom = room;
        socket.to(room).emit('message', `${socket.id}가 ${room}에 참가했습니다.`);
    });
})