const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const csrf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const socketio = require('socket.io');

require('./models/user_model');
const routes = require('./config/routes');

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(csrf({ cookie: true }));

app.use(express.static('public'));

let port = process.env.PORT || 8008;

const server = app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', 'Server running on port ' + port);
});

const io = socketio(server);

io.on('connection', (socket) => {
  let clientIp = socket.request.connection.remoteAddress;
  console.log('New connection from ' + clientIp);

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});
