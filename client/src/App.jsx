import React, { useState } from "react";
import JoinPage from "./pages/JoinPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div>
      {!username ? (
        <JoinPage onJoin={setUsername} />
      ) : (
        <ChatPage username={username} />
      )}
    </div>
  );
}

export default App;