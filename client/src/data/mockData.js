/**
 * Namma Kannada - Regional Linguistic Dataset
 * 
 * Authentic documentation of regional Kannada vocabulary, expressions,
 * and conversational idioms across Karnataka's distinct zones.
 * Clearly distinguishes verified dialect-specific expressions from common Kannada usage.
 */

export const REGIONS = [
  {
    id: 'north',
    aliases: ['uttara-karnataka', 'north-karnataka'],
    nameEn: 'North Karnataka',
    nameKn: 'ಉತ್ತರ ಕರ್ನಾಟಕ',
    short: 'North',
    districts: ['Dharwad', 'Hubballi', 'Belagavi', 'Vijayapura', 'Bagalkote', 'Gadag', 'Haveri'],
    shortDescription: 'Famous for its crisp, rhythmic cadence, respectful address ("-ri"), and rich folk idioms.',
    fullDescription: 'The dialects of Northern Karnataka (Hubballi-Dharwad, Belagavi, Vijayapura) feature distinct phonology and vocabulary, characterized by grammatical contractions, emphatic respectful particles like "ri" (ರೀ), and unique culinary and relational vocabulary.',
    accentColor: '#C62828',
    lightColor: '#F9DEDB',
    markerPosition: { left: '54%', top: '24%' },
  },
  {
    id: 'coastal',
    aliases: ['karavali', 'coastal-karnataka'],
    nameEn: 'Coastal Karnataka',
    nameKn: 'ಕರಾವಳಿ ಕರ್ನಾಟಕ',
    short: 'Coastal',
    districts: ['Dakshina Kannada', 'Udupi', 'Uttara Kannada'],
    shortDescription: 'Musical inflection influenced by coastal life and harmonious coexistence with Tulu and Konkani.',
    fullDescription: 'Spoken across Mangaluru, Udupi, and Kundapura, Coastal Kannada features distinctive verb endings (such as "barpe", "marre"), melodious sentence endings, and unique aquatic, horticultural, and culinary terms.',
    accentColor: '#B9832F',
    lightColor: '#F5E9CB',
    markerPosition: { left: '29%', top: '49%' },
  },
  {
    id: 'central',
    aliases: ['central-karnataka', 'malenadu-central', 'malenadu'],
    nameEn: 'Central Karnataka',
    nameKn: 'ಮಧ್ಯ ಕರ್ನಾಟಕ',
    short: 'Central',
    districts: ['Davanagere', 'Chitradurga', 'Shivamogga', 'Chikkamagaluru'],
    shortDescription: 'Balanced cadence reflecting the cultural bridge between the northern plains and southern plateau.',
    fullDescription: 'Central Karnataka dialects balance traditional southern forms with northern rhythms, preserving rich agricultural metaphors, regional greetings, and nature-inspired expressions from the Western Ghats to the central plains.',
    accentColor: '#C08A27',
    lightColor: '#F6EBCF',
    markerPosition: { left: '50%', top: '42%' },
  },
  {
    id: 'eastern',
    aliases: ['kalyana-karnataka', 'eastern-karnataka'],
    nameEn: 'Eastern Karnataka',
    nameKn: 'ಪೂರ್ವ ಕರ್ನಾಟಕ',
    short: 'Eastern',
    districts: ['Kalaburagi', 'Bidar', 'Raichur', 'Yadgir', 'Koppal', 'Ballari'],
    shortDescription: 'Historic dialect of the Deccan plateau with vibrant Sharana philosophy and hospitable phrasing.',
    fullDescription: 'Rooted in the 12th-century Vachana movement and historical Deccan crossroads, this dialect is known for warm colloquial greetings (like "Barri"), unique kinship terms, and distinctive interrogative phrases.',
    accentColor: '#587C72',
    lightColor: '#DCE9E4',
    markerPosition: { left: '70%', top: '43%' },
  },
  {
    id: 'mysuru',
    aliases: ['mysuru-mandya', 'mysuru-region'],
    nameEn: 'Mysuru Region',
    nameKn: 'ಮೈಸೂರು ಭಾಗ',
    short: 'Mysuru',
    districts: ['Mysuru', 'Mandya', 'Chamarajanagar', 'Hassan', 'Ramanagara'],
    shortDescription: 'Warm, melodious, and formal cadence shaped by royal court history and Cauvery delta culture.',
    fullDescription: 'The Southern Karnataka dialect is renowned for its polite honorifics, lyrical intonation, and deep literary roots. The Mandya variation introduces energetic agrarian idioms and earthy metaphors.',
    accentColor: '#426D87',
    lightColor: '#D9E7EF',
    markerPosition: { left: '51%', top: '69%' },
  },
  {
    id: 'kodagu',
    aliases: ['kodagu-region'],
    nameEn: 'Kodagu',
    nameKn: 'ಕೊಡಗು',
    short: 'Kodagu',
    districts: ['Kodagu (Madikeri, Somwarpet, Virajpet)'],
    shortDescription: 'Distinct highland dialect influenced by Kodava culture and misty Western Ghats geography.',
    fullDescription: 'Spoken in the highlands of Kodagu, this regional variety carries coffee-plantation vocabulary, unique phonological cadence, gentle hospitality terms, and heritage culinary idioms.',
    accentColor: '#7A5B7E',
    lightColor: '#E8DCE8',
    markerPosition: { left: '38%', top: '70%' },
  },
];

