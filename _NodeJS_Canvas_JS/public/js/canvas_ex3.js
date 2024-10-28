let ctx;

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');

    // Canvas 크기 설정
    canvas.width = 860;
    canvas.height = 640;

    // 선 스타일 설정
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let drawing = false;

    // 마우스 다운 이벤트 핸들러
    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.moveTo(e.pageX, e.pageY);
    });

    // 마우스 이동 이벤트 핸들러
    canvas.addEventListener('mousemove', function (e) {
        console.log(drawing);
        if (drawing) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }
    });

    // 문서 전체의 마우스 업 이벤트 핸들러
    document.addEventListener('mouseup', function () {
        drawing = false;
    });
});
