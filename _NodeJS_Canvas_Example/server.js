const express = require('express'); 
const http = require('http'); 
const https = require('https'); 
const fs = require('fs'); 
const HTTP_PORT = 8080; 
const HTTPS_PORT = 8443; 
const options = { 
    key: fs.readFileSync('./rootca.key'), 
    cert: fs.readFileSync('./rootca.crt') 
}; 
const app = express(); // Default route for server status 

app.use(express.static('./'));

app.get('/', (req, res) => { 
    console.log((new Date()) + ' Received request for ' + request.url);
    res.json({ 
        message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` 
    }); 
}); // Create an HTTP server. 
var WebSocketServer = require('websocket').server;
 
var clients = [];
var idlist = [];
var id = 0;
 
var server = http.createServer(app);
server.listen(HTTP_PORT, ()=>{
    console.log("서버 실행 중 https://localhost:8080")
}); // Create an HTTPS server. 
var server_https = https.createServer(options, app);
server_https.listen(HTTPS_PORT, ()=>{
    console.log("보안 서버 실행 중 https://localhost:8443")
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
 
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
 
    var connection = request.accept(null, request.origin);
 
    clients.push(connection);
    idlist.push(request.key);
 
    console.log((new Date()) + ' Connection accepted.');
 
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
 
            for(var i = 0; i < idlist.length; i++) {
                if (idlist[i] != request.key) {
                    cli = clients[i];
                    msg = message.utf8Data;
                    cli.sendUTF(msg);
                }
            }
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
 
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});