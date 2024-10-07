const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const {MongoClient} = require('mongodb');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname, "public")));

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// db 준비 및 연동
const dbClient = new MongoClient("mongodb://localhost:27017");
const dbName = "vehicle";
const collectionName = "car";

// 목록 출력
app.get('/car', async (req, res)=>{
    try{
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const cursor = cars.find({},{sort:{name:1}, projection:{}});
        
        // for await (const doc of cursor) {
        //     console.log(doc);
        // }
        const carList = await cursor.toArray();
        req.app.render('CarList', {carList: carList}, (err, html)=>{
            if (err) throw err;
            res.end(html);
        });
    } finally {
        await dbClient.close();
    }
});

// DB에 데이터 저장
app.post('/car', (req, res)=>{
    try{
        dbClient.connect();
    } finally {
        dbClient.close();
    }
});

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`서버 실행 중 http://localhost:${app.get('port')}`);
});