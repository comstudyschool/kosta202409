let ctx;

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');

    // Canvas 크기 설정
    canvas.width = 860;
    canvas.height = 640;

    // 마우스 움직임 이벤트 리스너 추가
    canvas.addEventListener('mousemove', function (e) {
        console.log(e.pageX, e.pageY);
    });
});
