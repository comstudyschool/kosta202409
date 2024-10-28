# Socket.io 채팅룸

# **1. 채팅 룸(Room) 이란?**

- **채팅 룸(Room)**은 **네임스페이스** 내부에서 또 다른 **그룹화된 공간**을 만들어 클라이언트들이 특정 방(Room)에서만 메시지를 주고받도록 해주는 기능입니다.
- 네임스페이스는 전체 연결을 관리하는 개념이고, **룸(Room)은 네임스페이스 내의 소규모 그룹**입니다.
- 여러 클라이언트를 특정 방으로 묶어 **비공개 채팅**이나 **팀별 대화** 등을 구현할 때 유용합니다.
- **예시**: `room1`과 `room2` 방을 만들어 해당 방에 속한 사용자끼리만 대화하게 할 수 있습니다.

---

# **2. 프로젝트 구조**

```
/project
│
├── server.js         # 서버 코드
└── /public
    └── index.html    # 클라이언트 코드
```

---

# **3. 서버 코드 (`server.js`)**

서버에서는 클라이언트가 특정 방에 참가할 수 있도록 하고, 방에 있는 사용자들끼리만 메시지를 주고받을 수 있게 합니다.

```jsx
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // 정적 파일 제공

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

server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});

```

---

# **4. 클라이언트 코드 (`public/index.html`)**

이 HTML 파일에서는 사용자가 방에 참가하고, 해당 방에서 메시지를 주고받을 수 있게 합니다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Socket.io 채팅 룸</title>
</head>
<body>
  <h1>Socket.io 채팅 룸</h1>

  <div>
    <label for="roomInput">방 이름:</label>
    <input type="text" id="roomInput" placeholder="방 이름 입력">
    <button id="joinRoomBtn">방 참가</button>
  </div>

  <div>
    <input type="text" id="messageInput" placeholder="메시지 입력">
    <button id="sendBtn">전송</button>
  </div>

  <ul id="messages"></ul>

  <script src="<https://cdn.socket.io/4.5.4/socket.io.min.js>"></script>
  <script>
    const socket = io(); // 서버와 연결

    const roomInput = document.getElementById('roomInput');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.getElementById('messages');

    let currentRoom = ''; // 현재 참가한 방 이름 저장

    // 방 참가 버튼 클릭 시 실행
    joinRoomBtn.addEventListener('click', () => {
      const room = roomInput.value.trim();
      if (room) {
        currentRoom = room;
        socket.emit('joinRoom', room); // 서버에 방 참가 요청
      }
    });

    // 메시지 전송 버튼 클릭 시 실행
    sendBtn.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message && currentRoom) {
        socket.emit('message', { room: currentRoom, message }); // 방에 메시지 전송
        messageInput.value = ''; // 입력 창 초기화
      }
    });

    // 서버로부터 메시지를 받을 때 실행
    socket.on('message', (msg) => {
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li); // 메시지를 목록에 추가
    });
  </script>
</body>
</html>

```

---

# **5. 실행 방법**

1. **서버 실행**:
    
    ```bash
    node server.js
    
    ```
    
2. **브라우저에서 클라이언트 열기**:
    - `http://localhost:3000/public/index.html`에 접속합니다.
3. **테스트**:
    - 여러 브라우저 탭을 열고 각기 다른 방에 접속합니다.
    - 같은 방에 접속한 사용자끼리만 메시지를 주고받을 수 있는지 확인합니다.

---

# **6. 추가 실습 과제**

1. **현재 방에 있는 사용자 목록 표시**:
    - 서버에서 방에 있는 사용자의 목록을 관리하고, 클라이언트로 전송합니다.
2. **퇴장 이벤트 처리**:
    - 사용자가 방을 떠나면 해당 방의 모든 클라이언트에게 알립니다.
3. **여러 개의 방 관리**:
    - 하나의 클라이언트가 여러 개의 방에 참가할 수 있도록 구현합니다.
4. **CORS 설정**:
    - 다른 도메인에서 접속할 수 있도록 **CORS 설정**을 추가해 보세요.