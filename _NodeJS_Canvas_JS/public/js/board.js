let ctx;
let socket;

// 라인 색상과 굵기 설정
const shape = {
    color: 'white',
    width: 3,
    change: function() {
        const color = document.querySelector('#pen_color').value;
        const width = document.querySelector('#pen_width').value;
        this.setShape(color, width);
    },
    setShape: function(color, width) {
        if (color) this.color = color;
        if (width) this.width = width;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.clearRect(703, 0, 860, 90);
        ctx.beginPath();
        ctx.moveTo(710, 55);
        ctx.lineTo(800, 55);
        ctx.stroke();
    }
};

const msg = {
    line: {
        send: function(type, x, y) {
            socket.emit('linesend', { type, x, y, color: shape.color, width: shape.width });
        }
    }
};

// 그리기 설정
const draw = {
    drawing: false,
    start: function(e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY);
        this.drawing = true;
        msg.line.send('start', e.pageX, e.pageY);
    },
    move: function(e) {
        if (this.drawing) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
            msg.line.send('move', e.pageX, e.pageY);
        }
    },
    end: function() {
        this.drawing = false;
        msg.line.send('end');
    },
    clear: function() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        msg.line.send('clear');
    },
    drawfromServer: function(data) {
        if (data.type === 'start') {
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
            ctx.strokeStyle = data.color;
            ctx.lineWidth = data.width;
        } else if (data.type === 'move') {
            ctx.lineTo(data.x, data.y);
            ctx.stroke();
        } else if (data.type === 'clear') {
            ctx.clearRect(0, 0, cv.width, cv.height);
            shape.setShape();
        }
    }
};

const color_map = [
    { value: 'white', name: '하얀색' },
    { value: 'red', name: '빨간색' },
    { value: 'orange', name: '주황색' },
    { value: 'yellow', name: '노란색' },
    { value: 'blue', name: '파랑색' },
    { value: 'black', name: '검은색' }
];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#cv');
    ctx = canvas.getContext('2d');

    // Canvas 사이즈 변경
    canvas.width = 860;
    canvas.height = 640;

    canvas.addEventListener('mousedown', draw.start.bind(draw));
    canvas.addEventListener('mousemove', draw.move.bind(draw));
    canvas.addEventListener('mouseup', draw.end.bind(draw));

    document.querySelector('select').addEventListener('change', shape.change.bind(shape));
    shape.setShape();

    document.querySelector('#clear').addEventListener('click', draw.clear.bind(draw));

    // 색상 옵션 생성
    color_map.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.name;
        document.querySelector('#pen_color').appendChild(option);
    });

    // 굵기 옵션 생성
    for (let i = 1; i < 16; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        document.querySelector('#pen_width').appendChild(option);
    }

    // 소켓 설정 - 서버 URL 동적 사용
    socket = io.connect(`http://${window.location.host}`);

    socket.on('linesend_tocllinet', data => {
        draw.drawfromServer(data);
    });
});
