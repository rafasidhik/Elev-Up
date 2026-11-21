const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;

const isConfigured = Boolean(
  connectionString &&
  connectionString !== 'your_neon_pooled_connection_string' &&
  !connectionString.includes('your_neon')
);

let pool = null;

if (isConfigured) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err);
  });
}

const query = async (text, params) => {
  if (!pool) {
    throw new Error('Database connection pool is not configured');
  }
  return pool.query(text, params);
};

const initDb = async () => {
  if (!isConfigured || !pool) return;
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Neon PostgreSQL table verified/initialized');
  } catch (err) {
    console.error('Failed to initialize database table:', err.message);
  }
};

module.exports = {
  pool,
  query,
  initDb,
  isConfigured
};
