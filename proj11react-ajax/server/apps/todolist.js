// server/apps/todolist.js

const http = require("http");
const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const todoList = ["안녕","세계","사과"];
let cnt = 1;

router.route('/').get( (req, res) => {
    console.log('GET - Product list');
    // 리액트에서 Ajax요청 할 데이터(배열) JSON으로 보낸다.
    res.send(todoList);
});

router.route('/').post( (req, res) => {
    console.log('POST - Product list');
    // post는 파라미터를 body에서 받아 온다.
    // body-parser 미들웨어 설정 필요.
    const {title} = req.body;
    productList.push(title);
    // 데이터를 배열에 저장 후 새로 고침.
    //res.redirect("/products");
    res.send(todoList);
});

app.use('/', router);
module.exports = app;