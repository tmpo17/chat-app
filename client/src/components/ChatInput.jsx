import React, { useState } from "react";

function ChatInput({ sendMessage, setTyping }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setTyping(true);
        }}
        onBlur={() => setTyping(false)}
        onKeyUp={() => {
          if (!message.trim()) setTyping(false);
        }}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Send
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    padding: "1rem",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    marginLeft: "0.5rem",
    padding: "0.5rem 1rem",
  },
};

export default ChatInput;