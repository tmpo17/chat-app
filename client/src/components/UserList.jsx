import React, { useState } from "react";

function UserList({ users, onPrivateMessage }) {
  const [privateMsg, setPrivateMsg] = useState("");

  return (
    <div style={styles.container}>
      <h4>Online Users</h4>
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.userItem}>
            <div>{user.username}</div>
            <div style={styles.privateMsg}>
              <input
                type="text"
                placeholder="Private msg"
                value={privateMsg}
                onChange={(e) => setPrivateMsg(e.target.value)}
                style={styles.input}
              />
              <button
                onClick={() => {
                  onPrivateMessage(user.id, privateMsg);
                  setPrivateMsg("");
                }}
                style={styles.button}
              >
                ➤
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    background: "#f9f9f9",
    padding: "1rem",
    borderRight: "1px solid #ccc",
    height: "100vh",
    overflowY: "auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  userItem: {
    marginBottom: "1rem",
  },
  privateMsg: {
    display: "flex",
    gap: "4px",
    marginTop: "4px",
  },
  input: {
    flex: 1,
  },
  button: {
    cursor: "pointer",
  },
};

export default UserList;