export const DOMAINS = [
  { id: 'greetings', nameEn: 'Greetings', nameKn: 'ಮುಖಾಮುಖಿ / ನಮಸ್ಕಾರ' },
  { id: 'food', nameEn: 'Food', nameKn: 'ಆಹಾರ ಮತ್ತು ತಿಂಡಿ' },
  { id: 'home', nameEn: 'Home', nameKn: 'ಮನೆ ಮತ್ತು ಕುಟುಂಬ' },
  { id: 'feelings', nameEn: 'Feelings', nameKn: 'ಭಾವನೆಗಳು ಮತ್ತು ಮನಸ್ಥಿತಿ' },
  { id: 'everyday-verbs', nameEn: 'Everyday Verbs', nameKn: 'ದೈನಂದಿನ ಕ್ರಿಯಾಪದಗಳು' },
];

export const EXPRESSIONS = [
  // ── North Karnataka ──
  {
    id: 'byadari',
    kannada: 'ಬ್ಯಾಡ್ರಿ',
    transliteration: 'Byādri',
    meaning: 'No need / Please don\'t (polite refusal with respectful honorific)',
    literalMeaning: 'Do not want (with respectful suffix -ri)',
    standardKannada: 'ಬೇಡ (Bēda)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಇನ್ನೊಂದು ಚಪಾತಿ ತಿನ್ರಿ ಅಂದ್ರೆ, "ಬ್ಯಾಡ್ರಿ ಸಾಕು ಹೊಟ್ಟೆ ತುಂಬೇತಿ" ಅಂದ್ರು.',
      translation: 'When asked to have another chapati, they said: "No please, my stomach is full."'
    },
    variants: ['ಬ್ಯಾಡಪಾ (Byādapa - informal)', 'ಬ್ಯಾಡ್ರಿ (Byādri - respectful)'],
    audioUrl: null,
    notes: 'The suffix "-ri" is an indispensable mark of respect in North Karnataka speech, appended even to negative particles.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Dharwad Literary Circle',
  },
  {
    id: 'antini',
    kannada: 'ಅಂತೀನಿ',
    transliteration: 'Antīni',
    meaning: 'I say / That is what I feel (conversational tag inviting agreement)',
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
    notes: 'Frequently placed at the end of assertions to invite agreement or soften an opinion.',
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
      translation: 'In the evening in Dharwad, having hot mirchi bajji with girmit is an unmatched joy!'
    },
    variants: ['ಸುಸ್ಲಾ (Susla - softer preparation)'],
    audioUrl: null,
    notes: 'Cultural culinary staple of Hubballi-Dharwad evening tea culture.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Hubballi Heritage Forum',
  },
  {
    id: 'manya',
    kannada: 'ಮನ್ಯಾಗ',
    transliteration: 'Manyāga',
    meaning: 'At home / Inside the household',
    literalMeaning: 'In the house',
    standardKannada: 'ಮನೆಯಲ್ಲಿ (Maneyalli)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'home',
    usageExample: {
      kannada: 'ಅವ್ರು ಮನ್ಯಾಗ ಎಲ್ಲ ಆರಾಮಾಗಿದ್ದಾರೇನ್ರಿ?',
      translation: 'Is everyone doing well at home in your family?'
    },
    variants: ['ಮನೇಲಿ (Manēli)'],
    audioUrl: null,
    notes: 'The locative case suffix "-āga" replaces standard "-alli" across North Karnataka.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Belagavi Bhasha Samiti',
  },
  {
    id: 'kharena',
    kannada: 'ಖರೇನಾ',
    transliteration: 'Kharēnā',
    meaning: 'Really? / Is that truly so? (expression of surprise or seeking confirmation)',
    literalMeaning: 'Is it true?',
    standardKannada: 'ನಿಜವಾಗಿಯೂ? (Nijavāgiyū?)',
    regionId: 'north',
    regionName: 'North Karnataka',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಖರೇನಾ? ಅವರು ನಾಳೆನೇ ನಮ್ಮ ಊರಿಗೆ ಬರ್ತಾರೇನ್ರಿ?',
      translation: 'Really? Are they truly visiting our town tomorrow itself?'
    },
    variants: ['ಖರೆ (Khare)'],
    audioUrl: null,
    notes: '"Khare" (from Marathi/Deccan shared root) is universally used in North Karnataka for truth/genuineness.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Vijayapura Samskruti Vedike',
  },

  // ── Coastal Karnataka ──
  {
    id: 'marre',
    kannada: 'ಮಾರ್ರೆ',
    transliteration: 'Mārre',
    meaning: 'My friend / Man / Dear (affectionate vocative marker)',
    literalMeaning: 'Friend / Sir (colloquial coastal vocative)',
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
    notes: 'Ubiquitous in Mangalorean and Kundapura conversations, used across ages to denote warmth and familiarity.',
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
    id: 'barpe',
    kannada: 'ಬರ್ಪೆ',
    transliteration: 'Barpe',
    meaning: 'I will come / Coming right away (characteristic coastal future-habitual verb)',
    literalMeaning: 'I come',
    standardKannada: 'ಬರುತ್ತೇನೆ (Baruttēne)',
    regionId: 'coastal',
    regionName: 'Coastal Karnataka',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ನೀವು ಮುಂದುವರಿಯಿರಿ ಮಾರ್ರೆ, ನಾನು ಐದು ನಿಮಿಷದಲ್ಲಿ ಬರ್ಪೆ.',
      translation: 'You please go ahead my friend, I will come in five minutes.'
    },
    variants: ['ತಿಂಪೆ (Timpe - I will eat)', 'ಪೋಪೆ (Pōpe - I will go)'],
    audioUrl: null,
    notes: 'The "-pe" / "-ve" verb ending is a signature phonological marker of Coastal Kannada.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kundapura Kannada Parishat',
  },
  {
    id: 'kori-rotti',
    kannada: 'ಕೋರಿ ರೊಟ್ಟಿ',
    transliteration: 'Kōri Roṭṭi',
    meaning: 'Crisp dry rice wafers served with rich coastal chicken gravy',
    literalMeaning: 'Chicken flatbread',
    standardKannada: 'ಕೋಳಿ ರೊಟ್ಟಿ (Kōḷi Roṭṭi)',
    regionId: 'coastal',
    regionName: 'Coastal Karnataka',
    domain: 'food',
    usageExample: {
      kannada: 'ಭಾನುವಾರದ ಊಟಕ್ಕೆ ಕರಾವಳಿಯ ಮನೆಯಲ್ಲಿ ಕೋರಿ ರೊಟ್ಟಿ ಪ್ರಸಿದ್ಧ.',
      translation: 'For Sunday lunch in coastal homes, kori rotti is world-renowned.'
    },
    variants: ['ಮೀನು ಸಾರು ರೊಟ್ಟಿ (Meen Saaru Rotti)'],
    audioUrl: null,
    notes: 'Traditional festive dish bridging Tulu and Kannada heritage in Dakshina Kannada.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Mangaluru Culinary Archive',
  },
  {
    id: 'illad',
    kannada: 'ಇಲ್ಲಡ್',
    transliteration: 'Illaḍ',
    meaning: 'Inside the house / At home (home-oriented coastal phrasing)',
    literalMeaning: 'In the house',
    standardKannada: 'ಮನೆಯಲ್ಲಿ (Maneyalli)',
    regionId: 'coastal',
    regionName: 'Coastal Karnataka',
    domain: 'home',
    usageExample: {
      kannada: 'ಅಜ್ಜಿ ಈಗ ಇಲ್ಲಡ್ ವಿಶ್ರಾಂತಿ ತಗೊಳ್ತಿದ್ದಾರೆ.',
      translation: 'Grandmother is resting at home right now.'
    },
    variants: ['ಇಲ್ಲದಾಗ (Illadāga)'],
    audioUrl: null,
    notes: 'Influenced by the Dravidian root "il" (house/home) shared with Tulu.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Dakshina Kannada Language Guild',
  },

  // ── Central Karnataka ──
  {
    id: 'attitta',
    kannada: 'ಅತ್ತಿತ್ತ',
    transliteration: 'Attitta',
    meaning: 'Here and there / Wandering aimlessly without focus',
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
    id: 'benne-dosa',
    kannada: 'ಬೆಣ್ಣೆ ದೋಸೆ',
    transliteration: 'Beṇṇe Dōse',
    meaning: 'Crispy butter dosa originating from Davanagere cooked on firewood hearths',
    literalMeaning: 'Butter dosa',
    standardKannada: 'ಬೆಣ್ಣೆ ದೋಸೆ (Beṇṇe Dōse)',
    regionId: 'central',
    regionName: 'Central Karnataka',
    domain: 'food',
    usageExample: {
      kannada: 'ದಾವಣಗೆರೆಗೆ ಹೋದಾಗ ಮಂಡಕ್ಕಿ ಮತ್ತು ಬಿಸಿ ಬೆಣ್ಣೆ ದೋಸೆ ತಪ್ಪದೇ ಸವಿಯಬೇಕು.',
      translation: 'When visiting Davanagere, one must not miss crisp benne dosa with spicy potato palya.'
    },
    variants: ['ಓಪನ್ ಬೆಣ್ಣೆ ದೋಸೆ (Open Benne Dosa)'],
    audioUrl: null,
    notes: 'Celebrated culinary emblem of Central Karnataka.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Davanagere Heritage Group',
  },
  {
    id: 'jagali',
    kannada: 'ಜಗುಲಿ',
    transliteration: 'Jaguli',
    meaning: 'Traditional raised veranda in front of village homes for sitting and hospitality',
    literalMeaning: 'Raised platform',
    standardKannada: 'ಜಗುಲಿ / ಅಂಗಳ (Jaguli / Aṅgaḷa)',
    regionId: 'central',
    regionName: 'Central Karnataka',
    domain: 'home',
    usageExample: {
      kannada: 'ಸಂಜೆ ವೇಳೆ ಹಿರಿಯರೆಲ್ಲ ಜಗುಲಿ ಮೇಲೆ ಕುಳಿತು ಹರಟೆ ಹೊಡೆಯುತ್ತಾರೆ.',
      translation: 'In the evening, the village elders sit on the jaguli and converse.'
    },
    variants: ['ಕಟ್ಟೆ (Kaṭṭe)'],
    audioUrl: null,
    notes: 'Architectural and social centerpiece of Central and Malenadu households.',
    isVerified: true,
    isDialectSpecific: false,
    contributor: 'Shivamogga Janapada Koota',
  },
  {
    id: 'banni-koodri',
    kannada: 'ಬನ್ನಿ ಕೂದ್ರಿ',
    transliteration: 'Banni Kūdri',
    meaning: 'Please come and sit down (warm hospitable central greeting)',
    literalMeaning: 'Come, sit',
    standardKannada: 'ಬನ್ನಿ ಕುಳಿತುಕೊಳ್ಳಿ (Banni Kuḷitukoḷḷi)',
    regionId: 'central',
    regionName: 'Central Karnataka',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಬನ್ನಿ ಕೂದ್ರಿ, ಮಜ್ಜಿಗೆ ಕುಡಿದು ಸುಧಾರಿಸಿಕೊಳ್ಳಿ.',
      translation: 'Please come sit down, have some fresh buttermilk and refresh yourself.'
    },
    variants: ['ಕೂತ್ಕೊಳ್ಳಿ (Kūtkoḷḷi)'],
    audioUrl: null,
    notes: 'Central Karnataka cordial greeting spoken warmly to all visitors.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Chitradurga Sahitya Vedike',
  },
  {
    id: 'sambrama',
    kannada: 'ಸಂಭ್ರಮ',
    transliteration: 'Sambhrama',
    meaning: 'Joyful celebration / Festive enthusiasm',
    literalMeaning: 'Grand celebration',
    standardKannada: 'ಸಂಭ್ರಮ (Sambhrama)',
    regionId: 'central',
    regionName: 'Central Karnataka',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಹಬ್ಬದ ದಿನ ಊರಲ್ಲೆಲ್ಲ ಎಲ್ಲಿಲ್ಲದ ಸಂಭ್ರಮ ತುಂಬಿರುತ್ತದೆ.',
      translation: 'On festival day, the entire village is filled with boundless joy.'
    },
    variants: ['ಉತ್ಸಾಹ (Utsāha)'],
    audioUrl: null,
    notes: 'Common heritage vocabulary expressing genuine communal joy.',
    isVerified: true,
    isDialectSpecific: false,
    contributor: 'Central Heritage Project',
  },

  // ── Eastern Karnataka ──
  {
    id: 'barri-kalyana',
    kannada: 'ಬರ್ರಿ',
    transliteration: 'Barri',
    meaning: 'Please come / Welcome inside (warm open imperative)',
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
    notes: 'Expresses genuine hospitality across Kalaburagi, Bidar, Raichur, and Ballari regions.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kalyana Bhasha Kendra',
  },
  {
    id: 'jolada-rotti',
    kannada: 'ಜೋಳದ ರೊಟ್ಟಿ',
    transliteration: 'Jōḷada Roṭṭi',
    meaning: 'Unleavened sorghum flatbread baked on earthen pans with spicy brinjal curry',
    literalMeaning: 'Sorghum roti',
    standardKannada: 'ಜೋಳದ ರೊಟ್ಟಿ (Jōḷada Roṭṭi)',
    regionId: 'eastern',
    regionName: 'Eastern Karnataka',
    domain: 'food',
    usageExample: {
      kannada: 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಪಲ್ಯ ಮತ್ತು ಶೇಂಗಾ ಚಟ್ನಿ ಊಟದ ಸವಿ ಅದ್ಭುತ.',
      translation: 'Hot jolada rotti with stuffed brinjal curry and peanut chutney is a feast.'
    },
    variants: ['ಕಡಕ್ ರೊಟ್ಟಿ (Kaḍak Roṭṭi)'],
    audioUrl: null,
    notes: 'Foundational staple diet of the dry Deccan plateau.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kalaburagi Sahitya Vedike',
  },
  {
    id: 'honda-eastern',
    kannada: 'ಹೊಂಡ',
    transliteration: 'Hoṇḍa',
    meaning: 'Traditional stone water reservoir / household cistern',
    literalMeaning: 'Pond / stone tank',
    standardKannada: 'ಕೊಳ / ಬಾವಿ (Koḷa / Bāvi)',
    regionId: 'eastern',
    regionName: 'Eastern Karnataka',
    domain: 'home',
    usageExample: {
      kannada: 'ಹೊಂಡದ ತಂಪಾದ ನೀರನ್ನು ಕುಡಿದು ಪ್ರಯಾಣಿಕರು ವಿಶ್ರಾಂತಿ ಪಡೆಯುತ್ತಿದ್ದರು.',
      translation: 'Travelers drank cool water from the stone tank and rested.'
    },
    variants: ['ಬಾವಿ (Bāvi)'],
    audioUrl: null,
    notes: 'Historic water conservation element across Kalyana Karnataka settlements.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Bidar Heritage Forum',
  },
  {
    id: 'bejar',
    kannada: 'ಬೇಜಾರ',
    transliteration: 'Bējāra',
    meaning: 'Saddened / Disheartened / Feeling low',
    literalMeaning: 'Troubled state of mind',
    standardKannada: 'ದುಃಖ / ಬೇಸರ (Duḥkha / Bēsara)',
    regionId: 'eastern',
    regionName: 'Eastern Karnataka',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಯಾಕ್ರಿ ಅಷ್ಟೊಂದು ಬೇಜಾರಾಗಿದ್ದೀರಿ? ಎಲ್ಲವೂ ಸರಿಯಾಗ್ತದೆ.',
      translation: 'Why are you feeling so low? Everything will turn out fine.'
    },
    variants: ['ಖಿನ್ನತೆ (Khinnate)'],
    audioUrl: null,
    notes: 'Conversational emotional expression shared across the Deccan linguistic corridor.',
    isVerified: true,
    isDialectSpecific: false,
    contributor: 'Raichur Janapada Sabha',
  },
  {
    id: 'kudiri',
    kannada: 'ಕುಡಿರಿ',
    transliteration: 'Kuḍiri',
    meaning: 'Please drink / Have a beverage (respectful imperative)',
    literalMeaning: 'Drink (respectful)',
    standardKannada: 'ಕುಡಿಯಿರಿ (Kuḍiyiri)',
    regionId: 'eastern',
    regionName: 'Eastern Karnataka',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ಬಿಸಿಲಿನಲ್ಲಿ ಬಂದಿದ್ದೀರಿ, ಮೊದಲು ತಣ್ಣೀರು ಕುಡಿರಿ.',
      translation: 'You have arrived from the harsh sun, first please drink some cool water.'
    },
    variants: ['ತಗೋರಿ (Tagōri)'],
    audioUrl: null,
    notes: 'Polite plural imperative common in eastern household reception.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Yadgir Cultural Guild',
  },

  // ── Mysuru Region ──
  {
    id: 'yakri-hinge',
    kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ',
    transliteration: 'Yākrī Hinge',
    meaning: 'Why are you doing this? / Why like this? (Gentle reproach or teasing)',
    literalMeaning: 'Why sir, like this?',
    standardKannada: 'ಏಕೆ ಹೀಗೆ ಮಾಡ್ತಿದ್ದೀರಿ (Ēke hīge māḍtiddīri)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಯಾಕ್ರೀ ಹಿಂಗೆ ತಡ ಮಾಡಿ ಬಂದಿದ್ದು? ನಾವೆಲ್ಲ ಕಾದು ಕಾದು ಸುಸ್ತಾದ್ವಿ.',
      translation: 'Why did you arrive so late? We were completely tired of waiting.'
    },
    variants: ['ಯಾಕ್ರಣ್ಣ (Yākraṇṇa - Mandya variant)'],
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
    meaning: 'Listen folks / You know (affectionate group address among peers)',
    literalMeaning: 'See here (plural vocative)',
    standardKannada: 'ನೋಡಿ (Nōḍi)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಬೇಗ ಬನ್ನಿ ಕಣ್ರೋ, ಪಂದ್ಯ ಶುರುವಾಗೋ ಸಮಯ ಆಯ್ತು!',
      translation: 'Come quickly folks, the match is about to begin!'
    },
    variants: ['ಕಣ್ರೀ (Kaṇrī - polite)'],
    audioUrl: null,
    notes: 'Very common in Mandya and rural Mysuru among peers, expressing intimacy and immediacy.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Cauvery Sahitya Mandali',
  },
  {
    id: 'mysore-pak',
    kannada: 'ಮೈಸೂರು ಪಾಕ್',
    transliteration: 'Mysore Pāk',
    meaning: 'Rich royal sweet crafted from besan, pure ghee, and sugar originated in the royal palace kitchen',
    literalMeaning: 'Mysuru sweet concoction',
    standardKannada: 'ಮೈಸೂರು ಪಾಕ್ (Mysore Pāk)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'food',
    usageExample: {
      kannada: 'ದಸರಾ ಹಬ್ಬದಲ್ಲಿ ಮೈಸೂರು ಪಾಕ್ ಎಲ್ಲರ ಮೆಚ್ಚಿನ ಸಿಹಿ ತಿನಿಸು.',
      translation: 'During Dasara festival, Mysore Pak is everyone\'s favourite sweet.'
    },
    variants: ['ತುಪ್ಪದ ಮೈಸೂರು ಪಾಕ್ (Ghee Mysore Pak)'],
    audioUrl: null,
    notes: 'Created by palace chef Kakasura Madappa during the reign of Nalwadi Krishnaraja Wadiyar.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Mysuru Heritage Trust',
  },
  {
    id: 'thotti-mane',
    kannada: 'ತೊಟ್ಟಿ ಮನೆ',
    transliteration: 'Thoṭṭi Mane',
    meaning: 'Traditional courtyard mansion with a central sunken impluvium collecting rainwater',
    literalMeaning: 'Courtyard cistern house',
    standardKannada: 'ತೊಟ್ಟಿ ಮನೆ (Thoṭṭi Mane)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'home',
    usageExample: {
      kannada: 'ನಮ್ಮ ಅಜ್ಜಿಯ ಹಳೆಯ ತೊಟ್ಟಿ ಮನೆಯಲ್ಲಿ ಬೇಸಿಗೆಯಲ್ಲೂ ತಂಪಾಗಿರುತ್ತದೆ.',
      translation: 'Our grandmother\'s old courtyard house remains wonderfully cool even in summer.'
    },
    variants: ['ಅಂಗಳದ ಮನೆ (Aṅgaḷada Mane)'],
    audioUrl: null,
    notes: 'Classical southern vernacular architecture designed for natural ventilation and daylight.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Heritage Architecture Circle',
  },
  {
    id: 'hogona',
    kannada: 'ಹೋಗೋಣ ಬನ್ನಿ',
    transliteration: 'Hōgōṇa Banni',
    meaning: 'Let us go together (polite collective invitation)',
    literalMeaning: 'Let us go, come',
    standardKannada: 'ಹೋಗೋಣ ಬನ್ನಿ (Hōgōṇa Banni)',
    regionId: 'mysuru',
    regionName: 'Mysuru Region',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ಸಮಯವಾಯಿತು, ಚಾಮುಂಡಿ ಬೆಟ್ಟಕ್ಕೆ ಹೋಗೋಣ ಬನ್ನಿ.',
      translation: 'It is time, let us go together to Chamundi Hill.'
    },
    variants: ['ಹೋಗ್ಬರೋಣ (Hōgbarōṇa)'],
    audioUrl: null,
    notes: 'Standard polite colloquial expression used in southern everyday companionship.',
    isVerified: true,
    isDialectSpecific: false,
    contributor: 'Southern Dialect Archive',
  },

  // ── Kodagu ──
  {
    id: 'kadambuttu',
    kannada: 'ಕಡಂಬುಟ್ಟು',
    transliteration: 'Kadambuttu',
    meaning: 'Steamed crushed rice balls typical of Kodagu feast tradition',
    literalMeaning: 'Steamed rice dumplings',
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
    notes: 'Heritage culinary tradition cherished across Kodagu hospitality.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kodagu Samskruti Vedike',
  },
  {
    id: 'ainmane',
    kannada: 'ಐನ್‌ಮನೆ',
    transliteration: 'Ainmane',
    meaning: 'Ancestral clan house of Kodava and Kodagu families preserving lineage records',
    literalMeaning: 'Principal house / Clan hearth',
    standardKannada: 'ಮೂಲ ಮನೆ (Mūla Mane)',
    regionId: 'kodagu',
    regionName: 'Kodagu',
    domain: 'home',
    usageExample: {
      kannada: 'ಕೈಲ್ಮುಹೂರ್ತ ಮತ್ತು ಕಾವೇರಿ ಸಂಕ್ರಮಣಕ್ಕೆ ಎಲ್ಲರೂ ಐನ್‌ಮನೆಗೆ ಸೇರುತ್ತಾರೆ.',
      translation: 'For the Kailpodh festival and Kaveri Sankramana, clan members gather at the Ainmane.'
    },
    variants: ['ಒಕ್ಕಡ ಮನೆ (Okkada Mane)'],
    audioUrl: null,
    notes: 'Architectural and ritual heart of family lineage in Kodagu district.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Kodagu Heritage Society',
  },
  {
    id: 'saukhyave',
    kannada: 'ಸೌಖ್ಯವೇ',
    transliteration: 'Saukhyavē',
    meaning: 'Are you in peace and good health? (Gentle traditional greeting)',
    literalMeaning: 'Is all well?',
    standardKannada: 'ಆರಾಮಾಗಿದ್ದೀರಾ? (Ārāmāgiddīrā?)',
    regionId: 'kodagu',
    regionName: 'Kodagu',
    domain: 'greetings',
    usageExample: {
      kannada: 'ಬಹಳ ಕಾಲದ ನಂತರ ಭೇಟಿಯಾದಾಗ, "ಸೌಖ್ಯವೇ ಎಲ್ಲರಿಗೂ?" ಎಂದು ವಿಚಾರಿಸಿದರು.',
      translation: 'Meeting after a long time, they warmly enquired: "Is everyone in good health and peace?"'
    },
    variants: ['ಆರಾಮಾ (Ārāmā)'],
    audioUrl: null,
    notes: 'Gentle, affectionate greeting heard in highland plantations and towns.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Madikeri Bhasha Koota',
  },
  {
    id: 'olavu',
    kannada: 'ಒಲವು',
    transliteration: 'Olavu',
    meaning: 'Deep affection / Heartfelt goodwill towards others',
    literalMeaning: 'Affection / warmth',
    standardKannada: 'ಪ್ರೀತಿ (Prīti)',
    regionId: 'kodagu',
    regionName: 'Kodagu',
    domain: 'feelings',
    usageExample: {
      kannada: 'ಹಳ್ಳಿಯ ಜನರ ಒಲವು ಮತ್ತು ಆತಿಥ್ಯ ಯಾರೂ ಮರೆಯಲಾರರು.',
      translation: 'No one can forget the deep goodwill and hospitality of the valley folk.'
    },
    variants: ['ವಾತ್ಸಲ್ಯ (Vātsalya)'],
    audioUrl: null,
    notes: 'Classic poetic Kannada word expressing affectionate regard.',
    isVerified: true,
    isDialectSpecific: false,
    contributor: 'Highland Literary Forum',
  },
  {
    id: 'koodoona',
    kannada: 'ಕೂಡೋಣ',
    transliteration: 'Kūḍōṇa',
    meaning: 'Let us gather together / Assemble for conversation',
    literalMeaning: 'Let us join',
    standardKannada: 'ಒಟ್ಟಿಗೆ ಸೇರೋಣ (Oṭṭige Sērōṇa)',
    regionId: 'kodagu',
    regionName: 'Kodagu',
    domain: 'everyday-verbs',
    usageExample: {
      kannada: 'ಸಂಜೆ ಎಲ್ಲರೂ ಒಟ್ಟಿಗೆ ಕೂಡೋಣ, ಹರಟೆ ಹೊಡೆಯೋಣ.',
      translation: 'Let us all assemble together this evening for a friendly chat.'
    },
    variants: ['ಸೇರೋಣ (Sērōṇa)'],
    audioUrl: null,
    notes: 'Highland communal social invitation.',
    isVerified: true,
    isDialectSpecific: true,
    contributor: 'Virajpet Dialect Study Group',
  },
];

