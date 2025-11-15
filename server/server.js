// server.js – clean & fixed
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = {};
const messages = [];
const typingUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // JOIN
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // SEND MESSAGE
  socket.on('send_message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };

    messages.push(message);
    if (messages.length > 100) messages.shift();

    io.emit('receive_message', message);
  });

  // ✅ MOVE reaction listener OUTSIDE send_message
  socket.on('react_message', ({ messageId, emoji }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      if (!msg.reactions) msg.reactions = {};
      msg.reactions[emoji] = (msg.reactions[emoji] || 0) + 1;
      io.emit('message_reacted', { messageId, reactions: msg.reactions });
    }
  });

  // TYPING
  socket.on('typing', (isTyping) => {
    const user = users[socket.id];
    if (!user) return;
    if (isTyping) typingUsers[socket.id] = user.username;
    else delete typingUsers[socket.id];
    io.emit('typing_users', Object.values(typingUsers));
  });

  // PRIVATE MESSAGE
  socket.on('private_message', ({ to, message }) => {
    const msgData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    socket.to(to).emit('private_message', msgData);
    socket.emit('private_message', msgData);
  });

  // READ RECEIPT
  socket.on('message_received', ({ messageId, senderId }) => {
    io.to(senderId).emit('message_received', { messageId, senderId });
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('user_left', { username: user.username, id: socket.id });
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
      console.log(`${user.username} left the chat`);
    }
  });
});

// --------  REST API endpoints --------
app.get('/api/messages', (req, res) => res.json(messages));
app.get('/api/users', (req, res) => res.json(Object.values(users)));
app.get('/', (req, res) => res.send('Socket.io Chat Server is running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = { app, server, io };