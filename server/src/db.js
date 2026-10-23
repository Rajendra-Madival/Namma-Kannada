// Load environment variables from .env (if not already loaded elsewhere)
require('dotenv').config();

const { Pool } = require('pg');

// Create a connection pool using the DATABASE_URL defined in .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Uncomment the following line if your Supabase instance requires SSL without verification
  // ssl: { rejectUnauthorized: false },
});

module.exports = { pool };