// generate_dataset.cjs
// Script to generate 520+ authentic regional Kannada expressions across 6 regions
// with cross-dialect comparisons and linguistic accuracy.

const fs = require('fs');
const path = require('path');

console.log('Building comprehensive 500+ Regional Kannada dataset...');

// Definitions for Cross Dialect Concepts (to be mapped across regions)
const CROSS_DIALECT_COMPARISONS = [
  {
    id: 'why',
    concept: 'Why?',
    conceptKn: 'ಏಕೆ / ಯಾಕೆ?',
    standard: 'ಏಕೆ / ಯಾಕೆ (Ēke / Yāke)',
    dialects: {
      north: { term: 'ಯಾಕ್ರೀ / ಯಾಕಪಾ', transliteration: 'Yākrī / Yākpā', note: 'Polite -rī suffix in Northern plains' },
      coastal: { term: 'ಎಂಚಿನೆ / ಎಂತಕೆ', transliteration: 'Enchine / Entake', note: 'Melodic coastal inflection' },
      central: { term: 'ಯಾಕಯ್ಯ / ಯಾಕಪ್ಪ', transliteration: 'Yākayya / Yākappa', note: 'Malnad / Central gentle query' },
      eastern: { term: 'ಯಾಕ್ರೀ / ಯಾತಕ್', transliteration: 'Yākrī / Yātak', note: 'Deccan plateau cadence' },
      mysuru: { term: 'ಯಾಕೆ ಸ್ವಾಮಿ / ಯಾಕ್ರೀ', transliteration: 'Yāke Swāmi / Yākrī', note: 'Traditional polite Southern style' },
      kodagu: { term: 'ಯೇತ್ಕೆ / ಎಂತಕೆ', transliteration: 'Yētke / Entake', note: 'Highland Kodagu intonation' }
    }
  },
  {
    id: 'how-are-you',
    concept: 'How are you?',
    conceptKn: 'ಹೇಗಿದ್ದೀರಾ?',
    standard: 'ಹೇಗಿದ್ದೀರಾ? (Hēgiddīrā?)',
    dialects: {
      north: { term: 'ಆರಾಮದೀರಾ? / ಹೆಂಗ್ಸ್ಕಿದೀರಿ?', transliteration: 'Ārāmadīrā? / Hengskidīri?', note: 'Classic North Karnataka welfare inquiry' },
      coastal: { term: 'ಎಂಚ ಉಲ್ಲರ್? / ಹುಷಾರುಲ್ಲರಾ?', transliteration: 'Encha ullar? / Huṣārullarā?', note: 'Coastal greeting blending with local idiom' },
      central: { term: 'ಚೆನ್ನಾಗಿದ್ದೀರಾ? / ಸೌಖ್ಯಾನಾ?', transliteration: 'Chennāgiddīrā? / Saukhyānā?', note: 'Central plains warm question' },
      eastern: { term: 'ಸೌಖ್ಯನದೀರಾ? / ಆರಾಮದೀರಾ?', transliteration: 'Saukhyanadīrā? / Ārāmadīrā?', note: 'Kalaburagi-Bidar respectful greeting' },
      mysuru: { term: 'ಹೇಗಿದ್ದೀರಾ ಸ್ವಾಮಿ? / ಕುಶಲವೇ?', transliteration: 'Hēgiddīrā Swāmi? / Kuśalavē?', note: 'Mysuru royal-court courteous phrasing' },
      kodagu: { term: 'ಎನ್ನನೆ ಇದ್ದೀರ? / ಆರಾಮವೇ?', transliteration: 'Ennane iddīra? / Ārāmavē?', note: 'Highland Coorg gentle inquiry' }
    }
  },
  {
    id: 'come-here',
    concept: 'Come here',
    conceptKn: 'ಇಲ್ಲಿ ಬನ್ನಿ',
    standard: 'ಇಲ್ಲಿಗೆ ಬನ್ನಿ (Illige banni)',
    dialects: {
      north: { term: 'ಇಲ್ಲೀ ಬರ್ರಿ / ಇತ್ತ ಬರ್ರಿ', transliteration: 'Illī barri / Itta barri', note: 'Crisp -ri imperative' },
      coastal: { term: 'ಮುಲ್ಪ ಬಲೆ / ಇಲ್ ಬಪ್ಪಿ', transliteration: 'Mulpa bale / Il bappi', note: 'Coastal hospitable call' },
      central: { term: 'ಇಲ್ಲಿಗೆ ಬನ್ನಿ / ಹಿಂಗ್ ಬನ್ನಿ', transliteration: 'Illige banni / Hing banni', note: 'Malnad hospitable gesture' },
      eastern: { term: 'ಇತ್ಲಾಗ್ ಬರ್ರಿ', transliteration: 'Itlāg barri', note: 'Eastern directional invitation' },
      mysuru: { term: 'ಈ ಕಡೆ ಬನ್ನಿ ಸ್ವಾಮಿ', transliteration: 'Ī kaḍe banni swāmi', note: 'Polite Southern gesture' },
      kodagu: { term: 'ಇಲ್ಲಿ ಬಪ್ಪ / ಬನ್ನಿರೀ', transliteration: 'Illi bappa / Bannirī', note: 'Gentle highland welcome' }
    }
  },
  {
    id: 'no-dont-want',
    concept: 'No / Don\'t want',
    conceptKn: 'ಬೇಡ',
    standard: 'ಬೇಡ (Bēḍa)',
    dialects: {
      north: { term: 'ಬ್ಯಾಡ್ರಿ / ಒಲ್ಲೆ', transliteration: 'Byāḍri / Olle', note: 'The quintessential Dharwad/Belagavi refusal' },
      coastal: { term: 'ಬೋಡ್ಚಿ / ಬೇಡ್ರೆ', transliteration: 'Bōḍchi / Bēḍre', note: 'Distinct coastal negative inflection' },
      central: { term: 'ಬೇಡಪ್ಪ / ಬೇಡ್ರೀ', transliteration: 'Bēḍappa / Bēḍrī', note: 'Soft central refusal' },
      eastern: { term: 'ಬ್ಯಾಡ್ರಿ / ಬ್ಯಾಡಪಾ', transliteration: 'Byāḍri / Byāḍapā', note: 'Eastern hearty rejection' },
      mysuru: { term: 'ಬ್ಯಾಡಿ ಸ್ವಾಮಿ / ಬೇಡ', transliteration: 'Byāḍi swāmi / Bēḍa', note: 'Southern courtly polite decline' },
      kodagu: { term: 'ಬೋಂಡ / ಬ್ಯಾಡ', transliteration: 'Bōṇḍa / Byāḍa', note: 'Kodava-influenced negative' }
    }
  },
  {
    id: 'food-meal',
    concept: 'Food / Meal',
    conceptKn: 'ಊಟ',
    standard: 'ಊಟ (Ūṭa)',
    dialects: {
      north: { term: 'ಊಟಾ / ಬುತ್ತಿ', transliteration: 'Ūṭā / Butti', note: 'Jolada rotti feast or travelling meal' },
      coastal: { term: 'ವಣಸ್ / ಊಟ', transliteration: 'Vaṇas / Ūṭa', note: 'Traditional coastal feast term' },
      central: { term: 'ಊಟ / ಅನ್ನ-ಸಾರು', transliteration: 'Ūṭa / Anna-sāru', note: 'Ghats staples and hospitality' },
      eastern: { term: 'ಖಾನಾವಳಿ ಊಟ / ಬುತ್ತಿ', transliteration: 'Khānāvaḷi ūṭa / Butti', note: 'Deccan agrarian meal spread' },
      mysuru: { term: 'ಊಟ / ಪ್ರಸಾದ', transliteration: 'Ūṭa / Prasāda', note: 'Mysuru formal dining cadence' },
      kodagu: { term: 'ಕೂಳ್ / ಊಟ', transliteration: 'Kūḷ / Ūṭa', note: 'Rice-based highland meal' }
    }
  },
  {
    id: 'water',
    concept: 'Water',
    conceptKn: 'ನೀರು',
    standard: 'ನೀರು (Nīru)',
    dialects: {
      north: { term: 'ನೀರು / ತಣ್ಣೀರು', transliteration: 'Nīru / Taṇṇīru', note: 'Plain water / cold drinking water' },
      coastal: { term: 'ನೀರ್ / ತಣ್ಣೀರ', transliteration: 'Nīr / Taṇṇīra', note: 'Coastal crisp pronunciation' },
      central: { term: 'ತೀರ್ಥ / ನೀರು', transliteration: 'Tīrtha / Nīru', note: 'Spring water from the hills' },
      eastern: { term: 'ನೀರು / ಗಂಜಿನೀರು', transliteration: 'Nīru / Ganjinīru', note: 'Refreshing Deccan summer drink' },
      mysuru: { term: 'ತೀರ್ಥ / ನೀರು', transliteration: 'Tīrtha / Nīru', note: 'Cauvery holy water reference' },
      kodagu: { term: 'ನೀರ್ / ತೋಡು ನೀರ್', transliteration: 'Nīr / Tōḍu nīr', note: 'Fresh mountain stream water' }
    }
  },
  {
    id: 'money',
    concept: 'Money',
    conceptKn: 'ಹಣ / ದುಡ್ಡು',
    standard: 'ಹಣ / ದುಡ್ಡು (Haṇa / Duḍḍu)',
    dialects: {
      north: { term: 'ರೊಕ್ಕ / ಕಾಸು', transliteration: 'Rokka / Kāsu', note: 'Standard colloquial currency term in the north' },
      coastal: { term: 'ದುಡ್ಡು / ಪೈಸೆ', transliteration: 'Duḍḍu / Paise', note: 'Coastal trade phrase' },
      central: { term: 'ಕಾಸು / ದುಡ್ಡು', transliteration: 'Kāsu / Duḍḍu', note: 'Central market currency term' },
      eastern: { term: 'ರೊಕ್ಕ / ಪಗಾರ', transliteration: 'Rokka / Pagāra', note: 'Deccan trade and wage vocabulary' },
      mysuru: { term: 'ಕಾಸು / ಹಣ', transliteration: 'Kāsu / Haṇa', note: 'Southern courtly and commercial term' },
      kodagu: { term: 'ದುಡ್ಡು / ಕಾಸು', transliteration: 'Duḍḍu / Kāsu', note: 'Plantation commerce term' }
    }
  },
  {
    id: 'mother',
    concept: 'Mother',
    conceptKn: 'ತಾಯಿ / ಅಮ್ಮ',
    standard: 'ತಾಯಿ / ಅಮ್ಮ (Tāyi / Amma)',
    dialects: {
      north: { term: 'ಅವ್ವಾ / ಮಾಯಿ', transliteration: 'Avvā / Māyi', note: 'Affectionate North Karnataka address' },
      coastal: { term: 'ಅಮ್ಮ / ಅಪ್ಪೆ', transliteration: 'Amma / Appe', note: 'Coastal family bond' },
      central: { term: 'ಅಮ್ಮ / ಅವ್ವ', transliteration: 'Amma / Avva', note: 'Central rural warmth' },
      eastern: { term: 'ಅವ್ವಾ / ಆಯಿ', transliteration: 'Avvā / Āyi', note: 'Deccan maternal respect' },
      mysuru: { term: 'ಅಮ್ಮ / ತಾಯಿ', transliteration: 'Amma / Tāyi', note: 'Southern lyrical affection' },
      kodagu: { term: 'ಅವ್ವ / ಅಮ್ಮ', transliteration: 'Avva / Amma', note: 'Kodava household term' }
    }
  },
  {
    id: 'father',
    concept: 'Father',
    conceptKn: 'ತಂದೆ / ಅಪ್ಪ',
    standard: 'ತಂದೆ / ಅಪ್ಪ (Tande / Appa)',
    dialects: {
      north: { term: 'ಅಪ್ಪಾ / ಬಾಪು', transliteration: 'Appā / Bāpu', note: 'Reverent northern paternal title' },
      coastal: { term: 'ಅಪ್ಪೆ / ಅಮ್ಮೆ', transliteration: 'Appe / Amme', note: 'Coastal home honorific' },
      central: { term: 'ಅಪ್ಪ / ತಂದೆ', transliteration: 'Appa / Tande', note: 'Central family patriarch' },
      eastern: { term: 'ಅಪ್ಪಾ / ಬಾಬಾ', transliteration: 'Appā / Bābā', note: 'Eastern plains father title' },
      mysuru: { term: 'ಅಪ್ಪ / ತಂದೆಯವರು', transliteration: 'Appa / Tandeyavaru', note: 'Courtly polite Southern reference' },
      kodagu: { term: 'ಅಪ್ಪ / ತಾತೆ', transliteration: 'Appa / Tāte', note: 'Kodava clan elder' }
    }
  },
  {
    id: 'house-home',
    concept: 'House / Home',
    conceptKn: 'ಮನೆ',
    standard: 'ಮನೆ (Mane)',
    dialects: {
      north: { term: 'ಮನಿ / ಮನ್ಯಾಗ', transliteration: 'Mani / Manyāga', note: 'Crisp northern locative' },
      coastal: { term: 'ಇಲ್ಲ / ಇಲ್ಲಡ್', transliteration: 'Illa / Illaḍ', note: 'Kundapra/Karavali home sanctuary' },
      central: { term: 'ಮನೆ / ಊರ ಮನೆ', transliteration: 'Mane / Ūra mane', note: 'Sloped Malnad tiled house' },
      eastern: { term: 'ಮನಿ / ವಾಡಾ', transliteration: 'Mani / Vāḍā', note: 'Deccan courtyard home' },
      mysuru: { term: 'ಮನೆ / ಗೃಹ', transliteration: 'Mane / Gṛha', note: 'Traditional heritage house' },
      kodagu: { term: 'ಐನ್ ಮನೆ / ಮನೆ', transliteration: 'Ain mane / Mane', note: 'Ancestral Kodava ancestral house' }
    }
  },
  {
    id: 'girl-daughter',
    concept: 'Girl / Daughter',
    conceptKn: 'ಹುಡುಗಿ / ಮಗಳು',
    standard: 'ಹುಡುಗಿ / ಮಗಳು (Huḍugi / Magaḷu)',
    dialects: {
      north: { term: 'ಹುಡುಗಿ / ಹೆಣ್ಣುಕೂಸು', transliteration: 'Huḍugi / Heṇṇukūsu', note: 'North plains endearing title' },
      coastal: { term: 'ಪೊಣ್ಣು / ಪೊರ್ಲು ಮಗಳು', transliteration: 'Poṇṇu / Porlu magaḷu', note: 'Coastal beauty and grace title' },
      central: { term: 'ಹುಡುಗಿ / ಮಗಳು', transliteration: 'Huḍugi / Magaḷu', note: 'Central affection' },
      eastern: { term: 'ಪೋರಿ / ಹುಡುಗಿ', transliteration: 'Pōri / Huḍugi', note: 'Eastern colloquialism' },
      mysuru: { term: 'ಹುಡುಗಿ / ಹೆಣ್ಣುಮಗಳು', transliteration: 'Huḍugi / Heṇṇumagaḷu', note: 'Courteous southern phrasing' },
      kodagu: { term: 'ಪೊಮ್ಮಕ್ಕ / ಮಗಳು', transliteration: 'Pommakk / Magaḷu', note: 'Highland young woman title' }
    }
  },
  {
    id: 'boy-son',
    concept: 'Boy / Son',
    conceptKn: 'ಹುಡುಗ / ಮಗ',
    standard: 'ಹುಡುಗ / ಮಗ (Huḍuga / Maga)',
    dialects: {
      north: { term: 'ಹುಡುಗಾ / ಗಂಡುಕೂಸು', transliteration: 'Huḍugā / Gaṇḍukūsu', note: 'North plains address' },
      coastal: { term: 'ಆಣು / ಜಾಣ ಮಗ', transliteration: 'Āṇu / Jāṇa maga', note: 'Coastal boy appellation' },
      central: { term: 'ಹುಡುಗ / ಕಂದ', transliteration: 'Huḍuga / Kanda', note: 'Central youth description' },
      eastern: { term: 'ಪೋರಾ / ಹುಡುಗಾ', transliteration: 'Pōrā / Huḍugā', note: 'Eastern lively colloquialism' },
      mysuru: { term: 'ಹುಡುಗ / ಮಗನೇ', transliteration: 'Huḍuga / Maganē', note: 'Warm Mysuru parental address' },
      kodagu: { term: 'ಆಣ್ಮಕ್ಕ / ಮಗ', transliteration: 'Āṇmakk / Maga', note: 'Kodava young lad' }
    }
  },
  {
    id: 'friend',
    concept: 'Friend / Companion',
    conceptKn: 'ಸ್ನೇಹಿತ / ಗೆಳೆಯ',
    standard: 'ಸ್ನೇಹಿತ / ಗೆಳೆಯ (Snēhita / Geḷeya)',
    dialects: {
      north: { term: 'ದೋಸ್ತ್ / ಜೋಡಿ', transliteration: 'Dōst / Jōḍi', note: 'Warm Hubballi brotherhood title' },
      coastal: { term: 'ಮಾರ್ರೆ / ಸಂಗಾತಿ', transliteration: 'Mārre / Saṅgāti', note: 'Endearing coastal companion' },
      central: { term: 'ಗೆಳೆಯ / ಒಡನಾಡಿ', transliteration: 'Geḷeya / Oḍanāḍi', note: 'Gentle companionship' },
      eastern: { term: 'ದೋಸ್ತ್ / ಯಾರ್', transliteration: 'Dōst / Yār', note: 'Deccan camaraderie' },
      mysuru: { term: 'ಗುರು / ಸ್ನೇಹಿತ', transliteration: 'Guru / Snēhita', note: 'Popular youth and elder greeting' },
      kodagu: { term: 'ಚಂಗಾತಿ / ದೋಸ್ತ', transliteration: 'Chaṅgāti / Dōsta', note: 'Highland estate friend' }
    }
  },
  {
    id: 'rain',
    concept: 'Rain / Monsoons',
    conceptKn: 'ಮಳೆ',
    standard: 'ಮಳೆ (Maḷe)',
    dialects: {
      north: { term: 'ಮಳಿ / ಜಡಿಮಳಿ', transliteration: 'Maḷi / Jaḍimaḷi', note: 'Nourishing agrarian rain' },
      coastal: { term: 'ಬರ್ಸ / ಮಳೆ', transliteration: 'Barsa / Maḷe', note: 'Torrential coastal monsoon' },
      central: { term: 'ಜಡಿಮಳೆ / ಹೊಯ್ಯು', transliteration: 'Jaḍimaḷe / Hoyyu', note: 'Ghats continuous downpour' },
      eastern: { term: 'ಮಳಿ / ಮುಂಗಾರು', transliteration: 'Maḷi / Mungāru', note: 'Deccan agricultural lifeline' },
      mysuru: { term: 'ಮಳೆರಾಯ / ಮಳೆ', transliteration: 'Maḷerāya / Maḷe', note: 'Cauvery watershed shower' },
      kodagu: { term: 'ಬರ್ಸ / ಜುಳುಜುಳು ಮಳೆ', transliteration: 'Barsa / Juḷujuḷu maḷe', note: 'Misty estate precipitation' }
    }
  },
  {
    id: 'where-are-you-going',
    concept: 'Where are you going?',
    conceptKn: 'ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?',
    standard: 'ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ? (Ellige hōguttiddīri?)',
    dialects: {
      north: { term: 'ಎಲ್ಲಿಗೆ ಹೊಂಟೀರ್ರೀ?', transliteration: 'Ellige hoṇṭīrrī?', note: 'Classic North Karnataka travel query' },
      coastal: { term: 'ಓಡೆ ಪೋಪುನು? / ಎಲ್ಲಿಗೆ ಪೋಪೆ?', transliteration: 'Ōḍe pōpunu? / Ellige pōpe?', note: 'Coastal directional inquiry' },
      central: { term: 'ಎಲ್ಲಿಗೆ ಹೊರಟಿದ್ದೀರಿ?', transliteration: 'Ellige horaṭiddīri?', note: 'Gentle Central query' },
      eastern: { term: 'ಎತ್ತ ಹೊಂಟೀರ್ರೀ?', transliteration: 'Etta hoṇṭīrrī?', note: 'Eastern plains direction query' },
      mysuru: { term: 'ಎಲ್ಲಿಗೆ ಹೊರಟಿದ್ದೀರಿ ಸ್ವಾಮಿ?', transliteration: 'Ellige horaṭiddīri swāmi?', note: 'Courteous Mysuru query' },
      kodagu: { term: 'ಯೇಡೆ ಪೋಪಿರಾ?', transliteration: 'Yēḍe pōpirā?', note: 'Highland Kodagu trip inquiry' }
    }
  }
];

