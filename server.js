var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket) {

    socket.broadcast.emit('newMessage', 'someone join chat');

    socket.on('newMessage', function(msg) {
        io.emit('newMessage', msg);
        console.log('Chat baru: ' + msg);
    });

    socket.on('disconnect', function(msg) {
        socket.broadcast.emit('newMessage', 'someone left the chat');
    });

});

http.listen(3000, function () {
    console.log('Listening on 3000.....');
});