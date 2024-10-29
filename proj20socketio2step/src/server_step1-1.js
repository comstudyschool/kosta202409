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
    
    // echo 기법
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