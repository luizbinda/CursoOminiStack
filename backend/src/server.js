const express = require('express');
const routes = require('./routes');
const mongooose = require('mongoose');
const cors = require('cors');
const app = express();
const server =  require('http').Server(app);

const io = require('socket.io')(server);

const connectedUsers = {};


io.on('connection', socket => {
    const connectedUsers = socket.handshake.query;
    connectedUsers[user] = socket.id;  
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


mongooose.connect('mongodb+srv://admin:admin@cluster0-rmojy.mongodb.net/oministack8?retryWrites=true&w=majority', {useNewUrlParser : true});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);