const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const static = require("serve-static");
const router = express.Router();

app.set('port', 3000);
app.use("/", static(path.join(__dirname, "public") ) );

const carList = [
    {_id:1001, name:"GRANDEUR", price:3500, company:"HYUNDAI", year:2019},
    {_id:1002, name:"SONATA2", price:2500, company:"HYUNDAI", year:2022},
    {_id:1003, name:"BMW", price:5500, company:"BMW", year:2018},
    {_id:1004, name:"S80", price:4500, company:"VOLVO", year:2023}
];
// 목록
router.route("/car/list").get((req, res)=>{
    req.app.render('car/list',{}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
// 입력
router.route("/car/input")
.get((req, res)=>{
    req.app.render('car/input',{}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
})
.post();
// 상세 보기
router.route("/car/detail")
.get((req, res)=>{
    req.app.render('car/detail',{}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
})
.post();
// 수정
router.route("/car/modify")
.get((req, res)=>{
    req.app.render('car/modify',{}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
})
.post();
// 삭제
router.route("/car/delete")
.get((req, res)=>{
    req.app.render('car/delete',{}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
})
.post();


// 모든 라우터 설정이 완료 된 후에 미들웨어 등록해야 함.
app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`Run on Server >>> http://localhost:${app.get('port')}`);
});