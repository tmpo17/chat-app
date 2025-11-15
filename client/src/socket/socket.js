<<<<<<< HEAD
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

=======
// socket.js - Socket.io client setup

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

<<<<<<< HEAD
/* 🔔 small helper for browser notifications */
const showBrowserNotification = (title, body) => {
  if (
    typeof Notification !== "undefined" &&
    Notification.permission === "granted" &&
    document.visibilityState !== "visible"
  ) {
    new Notification(title, { body });
  }
};

/* Optional: simple sound effect for new messages */
const ping = new Audio("/ping.mp3");

=======
// Custom hook for using socket.io
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

<<<<<<< HEAD
  const connect = (username) => {
    socket.connect();
    if (username) socket.emit("user_join", username);
  };

  const disconnect = () => socket.disconnect();

  const sendMessage = (message) => socket.emit("send_message", { message });

  const sendPrivateMessage = (to, message) =>
    socket.emit("private_message", { to, message });

  const setTyping = (isTyping) => socket.emit("typing", isTyping);

  const reactToMessage = (messageId, emoji) =>
    socket.emit("react_message", { messageId, emoji });

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    /* ---------- MESSAGE EVENTS ---------- */
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      ping.play().catch(() => {});
      showBrowserNotification(message.sender, message.message);
=======
  // Connect to socket server
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  // Send a private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // Socket event listeners
  useEffect(() => {
    // Connection events
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    // Message events
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
<<<<<<< HEAD
      ping.play().catch(() => {});
      showBrowserNotification(`${message.sender} (private)`, message.message);

      socket.emit("message_received", {
        messageId: message.id,
        senderId: message.senderId,
      });
    };

    /* ---------- READ RECEIPTS ---------- */
    const onMessageReceivedAck = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, read: true } : m
        )
      );
    };

    /* ---------- REACTIONS ---------- */
    const onMessageReacted = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, reactions } : m
        )
      );
    };

    /* ---------- USER + TYPING EVENTS ---------- */
    const onUserList = (userList) => setUsers(userList);

    const onUserJoined = (user) =>
=======
    };

    // User events
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      // You could add a system message here
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
<<<<<<< HEAD

    const onUserLeft = (user) =>
=======
    };

    const onUserLeft = (user) => {
      // You could add a system message here
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
<<<<<<< HEAD

    const onTypingUsers = (users) => setTypingUsers(users);

    /* ---------- REGISTER ---------- */
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onReceiveMessage);
    socket.on("private_message", onPrivateMessage);
    socket.on("message_received", onMessageReceivedAck);
    socket.on("message_reacted", onMessageReacted);
    socket.on("user_list", onUserList);
    socket.on("user_joined", onUserJoined);
    socket.on("user_left", onUserLeft);
    socket.on("typing_users", onTypingUsers);

    /* ---------- CLEANUP ---------- */
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onReceiveMessage);
      socket.off("private_message", onPrivateMessage);
      socket.off("message_received", onMessageReceivedAck);
      socket.off("message_reacted", onMessageReacted);
      socket.off("user_list", onUserList);
      socket.off("user_joined", onUserJoined);
      socket.off("user_left", onUserLeft);
      socket.off("typing_users", onTypingUsers);
=======
    };

    // Typing events
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    // Clean up event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
<<<<<<< HEAD
    reactToMessage,
  };
};

export default socket;
=======
  };
};

export default socket; 
>>>>>>> 474be929c7061edab2f8942c6b13d3fb6251e992
