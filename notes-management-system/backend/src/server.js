const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const noteRoutes = require('./routes/noteRoutes');
const { initDb, isConfigured } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const allowedOrigins = FRONTEND_URL
  ? FRONTEND_URL.split(',').map((url) => url.trim().replace(/\/+$/, ''))
  : null;

const corsOptions = allowedOrigins
  ? { origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins, credentials: true }
  : {};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'NoteNest API is running with Neon PostgreSQL' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

if (require.main === module) {
  if (isConfigured) {
    initDb();
  }
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

module.exports = app;
