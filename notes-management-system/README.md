# Notes Management System

A simple, functional, and responsive full-stack notes management application built with React, Node.js, Express, and Neon PostgreSQL.

---

## 📌 Overview

**Notes Management System** (NoteNest) is a lightweight full-stack task and notes dashboard designed to capture and organize thoughts effortlessly. Built with a responsive React frontend, an Express REST API backend, and Neon PostgreSQL database storage with connection pooling, it delivers real-time note creation, inline viewing, editing, safe deletion confirmations, and live title search.

---

## ✨ Features

- 📝 **Create Notes:** Fast note creation with input validation for title and content.
- 📋 **Display All Notes:** Responsive grid layout showcasing note titles, formatted timestamps, and content previews.
- 👁️ **View Note Details:** Dedicated viewing modal displaying full title, complete note content, and creation/update dates.
- ✏️ **Edit Notes:** Update existing notes with prefilled form inputs and instant database synchronization.
- 🗑️ **Delete with Confirmation:** Safe deletion workflow with an inline confirmation modal to prevent accidental removals.
- 🔍 **Search Notes by Title:** Instant real-time filtering by note title with immediate results.
- 💬 **Action Notifications:** Lightweight feedback toasts confirming note creation, updates, and removals.
- 🗄️ **Neon PostgreSQL Persistence:** Complete data persistence backed by Neon PostgreSQL.
- 📱 **Fully Responsive:** Clean UI optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **React (v19):** Functional components, custom hooks, and dynamic state management
- **Vite:** High-performance frontend build tool and development server
- **Node.js & Express.js:** Fast, minimalist REST API backend
- **Neon PostgreSQL:** Serverless PostgreSQL database with connection pooling
- **pg (node-postgres):** Native PostgreSQL client for parameterized queries
- **Axios:** Promise-based HTTP client for frontend-backend API requests
- **Lucide React:** Modern, lightweight vector icons
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid, and responsive design

---

## 🚀 Getting Started

### Prerequisites

A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.) and [Node.js](https://nodejs.org/) (v18 or newer).

### Installation

Clone the repository:

```bash
git clone https://github.com/rafasidhik/Elev-Up.git
cd Elev-Up/notes-management-system
```

### Run Locally

1. Start the backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open the displayed localhost URL (e.g., `http://localhost:5173`) in your web browser.

---

## 🌐 Live Demo

Try the live application here:  
🔗 [Live Demo](https://n0tes-app.vercel.app/)
