document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cv');
    const ctx = canvas.getContext('2d'); // '2d' 대신 'webgl'을 사용하면 3D 그래픽 가능

    // 캔버스 크기 조정
    canvas.width = 860;
    canvas.height = 445;

    // 사각형 그리기
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(10, 5, 200, 200);

    // 원 그리기
    ctx.strokeStyle = "#ffff00";
    ctx.lineWidth = 5;
    ctx.beginPath();
    // arc(x, y, 반지름, 시작각도, 끝각도) - 2 * Math.PI가 완전한 원을 의미
    ctx.arc(200, 200, 100, 0, 2 * Math.PI);
    ctx.stroke();

    // 선 그리기
    ctx.strokeStyle = "#ff00ff"; // 색상 코드 수정: # 누락된 부분 수정
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();
});
