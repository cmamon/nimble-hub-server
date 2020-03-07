const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const socketio = require('socket.io');

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', `Server running on port ${port}`);
});

const io = socketio(server);

io.on('connection', (socket) => {
  const clientIp = socket.request.connection.remoteAddress;
  console.log(`New connection from ${clientIp}`);

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});
