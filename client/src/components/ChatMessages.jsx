import React from "react";
import { socket } from "../socket/socket";

function ChatMessages({ messages, username }) {
  return (
    <div style={styles.container}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            ...styles.message,
            alignSelf:
              msg.sender === username || msg.system
                ? "flex-end"
                : "flex-start",
            background: msg.system
              ? "#eee"
              : msg.sender === username
              ? "#d1f7c4"
              : "#f1f1f1",
          }}
        >
          {/* ---- Header (sender name + time) ---- */}
          {!msg.system && (
            <div style={styles.meta}>
              <strong>{msg.sender}</strong>{" "}
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          )}

          {/* ---- Main message text ---- */}
          <div style={styles.textRow}>
            <span>{msg.message}</span>

            {/* ✅ Read receipt (only for messages you sent) */}
            {msg.sender === username && msg.read && (
              <span style={styles.readMark}>✓</span>
            )}
          </div>

          {/* ❤️ Reaction buttons */}
          {!msg.system && (
            <div style={styles.reactions}>
              <button
                style={styles.reactionButton}
                onClick={() =>
                  socket.emit("react_message", {
                    messageId: msg.id,
                    emoji: "👍",
                  })
                }
              >
                👍
              </button>
              <button
                style={styles.reactionButton}
                onClick={() =>
                  socket.emit("react_message", {
                    messageId: msg.id,
                    emoji: "❤️",
                  })
                }
              >
                ❤️
              </button>
            </div>
          )}

          {/* 🆕 Reaction badges (👍 2 ❤️ 1 etc.) */}
          {!msg.system &&
            msg.reactions &&
            Object.keys(msg.reactions).length > 0 && (
              <div style={styles.reactionGroup}>
                {Object.entries(msg.reactions).map(([emoji, count]) => (
                  <div key={emoji} style={styles.reactionBadge}>
                    <span>{emoji}</span>
                    <span style={styles.reactionCount}>{count}</span>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    overflowY: "auto",
    height: "65vh",
  },
  message: {
    borderRadius: "10px",
    padding: "0.5rem 1rem",
    margin: "0.25rem 0",
    maxWidth: "60%",
  },
  meta: {
    fontSize: "0.8rem",
    color: "#555",
  },
  textRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  readMark: {
    color: "#888",
    fontSize: "0.9rem",
  },
  reactions: {
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  reactionButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1.1rem",
  },
  /* --- New styled badges for reaction counts --- */
  reactionGroup: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
  },
  reactionBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "2px 6px",
    fontSize: "0.85rem",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  reactionCount: {
    color: "#555",
    fontWeight: "500",
    fontSize: "0.8rem",
  },
};

export default ChatMessages;