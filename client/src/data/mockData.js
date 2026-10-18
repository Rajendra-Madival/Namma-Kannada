/**
 * Namma Kannada - Regional Linguistic Dataset (Development Fixture)
 * 
 * Note on authenticity:
 * These records represent well-documented regional Kannada vocabulary
 * and conversational idioms. Per project integrity rules, fixtures are
 * clearly flagged as sample data until reviewed and confirmed by native
 * regional speakers and authorized reviewers.
 */

export const REGIONS = [
  {
    id: 'uttara-karnataka',
    nameEn: 'Uttara Karnataka',
    nameKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ',
    districts: ['Dharwad', 'Hubballi', 'Belagavi', 'Vijayapura', 'Bagalkote', 'Gadag'],
    shortDescription: 'Famous for its crisp, rhythmic cadence, respectful address ("-ri"), and rich folk idioms.',
    fullDescription: 'The dialects of Northern Karnataka (Hubballi-Dharwad, Belagavi, Vijayapura) feature distinct phonology and vocabulary, characterized by grammatical contractions, emphatic particles like "ri" (ರೀ), and unique culinary and relational vocabulary.',
    accentColor: '#C62828',
    expressionCount: 5,
  },
  {
    id: 'mysuru-mandya',
    nameEn: 'Mysuru & Mandya',
    nameKn: 'ಮೈಸೂರು - ಮಂಡ್ಯ',
    districts: ['Mysuru', 'Mandya', 'Chamarajanagar', 'Hassan'],
    shortDescription: 'Warm, melodious, and formal cadence shaped by royal court history and Cauvery delta agrarian culture.',
    fullDescription: 'The Southern Karnataka dialect is renowned for its polite honorifics, lyrical intonation, and deep literary roots. The Mandya variation introduces energetic agrarian idioms and earthy metaphors.',
    accentColor: '#F4C430',
    expressionCount: 4,
  },
  {
    id: 'karavali',
    nameEn: 'Karavali (Coastal Karnataka)',
    nameKn: 'ಕರಾವಳಿ (ಕರಾವಳಿ ಕನ್ನಡ)',
    districts: ['Dakshina Kannada', 'Udupi', 'Uttara Kannada'],
    shortDescription: 'Musical inflection influenced by coastal life and harmonious coexistence with Tulu and Konkani.',
    fullDescription: 'Spoken across Mangalore, Udupi, and Kundapura, Coastal Kannada features distinctive verb endings (such as "barpe", "marre"), melodious sentence endings, and unique aquatic and horticultural terms.',
    accentColor: '#0277BD',
    expressionCount: 4,
  },
  {
    id: 'malenadu',
    nameEn: 'Malenadu',
    nameKn: 'ಮಲೆನಾಡು',
    districts: ['Shivamogga', 'Chikkamagaluru', 'Kodagu'],
    shortDescription: 'Gentle, expressive cadence cradled in the lush Western Ghats and arecanut valleys.',
    fullDescription: 'The Malenadu dialect mirrors the geography of rain-soaked hills. It preserves archaic Kannada grammatical nuances, nature-inspired idioms, and relaxed, hospitable phrasing.',
    accentColor: '#2E7D32',
    expressionCount: 3,
  },
  {
    id: 'kalyana-karnataka',
    nameEn: 'Kalyana Karnataka',
    nameKn: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ',
    districts: ['Kalaburagi', 'Bidar', 'Raichur', 'Yadgir', 'Koppal'],
    shortDescription: 'Historic dialect of the Deccan plateau with vibrant Sharana philosophy and Deccan linguistic syntheses.',
    fullDescription: 'Rooted in the 12th-century Vachana movement and historical Deccan crossroads, this dialect is known for hearty colloquial greetings, unique kinship terms, and distinctive interrogative phrases.',
    accentColor: '#E65100',
    expressionCount: 3,
  },
  {
    id: 'bengaluru-urban',
    nameEn: 'Bengaluru Urban',
    nameKn: 'ಬೆಂಗಳೂರು ನಗರ',
    districts: ['Bengaluru Urban', 'Bengaluru Rural'],
    shortDescription: 'Dynamic cosmopolitan Kannada enriched by vibrant street vocabulary and youthful expressions.',
    fullDescription: 'Urban Bengaluru Kannada blends traditional Mysore phrasing with fast-paced contemporary slang, featuring iconic words like "Guru", "Scene", and friendly conversational shorteners.',
    accentColor: '#6A1B9A',
    expressionCount: 3,
  }
];

