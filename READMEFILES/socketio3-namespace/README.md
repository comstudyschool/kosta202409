# Socket.io 네임스페이스

---

# **1. 네임스페이스란?**

**Socket.io의 네임스페이스**는 하나의 Socket.io 서버 내에서 여러 개의 **독립적인 연결 그룹**을 관리하기 위한 기능입니다.

- 기본 네임스페이스는 `'/'`입니다.
- 추가적인 네임스페이스를 사용하면 **각기 다른 소켓 그룹**을 만들어 다양한 서비스(채팅방, 알림 등)를 제공할 수 있습니다.
- **예시**: `/chat`, `/news` 같은 네임스페이스를 만들어 특정 기능에 따라 분리할 수 있습니다.

---

# **2. 네임스페이스 사용 원리**

- **서버**에서 네임스페이스를 정의하고, **클라이언트**는 해당 네임스페이스에 연결합니다.
- 네임스페이스 별로 다른 이벤트를 처리할 수 있어 **독립적인 서비스 구현**이 가능합니다.

---

# **3. 프로젝트 구조**

```
/project
│
├── server.js         # 서버 코드
└── /public
    ├── chat.html     # 채팅 네임스페이스용 클라이언트
    └── news.html     # 뉴스 네임스페이스용 클라이언트
```

---

# **4. 서버 코드 (`server.js`)**

서버에서 두 개의 네임스페이스(`/chat`, `/news`)를 생성하고, 각각의 네임스페이스에서 이벤트를 처리합니다.

```jsx
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // 정적 파일 서빙

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

server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});

```

---

# **5. 채팅 클라이언트 (`public/chat.html`)**

이 HTML 파일은 `/chat` 네임스페이스에 연결하여 메시지를 주고받습니다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat 네임스페이스</title>
</head>
<body>
  <h1>Chat 네임스페이스</h1>
  <input type="text" id="messageInput" placeholder="메시지 입력">
  <button id="sendBtn">전송</button>
  <ul id="messages"></ul>

  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
  <script>
    const socket = io('/chat'); // /chat 네임스페이스에 연결

    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.getElementById('messages');

    sendBtn.addEventListener('click', () => {
      const msg = messageInput.value;
      socket.emit('message', msg); // 서버로 메시지 전송
      messageInput.value = '';
    });

    socket.on('message', (msg) => {
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
    });
  </script>
</body>
</html>

```

---

# **6. 뉴스 클라이언트 (`public/news.html`)**

이 HTML 파일은 `/news` 네임스페이스에 연결하여 업데이트 메시지를 주고받습니다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>News 네임스페이스</title>
</head>
<body>
  <h1>News 네임스페이스</h1>
  <input type="text" id="updateInput" placeholder="업데이트 내용 입력">
  <button id="sendUpdateBtn">업데이트 전송</button>
  <ul id="updates"></ul>

  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
  <script>
    const socket = io('/news'); // /news 네임스페이스에 연결

    const updateInput = document.getElementById('updateInput');
    const sendUpdateBtn = document.getElementById('sendUpdateBtn');
    const updates = document.getElementById('updates');

    sendUpdateBtn.addEventListener('click', () => {
      const update = updateInput.value;
      socket.emit('update', update); // 서버로 업데이트 전송
      updateInput.value = '';
    });

    socket.on('update', (msg) => {
      const li = document.createElement('li');
      li.textContent = msg;
      updates.appendChild(li);
    });
  </script>
</body>
</html>

```

---

# **7. 실행 방법**

1. **서버 실행**:
    
    ```bash
    node server.js
    # package.josn에 nodemon dev 스크립트 설정 후
    npm run dev
    ```
    
2. **브라우저에서 클라이언트 열기**:
    - `/public/chat.html`: [http://localhost:3000/public/chat.html](http://localhost:3000/public/chat.html)
    - `/public/news.html`: [http://localhost:3000/public/news.html](http://localhost:3000/public/news.html)
3. **테스트**:
    - 여러 브라우저 탭을 열어 **`/chat`** 또는 **`/news`** 네임스페이스에 연결합니다.
    - 메시지를 입력하고 전송하여 각각의 네임스페이스에서 메시지를 주고받습니다.

---

# **8. 요약 및 정리**

- **네임스페이스**는 **여러 그룹의 소켓 연결을 분리**하여 관리할 수 있습니다.
- 각각의 네임스페이스는 **독립적인 이벤트 및 메시지 처리**가 가능합니다.
- 이 예제에서는 `/chat`과 `/news` 네임스페이스를 만들어 각기 다른 기능을 수행하도록 구성했습니다.

---

# **9. 추가 학습 주제**

- **네임스페이스 인증 처리**: 각 네임스페이스에 연결될 때 **JWT** 토큰으로 인증.
- **Room(채팅방)과 네임스페이스의 차이점**: 여러 채팅방(Room)을 네임스페이스 안에서 관리하기.
- **CORS 설정**: 다른 도메인에서 네임스페이스에 연결할 때 발생할 수 있는 문제 해결.

## 참고

- **Emit cheatsheet:** [https://socket.io/docs/v3/emit-cheatsheet/](https://socket.io/docs/v3/emit-cheatsheet/)

---

## 성장통 (김범준)

실패란 없다.
큰 성공을 위한 여러 시행착오일 뿐.

범속한 사람들에게 무시 당함은
나의 결의를 더욱 단단게 만든다.

비겁하게 피하지 말고
부딛히고 싸우고 이겨 냄으로
나는 더욱 성장하리라.

나쁜 생각속에 빠져 허우적 댈 시간이 없다.

그냥 우직하게 걷고 걷고 또 걷고
실행하고 실행하고 또하고

수없이 반복하고 연습하고 체득하고 체화되고
범접하기 힘든 차이를 만든다.

그리고 또 나는 성장한다.