const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Sample expressions data categorized by region and domain
const EXPRESSIONS = [
  {
    id: 'byadari',
    kannada: 'ಬ್ಯಾಡ್ರಿ',
    transliteration: 'Byādri',
    meaning: 'No need / Please don\'t (polite refusal)',
    literalMeaning: 'Do not want (with respectful honorific -ri)',
    standardKannada: 'ಬೇಡ (Bēda)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಇನ್ನೊಂದು ಚಪಾತಿ ತಿನ್ರಿ ಅಂದ್ರೆ, "ಬ್ಯಾಡ್ರಿ ಸಾಕು ಹೊಟ್ಟೆ ತುಂಬೇತಿ" ಅಂದ್ರು.',
      translation: 'When asked to have another chapati, they said: "No please, my stomach is full."'
    },
    variants: ['ಬ್ಯಾಡಪಾ (Byādapa)', 'ಬ್ಯಾಡ್ರಿ (Byādri)'],
    audioUrl: null,
    notes: 'The suffix "-ri" is an indispensable mark of respect in North Karnataka speech.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Dharwad Literary Circle',
  },
  {
    id: 'antini',
    kannada: 'ಅಂತೀನಿ',
    transliteration: 'Antīni',
    meaning: 'I say / That is what I feel (conversational tag)',
    literalMeaning: 'I am saying',
    standardKannada: 'ಹೇಳುತ್ತೇನೆ (Hēḷuttēne)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ನಾಳೆ ಮಳೆ ಬರ್ತದ ಅಂತೀನಿ, ಮುಂಜಾನೆಯಿಂದ ಬಿಸಿಲು ಕಮ್ಮಿ ಅದ.',
      translation: 'I reckon it will rain tomorrow; the sunshine has been weak since morning.'
    },
    variants: ['ಅನ್ನಾಕತ್ತೀನಿ (Annākattīni)'],
    audioUrl: null,
    notes: 'Frequently placed at the end of assertions to invite agreement.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Dharwad Literary Circle',
  },
  {
    id: 'girmit',
    kannada: 'ಗಿರ್ಮಿಟ್',
    transliteration: 'Girmit',
    meaning: 'A beloved spicy puffed-rice delicacy and evening social snack of North Karnataka',
    literalMeaning: 'Named after the blending (mixing) motion',
    standardKannada: 'ಮಂಡಕ್ಕಿ ಒಗ್ಗರಣೆ (Mandakki Oggaraṇe)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'food',
    usageExample: {
      kannada: 'ಸಂಜೆ ಆದ್ರೆ ಧಾರವಾಡದಾಗ ಬಿಸಿ ಬಿಸಿ ಮಿರ್ಚಿ ಜೊತೆ ಗಿರ್ಮಿಟ್ ತಿನ್ನೋ ಮಜಾನೇ ಬೇರೆ!',
      translation: 'In the evening in Dharwad, having hot mirchi with girmit is an unmatched joy!'
    },
    variants: ['ಸುಸ್ಲಾ (Susla)'],
    audioUrl: null,
    notes: 'Cultural culinary staple of Hubballi-Dharwad evening tea culture.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Hubballi Heritage Forum',
  },
  {
    id: 'marre',
    kannada: 'ಮಾರ್ರೆ',
    transliteration: 'Mārre',
    meaning: 'My friend / Man / Dear (affectionate vocative marker)',
    literalMeaning: 'Sir / Friend (colloquial coastal form)',
    standardKannada: 'ಸ್ನೇಹಿತರೆ / ಅಣ್ಣ (Snēhitare / Aṇṇa)',
    regionId: 'coastal',
    regionName: 'Coastal Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಎಲ್ಲಿಗೆ ಹೊರಟಿದ್ದೀರಿ ಮಾರ್ರೆ ಈ ಬಿಸಿಲಿನಲ್ಲಿ?',
      translation: 'Where are you heading, my friend, in this scorching afternoon sun?'
    },
    variants: ['ಮಾರೆ (Māre)', 'ಮಾರ್ರಾಯ (Mārrāya)'],
    audioUrl: null,
    notes: 'Ubiquitous in Mangalorean and Kundapura conversations, used across ages.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Karavali Samskruti Kendra',
  },
  {
    id: 'encheddira',
    kannada: 'ಎಂಚೆದ್ದಿರಾ',
    transliteration: 'Encheddirā',
    meaning: 'How are you? (Greeting blend of Kannada & Tulu)',
    literalMeaning: 'How are you doing?',
    standardKannada: 'ಹೇಗಿದ್ದೀರಾ? (Hēgiddīrā?)',
    regionId: 'coastal',
    regionName: 'Coastal Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಬನ್ನಿ ಬನ್ನಿ! ಬಹಳ ದಿನವಾಯ್ತು ನಿಮ್ಮನ್ನ ನೋಡಿ, ಎಂಚೆದ್ದಿರಾ?',
      translation: 'Welcome! It has been so long since we met, how have you been?'
    },
    variants: ['ಎಂಚ ಉಲ್ಲರ್ (Encha Ullar)'],
    audioUrl: null,
    notes: 'Exemplifies the seamless linguistic synthesis between Kannada and Tulu in coastal households.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Udupi Bhasha Sangha',
  },
  {
    id: 'yakri-hinge',
    kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ',
    transliteration: 'Yākrī Hinge',
    meaning: 'Why are you doing this? / Why like this? (Gentle reproach)',
    literalMeaning: 'Why sir, like this?',
    standardKannada: 'ಏಕೆ ಹೀಗೆ ಮಾಡ್ತಿದ್ದೀರಿ (Ēke hīge māḍtiddīri)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ ತಡ ಮಾಡಿ ಬಂದಿದ್ದು? ನಾವೆಲ್ಲ ಕಾದು ಕಾದು ಸುಸ್ತಾದ್ವಿ.',
      translation: 'Why did you arrive so late? We were completely tired of waiting.'
    },
    variants: ['ಯಾಕ್ರಣ್ಣ (Yākraṇṇa)'],
    audioUrl: null,
    notes: 'Delivered with a characteristic rhythmic rise and fall of pitch distinct to the Mysuru region.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Mysuru Bhasha Parishat',
  },
  {
    id: 'kanro-makkla',
    kannada: 'ಕಣ್ರೋ',
    transliteration: 'Kaṇrō',
    meaning: 'Listen folks / You know (affectionate group address)',
    literalMeaning: 'See here (plural)',
    standardKannada: 'ನೋಡಿ (Nōḍi)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಬೇಗ ಬನ್ನಿ ಕಣ್ರೋ, ಪಂದ್ಯ ಶುರುವಾಗೋ ಸಮಯ ಆಯ್ತು!',
      translation: 'Come quickly folks, the match is about to begin!'
    },
    variants: ['ಕಣ್ರೀ (Kaṇrī)'],
    audioUrl: null,
    notes: 'Very common in Mandya and rural Mysore among peers, expressing intimacy.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Cauvery Sahitya Mandali',
  },
  {
    id: 'attitta',
    kannada: 'ಅತ್ತಿತ್ತ',
    transliteration: 'Attitta',
    meaning: 'Here and there / Wandering aimlessly',
    literalMeaning: 'That side and this side',
    standardKannada: 'ಆಚೆ ಈಚೆ (Āce īce)',
    regionId: 'central',
    regionName: 'Central Karnataka',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ಮಳೆಯಾಗುವಾಗ ಅತ್ತಿತ್ತ ಹೋಗಬೇಡ, ಇಲ್ಲೇ ಜಗುಲಿ ಮೇಲೆ ಕುಳಿತುಕೋ.',
      translation: 'Don\'t wander here and there while it rains, sit right here on the veranda.'
    },
    variants: ['ಆಕಡೆ ಈಕಡೆ (Ākaḍe īkaḍe)'],
    audioUrl: null,
    notes: 'Evokes the cozy geography of traditional Malenadu and central rural homes.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Sahyadri Samskruti Trust',
  },
  {
    id: 'barri-kalyana',
    kannada: 'ಬರ್ರಿ',
    transliteration: 'Barri',
    meaning: 'Please come / Welcome inside (warm imperative)',
    literalMeaning: 'Come (respectful plural)',
    standardKannada: 'ಬನ್ನಿ (Banni)',
    regionId: 'eastern',
    regionName: 'Eastern Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಬರ್ರಿ ಬರ್ರಿ, ಚಹಾ ಕುಡಿದು ಮುಂದಿನ ಮಾತಾಡೋಣ.',
      translation: 'Please come in, let us have a cup of tea before we talk further.'
    },
    variants: ['ಬರ್ರಿಪ್ಪಾ (Barrippā)'],
    audioUrl: null,
    notes: 'Expresses genuine hospitality across Kalaburagi, Bidar, and Raichur regions.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kalyana Bhasha Kendra',
  },
  {
    id: 'kodagu-tatte',
    kannada: 'ಕಡಂಬುಟ್ಟು',
    transliteration: 'Kadambuttu',
    meaning: 'Steamed rice dumplings typical of Kodagu feast tradition',
    literalMeaning: 'Rice balls prepared for festivals and gatherings',
    standardKannada: 'ಅಕ್ಕಿ ಉಂಡೆ (Akki Uṇḍe)',
    regionId: 'kodagu',
    regionName: 'Kodagu',
    domain: 'food',
    usageExample: {
      kannada: 'ಹಬ್ಬದ ದಿನ ಕಡಂಬುಟ್ಟು ಮತ್ತು ಕಾಯಿರಸ ಕೊಡಗಿನ ಮನೆಯಲ್ಲಿ ಸವಿಯುತ್ತಾರೆ.',
      translation: 'On festival days, kadambuttu with sweet coconut gravy is enjoyed in Kodagu homes.'
    },
    variants: ['ಕಡಂಬುಟ್ (Kadambut)'],
    audioUrl: null,
    notes: 'Heritage culinary tradition cherished across Kodagu.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kodagu Samskruti Vedike',
  },
];

// GET /api/expressions - search & filter
router.get('/', async (req, res) => {
  const { q, region, domain } = req.query;

  let results = [...EXPRESSIONS];

  if (region && region !== 'all') {
    results = results.filter(
      (e) => e.regionId === region || (e.regionId === 'north' && region === 'uttara-karnataka')
    );
  }

  if (domain && domain !== 'all') {
    results = results.filter((e) => e.domain === domain);
  }

  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    results = results.filter(
      (e) =>
        e.kannada.toLowerCase().includes(query) ||
        e.transliteration.toLowerCase().includes(query) ||
        e.meaning.toLowerCase().includes(query) ||
        e.regionName.toLowerCase().includes(query) ||
        (e.standardKannada && e.standardKannada.toLowerCase().includes(query))
    );
  }

  res.json(results);
});

// GET /api/expressions/:id - single expression detail
router.get('/:id', (req, res) => {
  const expr = EXPRESSIONS.find((e) => e.id === req.params.id);
  if (!expr) {
    return res.status(404).json({ error: `Expression ${req.params.id} not found` });
  }
  res.json(expr);
});

module.exports = router;
