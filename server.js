const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);
app.use('/',express.static(path.join(__dirname,'public')));

let users={};
let socketMap = {};
io.on('connection',(socket) => {
    console.log("Connected with Socket ID",socket.id);

    // socket.on('msg_send', (data) => {
    //     console.log('Recieved: ',data.msg)
    //     io.emit('msg_rcvd',data.msg)
    //     /* 
    //     Sends Msg to other users and the msg wont come back to you! 
    //     (One to many!)
    //     socket.broadcast.emit('msg_rcvd',data.msg)

    //     Sends msg to only one socket
    //     socket.emit('msg_rcvd',data.msg)

    //     Sends to all and even retains the msg with itself
    //     io.emit()
    //     */
    // })

    socket.on('login',(data) => {

        if(users[data.username]) {
            if(users[data.username] == data.password) {
                socketMap[socket.id] = data.username;
                socket.join(data.username)
                socket.emit('logged_in', {
                user: 'existing'
            })
            console.log("User Logined",data.username)
            }
            else {
                socket.emit('login_failed')
            }
        }
        else {
            socketMap[socket.id] = data.username;
            users[data.username] = data.password;
            socket.join(data.username)
            socket.emit('logged_in', {
                user: 'new'
            })
            console.log("User Logined",data.username)
        }
        console.log(socketMap)
        console.log(users)
        
    })

    socket.on('msg_send',(data) => {
        data.from = socketMap[socket.id]
        if(data.to) {
            io.to(data.to).emit('msg_rcvd',data)
        }
        else {
            socket.broadcast.emit('msg_rcvd',data)
        }
    })


});

server.listen(8000,() => {
    console.log('Server running on port',8000)
});

