const http = require('http');
const express = require('express');
const app = express();
const connection = require('./config/db');

const router = express.Router();

app.set('port', 3000);

app.use(express.json());
app.use(express.urlencoded({extends: false}));

const QUERY_SELECT = 'SELECT * FROM USERS ORDER BY ID DESC';
const QUERY_UPDATE = 'UPDATE USERS SET NAME=?, EMAIL=?, PASSWORD=? WHERE ID=?;';
const QUERY_INSERT = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
const QUERY_DELETE = 'DELETE FROM USERS WHERE ID=?';

// users 전체 목록 불러오기
router.route('/users').get((req, res)=> {
    function callback(err, results) {
        if(err) return res.status(500).json({error: err});
        res.send(results);
    };
    if(connection) {
        connection.query(QUERY_SELECT, callback);
    } else {
        console.log('DB 연결 안됨!');
    }
});

router.route('/users').post((req, res)=> {
    const {name, email, password} = req.body;
    function callback(err, results) {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({message: 'insert successfuly!'});
    };
    if(connection) {
        connection.query(QUERY_INSERT, [name, email, password], callback);
    } else {
        console.log('DB 연결 안됨!');
    }
});

router.route('/users').put((req, res)=> {
    const {id, name, email, password} = req.body;
    function callback(err, results) {
        if(err) return res.status(500).json({error: err});
        res.redirect('/users');
    };
    if(connection) {
        connection.query(QUERY_UPDATE, [name, email, password, id], callback);
    } else {
        console.log('DB 연결 안됨!');
    }
});

router.route('/users').delete((req, res)=> {
    const {id} = req.body;
    function callback(err, results) {
        if(err) return res.status(500).json({error: err});
        res.status(201).json({message: 'insert successfuly!'});
    };
    if(connection) {
        connection.query(QUERY_DELETE, [id], callback);
    } else {
        console.log('DB 연결 안됨!');
    }
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`서버 실행 중 http://localhost:${app.get('port')}`);
})