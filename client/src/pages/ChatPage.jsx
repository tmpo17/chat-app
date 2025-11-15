import React, { useState } from "react";
import { useSocket } from "../socket/socket";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import UserList from "../components/UserList";

function ChatPage({ username }) {
  const {
    messages,
    users,
    typingUsers,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    reactToMessage,
  } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [privateMsg, setPrivateMsg] = useState("");

  // Handle sending private messages from user list sidebar
  const handlePrivateMessage = (to, message) => {
    if (!message.trim()) return;
    sendPrivateMessage(to, message);
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3>Online Users</h3>
        <UserList
          users={users}
          onPrivateMessage={handlePrivateMessage}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* Main chat section */}
      <div style={styles.chatContainer}>
        <div style={styles.header}>
          <h2>Welcome, {username} 👋</h2>
        </div>

        <ChatMessages
          messages={messages}
          username={username}
          onReact={reactToMessage} // Pass the reaction callback
        />

        {typingUsers.length > 0 && (
          <div style={styles.typing}>
            {typingUsers.join(", ")}{" "}
            {typingUsers.length > 1 ? "are" : "is"} typing...
          </div>
        )}

        <ChatInput sendMessage={sendMessage} setTyping={setTyping} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#f9f9f9",
    borderRight: "1px solid #ddd",
    padding: "1rem",
  },
  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  typing: {
    padding: "0.5rem 1rem",
    fontStyle: "italic",
    color: "#666",
  },
};

export default ChatPage;