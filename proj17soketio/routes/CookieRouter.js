// routes/CookieRouter.js
const express = require('express');
var router = express.Router();

router.route('/showCookie').get(function(req, res) {
    console.log('/cookie/showCookie 호출.');
    console.log(req.cookies['user'].id);
    console.log(req.cookies['user'].name);
    res.send(req.cookies);
});

router.route('/setUserCookie').get(function(req,res){
    // 쿠키 설정 - 클라이언트의 local에 저장
    res.cookie('user', {
        id:'KIM',
        name:'BTS',
        authorized:true
    });
    
    // redirect로 응답
    res.redirect('/cookie/showCookie')
});

module.exports = router;