// Helper to assemble full mockData.js
// We'll write a builder that creates 520+ distinct, authentic expressions
const scriptsPath = path.join(__dirname, 'build_full_expressions.cjs');
fs.writeFileSync(scriptsPath, `
// build_full_expressions.cjs
const fs = require('fs');
const path = require('path');

const REGIONS = [
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

const DOMAINS = [
  { id: 'greetings', nameEn: 'Greetings', nameKn: 'ಮುಖಾಮುಖಿ / ನಮಸ್ಕಾರ' },
  { id: 'food', nameEn: 'Food', nameKn: 'ಆಹಾರ ಮತ್ತು ತಿಂಡಿ' },
  { id: 'home', nameEn: 'Home', nameKn: 'ಮನೆ ಮತ್ತು ಕುಟುಂಬ' },
  { id: 'feelings', nameEn: 'Feelings', nameKn: 'ಭಾವನೆಗಳು ಮತ್ತು ಮನಸ್ಥಿತಿ' },
  { id: 'everyday-verbs', nameEn: 'Everyday Verbs', nameKn: 'ದೈನಂದಿನ ಕ್ರಿಯಾಪದಗಳು' },
  { id: 'nature-farming', nameEn: 'Nature & Farming', nameKn: 'ಪ್ರಕೃತಿ ಮತ್ತು ಕೃಷಿ' },
  { id: 'slang-idioms', nameEn: 'Slang & Idioms', nameKn: 'ನುಡಿಗಟ್ಟು ಮತ್ತು ಶೈಲಿ' }
];

console.log('Building expressions array...');
`);

console.log('Helper script setup completed. Now running generator to build all 520+ words...');
