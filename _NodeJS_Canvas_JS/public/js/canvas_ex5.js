let ctx;
let socket;

// 라인 색상 및 굵기 설정
const shape = {
    color: 'white',
    width: 3,
    change: function () {
        const color = document.querySelector('#pen_color').value;
        const width = document.querySelector('#pen_width').value;
        this.setShape(color, width);
    },
    setShape: function (color, width) {
        if (color) this.color = color;
        if (width) this.width = width;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.clearRect(703, 0, 860, 90);
        ctx.beginPath();
        ctx.moveTo(710, 55);
        ctx.lineTo(820, 55);
        ctx.stroke();
    }
};

const msg = {
    line: {
        send: function (type, x, y) {
            socket.emit('linesend', { type, x, y, color: shape.color, width: shape.width });
        }
    }
};

// 그리기 설정
const draw = {
    drawing: false,
    start: function (e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY);
        this.drawing = true;
    },
    move: function (e) {
        if (this.drawing) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }
    },
    end: function () {
        this.drawing = false;
    },
    clear: function () {
        ctx.clearRect(0, 0, cv.width, cv.height);
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

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');

    // Canvas 크기 설정
    canvas.width = 860;
    canvas.height = 640;

    // 마우스 이벤트 리스너 등록
    canvas.addEventListener('mousedown', draw.start.bind(draw));
    canvas.addEventListener('mousemove', draw.move.bind(draw));
    canvas.addEventListener('mouseup', draw.end.bind(draw));

    // 색상과 굵기 선택 이벤트 리스너 등록
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', shape.change.bind(shape));
    });

    // 초기 라인 설정
    shape.setShape();

    // 지우기 버튼 클릭 이벤트 리스너 등록
    document.getElementById('clear').addEventListener('click', draw.clear.bind(draw));

    // 색상 옵션 생성
    const penColorSelect = document.getElementById('pen_color');
    color_map.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.name;
        penColorSelect.appendChild(option);
    });

    // 굵기 옵션 생성
    const penWidthSelect = document.getElementById('pen_width');
    for (let i = 1; i < 16; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        penWidthSelect.appendChild(option);
    }

    // 소켓 설정 - 서버 URL 동적 사용
    socket = io.connect(`http://${window.location.host}`);
    console.log(window.location.host);
});
