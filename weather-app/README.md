# Weather App

A sleek, responsive weather dashboard that fetches real-time environmental data for cities worldwide via the OpenWeatherMap API.

---

## 📌 Overview

**Weather App** allows users to search for any city globally and instantly retrieve up-to-date weather conditions. It displays the current temperature, weather description, condition icon, humidity, and wind speed within an elegant, responsive card interface.

---

## ✨ Features

- 🔍 **Global City Search:** Search any location by city name with instant results (supports Enter key).
- 📍 **Location & Condition Display:** Shows City, Country code, real-time temperature (°C), and animated condition icons.
- 💧 **Environmental Metrics:** Detailed grid cards showing relative humidity (%) and wind speed (m/s).
- ⚠️ **Error Handling:** Graceful error messages when a city is not found or during network issues.
- 🔒 **Secure API Routing:** Serverless function integration (`/api/weather`) to keep API keys secure.
- 📱 **Responsive Design:** Clean, modern UI styled with Inter typography that looks great on mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic markup and accessibility attributes
- **CSS3:** Flexbox, CSS Grid, custom properties, and responsive design
- **JavaScript (ES6+):** Fetch API, async/await, and dynamic DOM updates
- **OpenWeatherMap API:** Live meteorological data
- **Vercel Serverless Functions:** Secure API proxy endpoint

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).
- An OpenWeatherMap API key (if running the serverless backend locally).

### Installation

Clone the repository:

```bash
git clone https://github.com/rafasidhik/Elev-Up.git
cd Elev-Up/weather-app
```

### Run Locally

#### Option 1: Direct Browser Preview
Open `index.html` directly in your browser or use the VS Code Live Server extension.  
*(Note: Full live API requests utilize the `/api/weather` endpoint).*

#### Option 2: Using Vercel CLI (with backend serverless function)
1. Install Vercel CLI: `npm i -g vercel`
2. Create a `.env` file with your OpenWeatherMap key:
   ```env
   API_KEY=your_openweathermap_api_key
   ```
3. Run locally:
   ```bash
   vercel dev
   ```

---

## 🌐 Live Demo

Try the live application here:  
🔗 [Live Demo](https://weather-4pp.vercel.app/)