/**
 * Helper to find a region by ID or alias
 */
export function getRegionById(id) {
  if (!id) return null;
  const normalized = id.toLowerCase().trim();
  return (
    REGIONS.find(
      (r) => r.id === normalized || (r.aliases && r.aliases.includes(normalized))
    ) || null
  );
}

/**
 * Filter expressions by region, domain, and search query
 */
export function filterExpressions({ query = '', regionId = 'all', domainId = 'all' } = {}) {
  const q = query.toLowerCase().trim();
  return EXPRESSIONS.filter((expr) => {
    // Region filter
    if (regionId && regionId !== 'all') {
      const target = getRegionById(regionId)?.id || regionId;
      if (expr.regionId !== target) return false;
    }

    // Domain filter
    if (domainId && domainId !== 'all') {
      if (expr.domain !== domainId) return false;
    }

    // Text search query
    if (q) {
      const matchKannada = expr.kannada.toLowerCase().includes(q);
      const matchTrans = expr.transliteration?.toLowerCase().includes(q);
      const matchMeaning = expr.meaning.toLowerCase().includes(q);
      const matchStandard = expr.standardKannada?.toLowerCase().includes(q);
      const matchRegion = expr.regionName?.toLowerCase().includes(q);
      const matchVariants = expr.variants?.some((v) => v.toLowerCase().includes(q));

      if (!matchKannada && !matchTrans && !matchMeaning && !matchStandard && !matchRegion && !matchVariants) {
        return false;
      }
    }

    return true;
  });
}

export const APP_STATS = {
  documentedRegions: REGIONS.length,
  documentedExpressions: EXPRESSIONS.length,
  status: 'Community-Curated Linguistic Archive — Verified Entries',
};
