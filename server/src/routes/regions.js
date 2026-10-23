const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Canonical 6 regions
const REGIONS = [
  {
    id: 'north',
    aliases: ['uttara-karnataka', 'north-karnataka'],
    nameEn: 'North Karnataka',
    nameKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ',
    districts: ['Dharwad', 'Hubballi', 'Belagavi', 'Vijayapura', 'Bagalkote', 'Gadag', 'Haveri'],
    shortDescription: 'Famous for its crisp, rhythmic cadence, respectful address ("-ri"), and rich folk idioms.',
    fullDescription: 'The dialects of Northern Karnataka feature distinct phonology and vocabulary, characterized by grammatical contractions, emphatic particles like "ri" (ರೀ), and unique culinary and relational vocabulary.',
    accentColor: '#C62828',
  },
  {
    id: 'coastal',
    aliases: ['karavali', 'coastal-karnataka'],
    nameEn: 'Coastal Karnataka',
    nameKn: 'ಕರಾವಳಿ ಕರ್ನಾಟಕ',
    districts: ['Dakshina Kannada', 'Udupi', 'Uttara Kannada'],
    shortDescription: 'Musical inflection influenced by coastal life and harmonious coexistence with Tulu and Konkani.',
    fullDescription: 'Spoken across Mangaluru, Udupi, and Kundapura, Coastal Kannada features distinctive verb endings (such as "barpe", "marre"), melodious sentence cadence, and unique coastal terms.',
    accentColor: '#0277BD',
  },
  {
    id: 'central',
    aliases: ['central-karnataka', 'malenadu-central'],
    nameEn: 'Central Karnataka',
    nameKn: 'ಮಧ್ಯ ಕರ್ನಾಟಕ',
    districts: ['Davanagere', 'Chitradurga', 'Shivamogga', 'Chikkamagaluru'],
    shortDescription: 'Balanced cadence reflecting the cultural bridge between the northern plains and southern plateau.',
    fullDescription: 'Central Karnataka dialects balance traditional southern forms with northern rhythms, preserving rich agricultural metaphors, regional greetings, and nature-inspired expressions.',
    accentColor: '#2E7D32',
  },
  {
    id: 'eastern',
    aliases: ['kalyana-karnataka', 'eastern-karnataka'],
    nameEn: 'Eastern Karnataka',
    nameKn: 'ಪೂರ್ವ ಕರ್ನಾಟಕ',
    districts: ['Kalaburagi', 'Bidar', 'Raichur', 'Yadgir', 'Koppal', 'Ballari'],
    shortDescription: 'Historic dialect of the Deccan plateau with vibrant Sharana philosophy and hospitable phrasing.',
    fullDescription: 'Rooted in the 12th-century Vachana movement and historical Deccan crossroads, this dialect is known for warm colloquial greetings (like "Barri"), unique kinship terms, and distinctive interrogative phrases.',
    accentColor: '#E65100',
  },
  {
    id: 'mysuru',
    aliases: ['mysuru-mandya', 'mysuru-region'],
    nameEn: 'Mysuru Region',
    nameKn: 'ಮೈಸೂರು ಭಾಗ',
    districts: ['Mysuru', 'Mandya', 'Chamarajanagar', 'Hassan', 'Ramanagara'],
    shortDescription: 'Warm, melodious, and formal cadence shaped by royal court history and Cauvery delta agrarian culture.',
    fullDescription: 'The Southern Karnataka dialect is renowned for its polite honorifics, lyrical intonation, and deep literary roots. The Mandya variation introduces energetic agrarian idioms and earthy metaphors.',
    accentColor: '#F4C430',
  },
  {
    id: 'kodagu',
    aliases: ['kodagu-region'],
    nameEn: 'Kodagu',
    nameKn: 'ಕೊಡಗು',
    districts: ['Kodagu (Madikeri, Somwarpet, Virajpet)'],
    shortDescription: 'Distinct highland dialect influenced by Kodava culture and misty Western Ghats geography.',
    fullDescription: 'Spoken in the highlands of Kodagu, this regional variety carries coffee-plantation vocabulary, unique phonological cadence, and gentle hospitality terms.',
    accentColor: '#7A5B7E',
  },
];

// GET /api/regions - list all regions
router.get('/', async (req, res) => {
  try {
    // If database connection is configured and available
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_connection_string')) {
      const result = await pool.query('SELECT * FROM regions ORDER BY id ASC');
      if (result.rows && result.rows.length > 0) {
        return res.json(result.rows);
      }
    }
  } catch (err) {
    // Log db query error and fall back to local dataset
    console.warn('Database query failed for regions, serving canonical data:', err.message);
  }
  res.json(REGIONS);
});

// GET /api/regions/:regionId - get single region
router.get('/:regionId', (req, res) => {
  const { regionId } = req.params;
  const region = REGIONS.find(
    (r) => r.id === regionId || (r.aliases && r.aliases.includes(regionId))
  );
  if (!region) {
    return res.status(404).json({ error: `Region ${regionId} not found` });
  }
  res.json(region);
});

module.exports = router;
