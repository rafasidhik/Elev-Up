# Movie Explorer

A responsive Movie Listing web application built with HTML, CSS, JavaScript, and the OMDb API.

---

## 📌 Overview

**Movie Explorer** allows users to discover movies by searching titles through the OMDb API. The app showcases movie posters, release years, genres, and IMDb ratings in a responsive card grid, and provides an interactive modal for in-depth movie details (plot, director, cast).

---

## ✨ Features

- 🔍 **Instant Movie Search:** Search movies by title with support for both button clicks and the Enter key.
- 🖼️ **Poster & Card Display:** Dynamic card grid displaying movie posters, release year, genre tags, and IMDb star ratings.
- 📄 **Interactive Detail Modal:** Click "Details" to open a modal showing director, cast, full plot synopsis, and rating.
- 🔒 **Secure Serverless Proxy:** Implements `/api/movies` serverless function to securely manage `OMDB_API_KEY`.
- 🎨 **Modern Aesthetics & Responsive Design:** Sleek dark-mode theme with smooth transitions, CSS grid, and full mobile/desktop responsiveness.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic markup and modal dialog structure
- **CSS3:** CSS Grid, Flexbox, custom animations, and responsive media queries
- **Font Awesome:** Search and interface icons
- **JavaScript (ES6+):** Async/await, Fetch API, and dynamic DOM manipulation
- **OMDb API:** RESTful movie database
- **Vercel Serverless Functions:** Secure API endpoint proxy

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).
- An OMDb API key (if running the serverless backend locally).

### Installation

Clone the repository:

```bash
git clone https://github.com/rafasidhik/Elev-Up.git
cd Elev-Up/movie-listing
```

### Run Locally

#### Option 1: Direct Browser Preview
Open `index.html` directly in your browser or with VS Code Live Server.  
*(Note: Live search requires the `/api/movies` backend endpoint).*

#### Option 2: Using Vercel CLI (with backend serverless function)
1. Install Vercel CLI: `npm i -g vercel`
2. Create a `.env` file in the project folder:
   ```env
   OMDB_API_KEY=your_omdb_api_key
   ```
3. Run locally:
   ```bash
   vercel dev
   ```

---

## 🌐 Live Demo

Explore the live application here:  
🔗 [Live Demo](https://movie-l1sting.vercel.app/)
