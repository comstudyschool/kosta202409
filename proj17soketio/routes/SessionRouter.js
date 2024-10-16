// routes/SessionRouter.js
// session을 사용하기 위해서는
// cookie-parser와 express-session 모듈 필요
const express = require('express');
var router = express.Router();

// server.js에 session 미들웨어 등록 해야 함.

// 로그인 처리 - 세션에 정보를 저장
router.route("/login").post( (req, res) => {
    console.log("POST - /session/login 처리");
    // 세션에 사용자 정보 등록
    // 데이터베이스의 사용자 정보와 비교 후 세션 처리
    const userId = req.body.id;
    req.session.user = {
        id: userId,
        name: '홍길동',
        authorized: true
    }
    //res.end("POST - /session/login");
    // 로그인 성공 후 상품페이지로 이동하는 링크 추가
    res.redirect("/session/product");
});

// 로그아웃 처리 - 세션에 저장된 정보 제거
router.route("/logout").get( (req, res) => {
    console.log("GET - /session/logout 처리");
    if(req.session.user) {
        // 로그인 되었다면 세션의 정보 초기화.
        req.session.user = null;
    }
    // 로그인이 안되었다면 로그인 페이지로 리다이렉트 된다.
    res.redirect("/LoginForm.html");
});

// 상품 목록에서 임시로 사용 할 데이터
const ProductList = [
    {id:1, name:'Sonata', price:2500},
    {id:2, name:'Gandeur', price:3500},
    {id:3, name:'Volvo', price:4500},
    {id:4, name:'K7', price:2800},
    {id:5, name:'케스퍼', price:500}
];

// 상품 목록 보기 - 먼저 로그인을 해야 상품을 볼 수 있다.
router.route("/product").get( (req, res) => {
    console.log("GET - /session/product 처리");
    
    if(req.session.user) {
        // 로그인 되었다면 상품페이지로 이동
        req.app.render('product', {carList:ProductList}, (err, html) => {
            if(err) throw err;
            res.end(html);
        });
    } else {
        // 로그인이 안되었다면 로그인 페이지로 리다이렉트 된다.
        res.redirect("/LoginForm.html");
    }
});

// 장바구니 목록 - 먼저 로그인을 해야 상품을 볼 수 있다.
router.route("/cart").get( (req, res) => {
    console.log("GET - /session/cart 처리");
    
    if(req.session.user) {
        // 로그인 되었다면 장바구니 페이지로 이동
        var cartList = []
        if(req.session.cartList) {
            cartList = req.session.cartList;
        } else {
            req.session.cartList = cartList;
        }

        const idx = ProductList.findIndex((car, index)=>{
            return car.id == Number(req.query.id);
        });
        if(idx != -1) {
            cartList.push(ProductList[idx]);
        }
        console.log(cartList);
        req.app.render('cart', {cartList: cartList}, (err, html) => {
            if(err) throw err;
            res.end(html);
        });
    } else {
        // 로그인이 안되었다면 로그인 페이지로 리다이렉트 된다.
        res.redirect("/LoginForm.html");
    }
});

module.exports = router;