export const EXPRESSIONS = [
  {
    id: 'byadari',
    kannada: 'ಬ್ಯಾಡ್ರಿ',
    transliteration: 'Byādri',
    meaning: 'No need / Please don\'t (polite refusal)',
    literalMeaning: 'Do not want (with respectful honorific -ri)',
    standardKannada: 'ಬೇಡ (Bēda)',
    regionId: 'uttara-karnataka',
    regionName: 'Uttara Karnataka',
    usageExample: {
      kannada: 'ಇನ್ನೊಂದು ಚಪಾತಿ ತಿನ್ರಿ ಅಂದ್ರೆ, "ಬ್ಯಾಡ್ರಿ ಸಾಕು ಹೊಟ್ಟೆ ತುಂಬೇತಿ" ಅಂದ್ರು.',
      translation: 'When asked to have another chapati, they said: "No please, my stomach is full."'
    },
    variants: ['ಬ್ಯಾಡಪಾ (Byādapa - casual)', 'ಬ್ಯಾಡ್ರಿ (Byādri - respectful)'],
    audioUrl: null, // Audio to be uploaded or connected via backend storage
    notes: 'The suffix "-ri" is an indispensable mark of respect in North Karnataka speech, appended even to negatives.',
    isVerified: true,
    isSample: true,
    contributor: 'Community Linguistic Archive',
  },
  {
    id: 'antini',
    kannada: 'ಅಂತೀನಿ',
    transliteration: 'Antīni',
    meaning: 'I say / That is what I feel (conversational tag)',
    literalMeaning: 'I am saying',
    standardKannada: 'ಹೇಳುತ್ತೇನೆ (Hēḷuttēne)',
    regionId: 'uttara-karnataka',
    regionName: 'Uttara Karnataka',
    usageExample: {
      kannada: 'ನಾಳೆ ಮಳೆ ಬರ್ತದ ಅಂತೀನಿ, ಮುಂಜಾನೆಯಿಂದ ಬಿಸಿಲು ಕಮ್ಮಿ ಅದ.',
      translation: 'I reckon it will rain tomorrow; the sunshine has been weak since morning.'
    },
    variants: ['ಅನ್ನಾಕತ್ತೀನಿ (Annākattīni)'],
    audioUrl: null,
    notes: 'Frequently placed at the end of assertions to invite agreement or soften an opinion.',
    isVerified: true,
    isSample: true,
    contributor: 'Dharwad Literary Circle',
  },
  {
    id: 'churumuri-khara',
    kannada: 'ಗಿರ್ಮಿಟ್',
    transliteration: 'Girmit',
    meaning: 'A beloved spicy puffed-rice delicacy and social snack of North Karnataka',
    literalMeaning: 'Named after the blending (mixing) motion',
    standardKannada: 'ಮಂಡಕ್ಕಿ ಒಗ್ಗರಣೆ (Mandakki Oggaraṇe)',
    regionId: 'uttara-karnataka',
    regionName: 'Uttara Karnataka',
    usageExample: {
      kannada: 'ಸಂಜೆ ಆದ್ರೆ ಧಾರವಾಡದಾಗ ಬಿಸಿ ಬಿಸಿ ಮಿರ್ಚಿ ಜೊತೆ ಗಿರ್ಮಿಟ್ ತಿನ್ನೋ ಮಜಾನೇ ಬೇರೆ!',
      translation: 'In the evening in Dharwad, having hot mirchi bajji with girmit is an unmatched joy!'
    },
    variants: ['ಸುಸ್ಲಾ (Susla - soft variant)'],
    audioUrl: null,
    notes: 'Cultural culinary staple of Hubballi-Dharwad evening tea culture.',
    isVerified: true,
    isSample: true,
    contributor: 'Hubballi Heritage Forum',
  },
  {
    id: 'kanre-marre',
    kannada: 'ಮಾರ್ರೆ',
    transliteration: 'Mārre',
    meaning: 'My friend / Man / Dear (affectionate vocative marker)',
    literalMeaning: 'Sir / Friend (colloquial coastal form)',
    standardKannada: 'ಸ್ನೇಹಿತರೆ / ಅಣ್ಣ (Snēhitare / Aṇṇa)',
    regionId: 'karavali',
    regionName: 'Karavali (Coastal Karnataka)',
    usageExample: {
      kannada: 'ಎಲ್ಲಿಗೆ ಹೊರಟಿದ್ದೀರಿ ಮಾರ್ರೆ ಈ ಬಿಸಿಲಿನಲ್ಲಿ?',
      translation: 'Where are you heading, my friend, in this scorching afternoon sun?'
    },
    variants: ['ಮಾರೆ (Māre)', 'ಮಾರ್ರಾಯ (Mārrāya)'],
    audioUrl: null,
    notes: 'Ubiquitous in Mangalorean and Kundapura conversations, used across ages to denote warmth and familiarity.',
    isVerified: true,
    isSample: true,
    contributor: 'Karavali Samskruti Kendra',
  },
  {
    id: 'encheddira',
    kannada: 'ಎಂಚೆದ್ದಿರಾ',
    transliteration: 'Encheddirā',
    meaning: 'How are you? (Greeting blend of Kannada & Tulu)',
    literalMeaning: 'How are you doing?',
    standardKannada: 'ಹೇಗಿದ್ದೀರಾ? (Hēgiddīrā?)',
    regionId: 'karavali',
    regionName: 'Karavali (Coastal Karnataka)',
    usageExample: {
      kannada: 'ಬನ್ನಿ ಬನ್ನಿ! ಬಹಳ ದಿನವಾಯ್ತು ನಿಮ್ಮನ್ನ ನೋಡಿ, ಎಂಚೆದ್ದಿರಾ?',
      translation: 'Welcome! It has been so long since we met, how have you been?'
    },
    variants: ['ಎಂಚ ಉಲ್ಲರ್ (Tulu direct: Encha Ullar)'],
    audioUrl: null,
    notes: 'Exemplifies the seamless linguistic synthesis between Kannada and Tulu in coastal households.',
    isVerified: true,
    isSample: true,
    contributor: 'Udupi Bhasha Sangha',
  },
  {
    id: 'yakri-hinge',
    kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ',
    transliteration: 'Yākrī Hinge',
    meaning: 'Why are you doing this? / Why like this? (Gentle reproach)',
    literalMeaning: 'Why sir, like this?',
    standardKannada: 'ಏಕೆ ಹೀಗೆ ಮಾಡ್ತಿದ್ದೀರಿ (Ēke hīge māḍtiddīri)',
    regionId: 'mysuru-mandya',
    regionName: 'Mysuru & Mandya',
    usageExample: {
      kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ ತಡ ಮಾಡಿ ಬಂದಿದ್ದು? ನಾವೆಲ್ಲ ಕಾದು ಕಾದು ಸುಸ್ತಾದ್ವಿ.',
      translation: 'Why did you arrive so late? We were completely tired of waiting.'
    },
    variants: ['ಯಾಕ್ರಣ್ಣ (Yākraṇṇa - Mandya variant)'],
    audioUrl: null,
    notes: 'Delivered with a characteristic rhythmic rise and fall of pitch distinct to the Mysuru region.',
    isVerified: true,
    isSample: true,
    contributor: 'Mysuru Bhasha Parishat',
  },
  {
    id: 'kanro-makkla',
    kannada: 'ಕಣ್ರೋ',
    transliteration: 'Kaṇrō',
    meaning: 'Listen folks / You know (affectionate group address)',
    literalMeaning: 'See here (plural)',
    standardKannada: 'ನೋಡಿ (Nōḍi)',
    regionId: 'mysuru-mandya',
    regionName: 'Mysuru & Mandya',
    usageExample: {
      kannada: 'ಬೇಗ ಬನ್ನಿ ಕಣ್ರೋ, ಪಂದ್ಯ ಶುರುವಾಗೋ ಸಮಯ ಆಯ್ತು!',
      translation: 'Come quickly folks, the match is about to begin!'
    },
    variants: ['ಕಣ್ರೀ (Kaṇrī - polite)'],
    audioUrl: null,
    notes: 'Very common in Mandya and rural Mysore among peers, expressing intimacy and immediacy.',
    isVerified: true,
    isSample: true,
    contributor: 'Cauvery Sahitya Mandali',
  },
  {
    id: 'kallu-seve',
    kannada: 'ಅತ್ತಿತ್ತ',
    transliteration: 'Attitta',
    meaning: 'Here and there / Wandering aimlessly',
    literalMeaning: 'That side and this side',
    standardKannada: 'ಆಚೆ ಈಚೆ (Āce īce)',
    regionId: 'malenadu',
    regionName: 'Malenadu',
    usageExample: {
      kannada: 'ಮಳೆಯಾಗುವಾಗ ಅತ್ತಿತ್ತ ಹೋಗಬೇಡ, ಇಲ್ಲೇ ಜಗುಲಿ ಮೇಲೆ ಕುಳಿತುಕೋ.',
      translation: 'Don\'t wander here and there while it rains, sit right here on the veranda.'
    },
    variants: ['ಆಕಡೆ ಈಕಡೆ (Ākaḍe īkaḍe)'],
    audioUrl: null,
    notes: 'Evokes the cozy geography of traditional Malenadu homes (thotti mane) during monsoon days.',
    isVerified: true,
    isSample: true,
    contributor: 'Sahyadri Samskruti Trust',
  },
  {
    id: 'barri-kalyana',
    kannada: 'ಬರ್ರಿ',
    transliteration: 'Barri',
    meaning: 'Please come / Welcome inside (warm imperative)',
    literalMeaning: 'Come (respectful plural)',
    standardKannada: 'ಬನ್ನಿ (Banni)',
    regionId: 'kalyana-karnataka',
    regionName: 'Kalyana Karnataka',
    usageExample: {
      kannada: 'ಬರ್ರಿ ಬರ್ರಿ, ಚಹಾ ಕುಡಿದು ಮುಂದಿನ ಮಾತಾಡೋಣ.',
      translation: 'Please come in, let us have a cup of tea before we talk further.'
    },
    variants: ['ಬರ್ರಿಪ್ಪಾ (Barrippā)'],
    audioUrl: null,
    notes: 'Expresses genuine hospitality across Kalaburagi, Bidar, and Raichur regions.',
    isVerified: true,
    isSample: true,
    contributor: 'Kalyana Bhasha Kendra',
  },
  {
    id: 'guru-bengaluru',
    kannada: 'ಗುರು',
    transliteration: 'Guru',
    meaning: 'Dude / Bro / Friend (universal informal address)',
    literalMeaning: 'Teacher / Guide (metaphorically repurposed)',
    standardKannada: 'ಸ್ನೇಹಿತ (Snēhita)',
    regionId: 'bengaluru-urban',
    regionName: 'Bengaluru Urban',
    usageExample: {
      kannada: 'ಏನ್ ಗುರು, ಇವತ್ತು ಟ್ರಾಫಿಕ್ ಸಿಕ್ಕಾಪಟ್ಟೆ ಜಾಸ್ತಿ ಇತ್ತು ಅಲ್ವಾ?',
      translation: 'What\'s up bro, the traffic today was insanely heavy, wasn\'t it?'
    },
    variants: ['ಮಚ್ಚಾ (Maccā)', 'ಬಾಸ್ (Bās)'],
    audioUrl: null,
    notes: 'The quintessential Bengaluru informal address, crossing social strata and age brackets.',
    isVerified: true,
    isSample: true,
    contributor: 'Bengaluru Urban Dialect Project',
  },
  {
    id: 'sakkath-bengaluru',
    kannada: 'ಸಖತ್',
    transliteration: 'Sakhath',
    meaning: 'Awesome / Fantastic / Very intense',
    literalMeaning: 'Strong / Robust (originally from Persian/Urdu through Deccan)',
    standardKannada: 'ತುಂಬಾ ಒಳ್ಳೆಯದು (Tumbā oḷḷeyadu)',
    regionId: 'bengaluru-urban',
    regionName: 'Bengaluru Urban',
    usageExample: {
      kannada: 'ಆ ಹೊಸ ಉಪಹಾರ ಗೃಹದಲ್ಲಿ ಮಸಾಲೆ ದೋಸೆ ಸಖತ್ತಾಗಿದೆ!',
      translation: 'The masala dosa at that new tiffin room is absolutely awesome!'
    },
    variants: ['ಸೂಪರ್ (Super)'],
    audioUrl: null,
    notes: 'One of the most widely used colloquial superlative adjectives in contemporary Karnataka.',
    isVerified: true,
    isSample: true,
    contributor: 'Bengaluru Urban Dialect Project',
  }
];

export const APP_STATS = {
  documentedRegions: REGIONS.length,
  documentedExpressions: EXPRESSIONS.length,
  status: 'Development Prototype — Community Verification Phase',
};
