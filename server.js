var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

var users = {};
var usernames = [];

io.on('connection', function(socket) {

    socket.broadcast.emit('newMessage', 'someone join chat');

    socket.on('registerUser', function(username){
        if (usernames.indexOf(username) != -1) {
            socket.emit('registerRespond', false);
        }else{
            users[socket.id] = username;
            usernames.push(username);
            socket.emit('registerRespond', true);
            console.log(users);
            console.log("========");
            console.log(usernames);
        }
    });

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