# 🎧 Streamify – Social Network for Language Learners

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Stream](https://img.shields.io/badge/Realtime-Stream.io-005FFF?logo=stream)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css)

</div>

---

## 📌 Introduction

**Streamify** is a modern social networking platform designed for language learners around the world.
The application helps users find language partners, chat in real-time, and practice speaking through high-quality video calls.

Streamify aims to make language learning more interactive, social, and engaging.

---

## ✨ Key Features

* 🔐 **Authentication** – Secure sign up & login with JWT and HttpOnly cookies
* 👥 **Smart Friend Matching** – Recommend users based on native and target languages
* 💬 **Real-time Chat** – Powered by Stream Chat (typing indicators, emojis, media)
* 📹 **Video Calling** – Face-to-face communication for speaking practice
* 🔔 **Notifications** – Instant alerts for friend requests and new messages
* 🎨 **Modern UI** – Responsive design, Dark/Light mode, DaisyUI themes

---

## 🧩 Tech Stack

### Frontend

* React + Vite
* React Router
* TanStack React Query
* Zustand (Theme & Auth Store)
* Tailwind CSS + DaisyUI
* Lucide Icons
* Stream Chat React SDK

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt, Cookie Parser, CORS
* Stream Server SDK (Chat & Video)

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v22+ recommended)
* MongoDB (Local or Atlas)
* Stream.io account

---

### 1. Clone Repository

```bash
git clone https://github.com/phucthinh2704/streamify.git
cd streamify
```

---

### 2. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

---

### 3. Environment Configuration

#### Server `.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/streamify_db
JWT_SECRET=your_secret_key
NODE_ENV=development

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

#### Client `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

---

### 4. Run Application

```bash
# Start backend
cd server
npm run dev
```

```bash
# Start frontend
cd client
npm run dev
```

Open browser:
👉 `http://localhost:5173`

---

## 👨‍💻 Author

**Phúc Thịnh**
