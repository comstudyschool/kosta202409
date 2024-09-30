const express = require('express');
const router = express.Router();

router.route('/todo').get((req, res)=>{
    res.end('모든 할일 조회');
}).post((req, res)=>{
    res.end('할일 등록');
});

router.route('/todo/:id').get((req, res)=>{
    res.end('특정 할일 조회');
}).post((req, res)=>{
    res.end('특정 할일 수정');
});

// nodejs 모듈로 등록 (app.js에서 미들웨어로 사용)
module.exports = router;