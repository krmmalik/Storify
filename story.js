var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , express = require('express');




app.listen(80);

app.get('/', function (req, res) {
  res.sendfile((__dirname + '/story.html'));
});


app.use(express.static(__dirname + '/public'));


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('slog', function (data) {
    console.log(data.my);
  });
});