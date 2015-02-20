var app = require('http').createServer(function (req, res) { res.send("no"); });
var io = require('socket.io')(app);
var fs = require('fs');

var PORT = 3042;

app.listen(PORT);

io.on('connection', function (socket) {
    socket.on('sku', function (data) {
        // { sku: 'XXXXXXXXXX' }
        console.log(data);
    });
});

console.log("Listening on", PORT);
