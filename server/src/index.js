const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { pool } = require('./db'); // PostgreSQL connection pool

// Route imports
const healthRouter = require('./routes/health');
const regionsRouter = require('./routes/regions');
const expressionsRouter = require('./routes/expressions');
const contributionsRouter = require('./routes/contributions');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS – allow configured frontend origin or any in development
const allowedOrigin = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (all prefixed with /api)
app.use('/api/health', healthRouter);
app.use('/api/regions', regionsRouter);
app.use('/api/expressions', expressionsRouter);
app.use('/api/contributions', contributionsRouter);

// Simple root route for quick sanity check
app.get('/', (req, res) => {
  res.json({ message: 'Namma Kannada API server running' });
});

// Global error handler – no stack traces leaked
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
