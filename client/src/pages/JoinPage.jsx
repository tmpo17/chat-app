import React, { useState } from "react";
import { useSocket } from "../socket/socket";

function JoinPage({ onJoin }) {
  const { connect, isConnected } = useSocket();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      connect(username);
      onJoin(username);

      //Ask permission for browser notifications
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Join the Chat</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isConnected ? "Rejoin" : "Join"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "6rem",
    textAlign: "center",
  },
  form: {
    display: "inline-flex",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default JoinPage;