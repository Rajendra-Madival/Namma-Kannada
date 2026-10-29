// Load environment variables from .env (if not already loaded elsewhere)
require('dotenv').config();

const { Pool } = require('pg');

// Create a connection pool using the DATABASE_URL defined in .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase PostgreSQL requires SSL for cloud connections
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')
    ? { rejectUnauthorized: false }
    : undefined,
});

module.exports = { pool };