# ⚡ Real‑Time Chat Application (MERN + Socket.io)

A full‑stack real‑time chat application built with **React**, **Express**, **Socket.io**, and **Node.js**.  
This project demonstrates bidirectional communication, private messaging, live notifications, read receipts, and typing indicators — deployed with CI/CD pipelines via GitHub Actions.

---

## 🚀 Features Overview

### 🧩 Task 1 – Project Setup
- Node.js + Express backend with Socket.io
- React frontend configured with Socket.io‑client
- Verified live connection (client ↔ server)

### 💬 Task 2 – Core Chat Functionality
- Username‑based login  
- Global chat room with real‑time messaging  
- Online/offline user presence list  
- Typing indicators  
- Message timestamps  

### ⚙️ Task 3 – Advanced Chat Features
- 🔐 Private messaging (one‑to‑one DMs)  
- 👁️ Read receipts (✓ shown to sender)  
- ❤️ Message reactions (👍 / ❤️ with live counter)  
- 💬 Dynamic user presence and typing notifications  

### 🔔 Task 4 – Real‑Time Notifications
- Browser desktop notifications for new messages  
- Optional sound alert ( `ping.mp3` )  
- System alerts for user join/leave  

### 🧠 Task 5 – Performance / UX Optimizations
- Auto reconnection (Socket.io)  
- Message pagination (limit of 100 stored messages)  
- Responsive design (desktop + mobile)  
- Seamless frontend / backend deployment  

---

## 🧩 Tech Stack

|
 Layer 
|
 Technology 
|
|
:------
|
:------------
|
|
**
Frontend
**
|
 React 18 · socket.io‑client · HTML · CSS 
|
|
**
Backend
**
|
 Node.js · Express · Socket.io 
|
|
**
Database
**
|
 (In‑memory → easily extendable to MongoDB Atlas) 
|
|
**
CI/CD
**
|
 GitHub Actions (Frontend & Backend pipelines) 
|
|
**
Deployment
**
|
 Frontend → Vercel · Backend → Render 
|
|
**
Monitoring
**
|
 Render logs · UptimeRobot pings 
|

---

## 🧭 Project Structure
socketio-chat/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Join & Chat pages
│ │ └── socket/ # socket.io client setup
│ └── package.json
├── server/ # Node + Express backend
│ ├── server.js # main entry point
│ └── package.json
├── .github/workflows/ # CI/CD pipelines
└── README.md

text

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your‑username>/socketio-chat.git
cd socketio-chat
2️⃣ Server Setup
bash
cd server
npm install
npm run dev
Server runs on http://localhost:5000

3️⃣ Client Setup
bash
cd ../client
npm install
npm start
App opens at http://localhost:3000

🌍 Deployment Details
Component	Platform	URL (example)
Backend (Express + Socket.io)	Render	(https://chat-app-ne97.onrender.com/)
Frontend (React)	Vercel	(https://chat-app-ruddy-phi-56.vercel.app/)
Environment Variables:

server/.env

PORT=5000
CLIENT_URL=https://socketchat.vercel.app
client/.env

REACT_APP_SOCKET_URL=https://socketchat-api.onrender.com
🔄 CI/CD ( GitHub Actions )
Workflow	Purpose
.github/workflows/frontend-ci.yml	Installs & builds React app on push
.github/workflows/backend-ci.yml	Installs server dependencies & runs sanity test
Optional CD Workflows	Auto‑deploys to Render / Vercel after build success
🛟 Monitoring & Maintenance
- Render Logs → real‑time server output
- UptimeRobot → HTTP ping to backend every 5 min
- GitHub Actions Badges → visible pipeline status
