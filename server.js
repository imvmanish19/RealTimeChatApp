const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);
app.use('/',express.static(path.join(__dirname,'public')));

io.on('connection',(socket) => {
    console.log("Connected with Socket ID",socket.id);

    socket.on('msg_send', (data) => {
        console.log('Recieved: ',data.msg)
        io.emit('msg_rcvd',data.msg)
        /* 
        Sends Msg to other users and the msg wont come back to you! 
        (One to many!)
        socket.broadcast.emit('msg_rcvd',data.msg)

        Sends msg to only one socket
        socket.emit('msg_rcvd',data.msg)

        Sends to all and even retains the msg with itself
        io.emit()
        */
    })
});

server.listen(8000,() => {
    console.log('Server running on port',8000)
});

