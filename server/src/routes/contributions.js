const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// In-memory store fallback when PostgreSQL table is pending setup
const contributionsStore = [];

// POST /api/contributions - submit a regional word/expression
router.post('/', async (req, res) => {
  try {
    const {
      word,
      kannada,
      transliteration,
      meaning,
      region,
      regionId,
      domain,
      locality,
      exampleSentence,
      usageExampleKn,
      usageExampleEn,
      contributorName,
      contributorConsent,
    } = req.body;

    const expressionKn = (kannada || word || '').trim();
    const meaningText = (meaning || '').trim();
    const targetRegion = (regionId || region || '').trim();

    // Validation
    if (!expressionKn) {
      return res.status(400).json({ error: 'Kannada word or expression is required.' });
    }
    if (!meaningText) {
      return res.status(400).json({ error: 'Meaning and usage description is required.' });
    }
    if (!targetRegion) {
      return res.status(400).json({ error: 'Please select a regional dialect zone.' });
    }
    if (!contributorConsent) {
      return res.status(400).json({
        error: 'Contributor confirmation of authentic regional usage is required.',
      });
    }

    const newContribution = {
      id: `contrib-${Date.now()}`,
      kannada: expressionKn,
      transliteration: (transliteration || '').trim(),
      meaning: meaningText,
      regionId: targetRegion,
      domain: (domain || 'greetings').trim(),
      locality: (locality || '').trim(),
      usageExampleKn: (usageExampleKn || exampleSentence || '').trim(),
      usageExampleEn: (usageExampleEn || '').trim(),
      contributorName: (contributorName || 'Anonymous Speaker').trim(),
      status: 'PENDING_REVIEW',
      submittedAt: new Date().toISOString(),
    };

    // Attempt DB insert if configured
    let dbSaved = false;
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_connection_string')) {
      try {
        await pool.query(
          `INSERT INTO contributions 
           (kannada, transliteration, meaning, region_id, domain, locality, usage_example, contributor_name, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
          [
            newContribution.kannada,
            newContribution.transliteration,
            newContribution.meaning,
            newContribution.regionId,
            newContribution.domain,
            newContribution.locality,
            newContribution.usageExampleKn,
            newContribution.contributorName,
            newContribution.status,
          ]
        );
        dbSaved = true;
      } catch (dbErr) {
        console.warn('DB insert not available, keeping in memory store:', dbErr.message);
      }
    }

    // Always keep in persistent in-memory session array
    contributionsStore.push(newContribution);

    res.status(201).json({
      success: true,
      message: 'Contribution successfully recorded and queued for native-speaker review.',
      entry: newContribution,
      dbSaved,
    });
  } catch (err) {
    console.error('Error handling contribution submission:', err);
    res.status(500).json({ error: 'Internal server error while processing contribution.' });
  }
});

// GET /api/contributions - list pending contributions
router.get('/', (req, res) => {
  res.json({
    total: contributionsStore.length,
    contributions: contributionsStore,
  });
});

module.exports = router;
