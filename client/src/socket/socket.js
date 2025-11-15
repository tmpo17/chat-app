import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

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

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

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
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
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
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);

    const onUserLeft = (user) =>
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);

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
    reactToMessage,
  };
};

export default socket;