const http = require('http');
const express = require('express');
const cors = require('cors');

const expressErrorHandler = require('express-error-handler');

const mainApp = express();
const countApp = require('./app');
const userRouter = require('./routes/UsersRouter');
const cookieRouter = require('./routes/CookieRouter');
const sessionRouter = require('./routes/SessionRouter');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

mainApp.set('views', 'views');
mainApp.set('view engine', 'ejs');

mainApp.use(cors());
mainApp.use("/", express.static('public'));
mainApp.use(express.json());
mainApp.use(express.urlencoded({extends:false}));

mainApp.use(cookieParser() );
mainApp.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

mainApp.use('/count', countApp);
mainApp.use('/user', userRouter);
mainApp.use('/cookie', cookieRouter);
mainApp.use('/session', sessionRouter);

mainApp.get("/shop", (req,res) => {
    console.log("GET - /shop");
    res.end("GET - /shop");
})

// 설정 되지 않은 path에 대한 오류 응답
// mainApp.all('*', function(req, res) {
//     res.status(404).send('<h1>404 Error - 페이지를 찾을 수 없습니다!</h1>')
// });

// express-error-handler 미들웨어를 사용한 오류 응답
// 유페이지 핸들러 객체
const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

mainApp.use(expressErrorHandler.httpError(404))
mainApp.use(errorHandler);

const server = http.createServer(mainApp);
server.listen(3000, function() {
    console.log(`running on server with http://localhost:${3000}`);
});
