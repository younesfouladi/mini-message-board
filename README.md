# Mini Message Board
NO DB! (uses JSON for storing data)
---
<div align="center">
  <!-- Tech stack badges -->
  <img src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb&style=for-the-badge" alt="React badge"/>
  <img src="https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white&style=for-the-badge" alt="Express badge"/>
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge" alt="Node.js badge"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" alt="Tailwind badge"/>
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge" alt="React Router badge"/>
  <img src="https://img.shields.io/badge/Zustand-ea580c?logo=zustand&logoColor=white&style=for-the-badge" alt="Zustand badge"/>
  <img src="https://img.shields.io/badge/Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge" alt="Motion badge"/>
  <img src="https://img.shields.io/badge/Hero%20UI-6B7280?style=for-the-badge" alt="Hero UI badge"/>
  <img src="https://img.shields.io/badge/Lucide-000?logo=lucide&logoColor=white&style=for-the-badge" alt="Lucide badge"/>
</div>

---

## 🚀 Mini Message Board

A **fullstack** & **Responsive** modern message board app built for speed and simplicity. It features real-time pagination, optimistic UI, and efficient server-side message management — all without a database!

---

### ✨ Features

- **Infinite Pagination:** Loads more messages as you scroll _up_ for smooth performance and reduced initial data load.
- **Optimistic Rendering:** Instantly displays user messages before server confirmation for fast feedback and lower data usage.
- **Efficient Server Insert:** Uses **binary search** for accurate message placement in the server JSON file.
- **No Database Needed:** All messages stored in a simple JSON file — easy to run, fork, and understand!
- **Modern UI:** Responsive, animated, and accessible — powered by Tailwind and Motion.

---

### 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/younesfouladi/mini-message-board.git
cd mini-message-board

# Server
cd /server
npm install
create .env file if doesn'e exist
# Start the server 
node --watch app.ts

# Client
cd /client
npm install
create .env file if doesn'e exist
# Start the server
npm run dev
```

---

### .env files content

```bash

# Server
PORT="server port"
CLIENT="client server address"

# Client
VITE_SERVER="server address"
VITE_LOCALSTORAGE="local storage key(can be anything)"
```

---

### 🗂️ Project Structure

```text
/
├── client/        # React + Vite frontend
│   ├── src/
│   └── ...
├── server/        # Express backend
│   ├── messages.json
│   └── ...
├── package.json
└── README.md
```

---

### ⚡ Usage Highlights

- **Send a message:** Type and hit send — it appears instantly via optimistic update.
- **Scroll up:** More messages load on demand for efficiency.
- **No setup required:** Runs out-of-the-box — no database needed.
- **No DB:** two Json files are in server's Models folder (db.json - msg.json), that's where data will be saved.

---

### 📝 License

MIT © [younesfouladi](https://github.com/younesfouladi)

---
![alt text](https://github.com/younesfouladi/mini-message-board/blob/main/client/public/shots/desktop.png?raw=true)
![alt text](https://github.com/younesfouladi/mini-message-board/blob/main/client/public/shots/mobile.png?raw=true)

> **Tip:** Fork this repo, customize, and deploy your own mini message board within minutes!

