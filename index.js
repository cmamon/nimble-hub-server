const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const socketio = require('socket.io');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', `Server running on port ${port}`);
});

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  const clientIp = socket.request.connection.remoteAddress;

  io.emit('join', `${clientIp} has joined the chat`);

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('left', `${clientIp} has left the chat`);
  });
});
