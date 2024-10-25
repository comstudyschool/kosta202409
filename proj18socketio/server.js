const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, "public")))

app.use(cors());
//app.use(cors({origin: 'http://127.0.0.1:5500'}));

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중 >>> http://localhost:${app.get('port')}`);
});

// socket.io와 server가 같은 포트를 사용
const io = socketio(server, {
    cors: {
      // origin: 'http://127.0.0.1:5500', // 클라이언트 도메인 허용, 생략은 모두 허용
      methods: ['GET', 'POST'], // 허용할 메서드 명시
    },
});

// io.sockets.on('connection', (socket)=>{});
io.on('connection', (socket)=>{
    console.log('>>> 클라이언트가 접속 :');
    
    //  1대1 통신 socket.on()
    socket.on('message', (data) => {
        // 모든 접속 소켓에 전달
        console.log('클라이언트가 보낸 메세지: ', data);
        io.sockets.emit('message', '전체에게 보냄-> ' + data);
        socket.emit('message', '한 곳에 보낸 메세지: Hello world!');
    });
});