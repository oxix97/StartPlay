// server.js

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('chat');
// });

io.on('connection', function (socket) {   // 채팅방에 접속했을 때 - 1
    let count = 0;
    console.log("연결된 socketID : " , count , socket.id, "\n");
    socket.on('send message', function (nickname, text) {   // 메세지를 보냈을 때 - 3
        console.log("[debug] send message : ", nickname, text);
        io.emit('receive message', nickname, text);
    });

});

http.listen(4000, function () {
    console.log('server on..');
});
