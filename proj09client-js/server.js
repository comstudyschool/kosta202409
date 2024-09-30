const http = require('http');
const app = require('./app')

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log("서버 실행 중 ... http://localhost:"+ app.get('port'));
});