let ctx;

// 라인 색상 및 굵기 설정
const shape = {
    color: 'white',
    width: 1,
    setShape: function (color, width) {
        if (color !== null) {
            this.color = color;
        }
        if (width !== null) {
            this.width = width;
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
    }
};

// 그리기 설정
const draw = {
    drawing: false,
    start: function (e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY);
        this.drawing = true;
        console.log("mousedown >>> ", this.drawing);
    },
    move: function (e) {
        console.log("mousemove >>> ", this.drawing);
        if (this.drawing === true) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }
    },
    end: function () {
        this.drawing = false;
        console.log('mouseup >>>> ', this.drawing);
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');

    // Canvas 사이즈 설정
    canvas.width = 860;
    canvas.height = 640;

    draw.drawing = false;

    // 이벤트 리스너 추가
    canvas.addEventListener('mousedown', draw.start.bind(draw));
    canvas.addEventListener('mousemove', draw.move.bind(draw));
    canvas.addEventListener('mouseup', draw.end.bind(draw));

    // 기본 라인 설정 적용
    shape.setShape();
});
