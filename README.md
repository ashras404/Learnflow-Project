# 🚀 LearnFlow AI

**LearnFlow AI** is a professional-grade SaaS platform designed to streamline student workflows using the MERN stack and Google's Gemini AI. It transforms messy study habits into structured, data-driven sessions.

---

## 🧠 The Vision
Traditional study tools are fragmented. LearnFlow AI centralizes the student experience by combining task management, AI-powered content synthesis, and deep-work tracking into a single, cohesive dashboard.

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite for lightning-fast bundling)
- **React Router Dom** (Client-side navigation)
- **Axios** (API communication)
- **Context API** (Global state & Auth management)

### Backend
- **Node.js & Express** (Scalable server architecture)
- **MongoDB & Mongoose** (NoSQL data modeling)
- **JSON Web Tokens (JWT)** (Secure stateless authentication)
- **Bcrypt.js** (Industry-standard password hashing)

### AI Engine
- **Google Gemini API** (Leveraging `gemini-2.5-flash` for low-latency content generation)

---

## ✨ Key Features

### 🔐 Secure Authentication
- Full user registration and login flow.
- Protected client-side routes and server-side middleware.
- Persistent sessions using LocalStorage and JWT.

### ✅ Intelligent Task Management
- Specialized CRUD operations for academic tasks.
- Category tagging (Math, Biology, etc.) to organize workflows.

### ✨ AI Studio (The Core Engine)
- **Explain:** Simplifies complex topics for high-school level understanding.
- **Summarize:** Distills long articles into hierarchical bullet points.
- **Flashcards:** Automatically generates Q&A pairs from raw text.
- **Solve:** Step-by-step breakdowns of logic-based problems.

### 📝 Smart Notes
- Integrated AI-to-DB pipeline.
- Users can generate structured notes from messy transcripts and save them to their personal library instantly.

### ⏱️ Deep-Work Tracker
- Live stopwatch interface for study sessions.
- Backend duration calculation to prevent local time manipulation.
- Analytics dashboard showing total study minutes and session frequency.

---
