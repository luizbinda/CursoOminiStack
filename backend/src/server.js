const express = require('express');
const routes = require('./routes');
const mongooose = require('mongoose');
const cors = require('cors');
const server = express();

mongooose.connect('mongodb+srv://admin:admin@cluster0-rmojy.mongodb.net/oministack8?retryWrites=true&w=majority', {useNewUrlParser : true});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);