import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Languages, 
  Volume2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Share2,
  BookOpen
} from 'lucide-react';
import { REGIONS } from '../data/mockData';
import './Translator.css';

// Pre-defined sentences with authentic regional translations
const PRESET_SENTENCES = [
  {
    standard: 'ನಾನು ಊರಿಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ',
    english: 'I am going to my hometown / village',
    translations: {
      north: { text: 'ನಾ ಊರಿಗೆ ಹೊಂಟೇನಿ', note: 'Contraction of ಹೋಗುತ್ತಿದ್ದೇನೆ to ಹೊಂಟೇನಿ' },
      coastal: { text: 'ಯಾನ್ ಊರಿಗೆ ಪೋಪೆ ಮಾರ್ರೆ', note: 'Kundapra verb ending -ಪೆ with customary ಮಾರ್ರೆ' },
      mysuru: { text: 'ನಾನು ಊರಿಗೆ ಹೊರಟಿದ್ದೀನಿ ಕಣ್ರೀ', note: 'Polite southern cadence with ಕಣ್ರೀ tag' },
      central: { text: 'ನಾನು ಊರಿಗೆ ಹೊರಟಿದ್ದೀನಿ ಕಣಯ್ಯ', note: 'Malnad friendly address' },
      eastern: { text: 'ನಾ ಊರಿಗೆ ಹೊಂಟೇನ್ರಿ', note: 'Deccan respectful -ರಿ ending' },
      kodagu: { text: 'ನಾನ್ ಊರ್ಗೆ ಪೋಪ', note: 'Highland Kodava spoken form' }
    }
  },
  {
    standard: 'ಊಟ ಆಯ್ತಾ? ಏನು ತಿಂದ್ರಿ?',
    english: 'Did you have your meal? What did you eat?',
    translations: {
      north: { text: 'ಊಟ ಆತೇನ್ರಿ? ಏನ್ ತಿಂದ್ರಿ?', note: 'Shortened vowel inflection ಆತೇನ್ರಿ' },
      coastal: { text: 'ವಣಸ್ ಆತಾ ಮಾರ್ರೆ? ಎಂಚಿನ ತಿಂದರ್?', note: 'Coastal festive meal term ವಣಸ್ and ಎಂಚಿನ' },
      mysuru: { text: 'ಊಟ ಆಯ್ತಾ ಸ್ವಾಮಿ? ಏನು ತಗೊಂಡ್ರಿ?', note: 'Polite honorific phrasing with ಸ್ವಾಮಿ' },
      central: { text: 'ಊಟ ಆಯ್ತಾ? ಏನು ಊಟ ಮಾಡಿದ್ರಿ?', note: 'Warm central family question' },
      eastern: { text: 'ಊಟ ಆತೇನ್ರಿ? ಏನ್ ತಿಂದ್ರೀಪಾ?', note: 'Deccan hospitality address' },
      kodagu: { text: 'ಕೂಳ್ ಆಯಿತಾ? ಎನ್ನನೆ ತಿಂದಿರ?', note: 'Kodava staple meal term ಕೂಳ್' }
    }
  },
  {
    standard: 'ಹೇಗಿದ್ದೀರಾ? ಎಲ್ಲರೂ ಕ್ಷೇಮವೇ?',
    english: 'How are you? Is everyone well?',
    translations: {
      north: { text: 'ಆರಾಮದೀರಾ? ಮನ್ಯಾಗ ಎಲ್ಲಾರೂ ಆರಾಮ?', note: 'Signature Hubballi welfare greeting' },
      coastal: { text: 'ಎಂಚ ಉಲ್ಲರ್ ಮಾರ್ರೆ? ಇಲ್ಲಡ್ ಎಲ್ಲ ಎಡ್ಡೇನಾ?', note: 'Classic coastal inquiry and இல்லಡ್' },
      mysuru: { text: 'ಹೇಗಿದ್ದೀರಾ ಸ್ವಾಮಿ? ಮನೆಯಲ್ಲಿ ಎಲ್ಲರೂ ಕುಶಲವೇ?', note: 'Refined courtly Mysuru greeting' },
      central: { text: 'ಚೆನ್ನಾಗಿದ್ದೀರಾ? ಮನೆಯಲ್ಲಿ ಸೌಖ್ಯಾನಾ?', note: 'Central plains warm question' },
      eastern: { text: 'ಸೌಖ್ಯನದೀರಾ? ಎಲ್ಲಾರೂ ಆರಾಮದೀರಾ?', note: 'Kalyana Karnataka respectful inquiry' },
      kodagu: { text: 'ಎನ್ನನೆ ಇದ್ದೀರ? ಎಲ್ಲಾರೂ ಆರಾಮವೇ?', note: 'Highland Kodagu inquiry' }
    }
  },
  {
    standard: 'ಬೇಗ ಬಾ, ತಡವಾಗುತ್ತಿದೆ!',
    english: 'Come quickly, it is getting late!',
    translations: {
      north: { text: 'ಲಗೂನ ಬಾ, ತಡ ಆಗಾಕತ್ತೇತಿ!', note: 'North plains speed imperative ಲಗೂನ' },
      coastal: { text: 'ಬೇಗ ಬಲೆ ಮಾರ್ರೆ, ಟೈಮ್ ಆಪುಂಡು!', note: 'Coastal imperative ಬಲೆ' },
      mysuru: { text: 'ಬೇಗ ಬಾರೋ, ಸಿಕ್ಕಾಪಟ್ಟೆ ಲೇಟ್ ಆಗ್ತಿದೆ!', note: 'Colloquial Mysuru-Mandya urgency' },
      central: { text: 'ಜಲ್ದಿ ಬಾ, ತಡ ಆಗ್ತಿದೆ ಕಣಯ್ಯ!', note: 'Central brisk instruction' },
      eastern: { text: 'ಲಗೂನ ಬರ್ರಿ, ಹೊತ್ತಾಗಾಕತ್ತೇತಿ!', note: 'Deccan sunset urgency' },
      kodagu: { text: 'ಬೇಗ ಬಪ್ಪ, ಹೊತ್ತು ಕಳೆಯುತಿದೆ!', note: 'Highland promptness' }
    }
  },
  {
    standard: 'ಇವತ್ತು ತುಂಬಾ ಬಿಸಿಲಿದೆ',
    english: 'It is extremely hot today',
    translations: {
      north: { text: 'ಇವತ್ತು ಶ್ಯಾನೆ ಬಿಸಿಲ ಐತಿ!', note: 'ಶ್ಯಾನೆ (very much) + ಐತಿ (it is)' },
      coastal: { text: 'ಇನಿ ಭಾರಿ ಬಿಸಿಲುಂಟು ಮಾರ್ರೆ!', note: 'ಇನಿ (today) + ಭಾರಿ (heavy)' },
      mysuru: { text: 'ಇವತ್ತು ಸಿಕ್ಕಾಪಟ್ಟೆ ಬಿಸಿಲು ಗುರು!', note: 'ಸಿಕ್ಕಾಪಟ್ಟೆ (intense) + ಗುರು (buddy)' },
      central: { text: 'ಇವತ್ತು ಬಹಳ ಬಿಸಿಲಿದೆ ಕಣಪ್ಪ!', note: 'Central warm emphasis' },
      eastern: { text: 'ಇವತ್ತು ಶ್ಯಾನೆ ತಾಪ ಐತ್ರಿ!', note: 'Deccan plateau heat phrase' },
      kodagu: { text: 'ಇಂದ್ ಭಾರೀ ಬಿಸಿಲುಂಟು!', note: 'Kodagu climate remark' }
    }
  },
  {
    standard: 'ಏನು ಮಾಡುತ್ತಿದ್ದೀಯಾ?',
    english: 'What are you doing?',
    translations: {
      north: { text: 'ಏನ್ ಮಾಡಾಕತ್ತೀ?', note: 'North verb progressive aspect -ಆಕತ್ತೀ' },
      coastal: { text: 'ಎಂಚಿನ ಮಲ್ತೊಂದುಲ್ಲ ಮಾರ್ರೆ?', note: 'Tulu-influenced coastal progressive verb' },
      mysuru: { text: 'ಏನ್ ಮಾಡ್ತಿದೀಯ ಕಣ್ಲಾ?', note: 'Mandya rural colloquial tag ಕಣ್ಲಾ' },
      central: { text: 'ಏನ್ ಮಾಡ್ತಿದ್ದೀಯಪ್ಪ?', note: 'Central friendly question' },
      eastern: { text: 'ಏನ್ ಮಾಡಾಕತ್ತೀರ್ರೀ?', note: 'Respectful eastern progressive' },
      kodagu: { text: 'ಎನ್ನನೆ ಮಾಡ್ತಿರಾ?', note: 'Kodava dialect question' }
    }
  },
  {
    standard: 'ಇವತ್ತು ಮಳೆ ಬರುವಂತಿದೆ',
    english: 'It looks like it will rain today',
    translations: {
      north: { text: 'ಇವತ್ತು ಮಳಿ ಬರ್ತದ ಅಂತೀನಿ!', note: 'ಮಳಿ + ಅಂತೀನಿ conversational marker' },
      coastal: { text: 'ಇನಿ ಬರ್ಸ ಬಪ್ಪ ಹಾಂಗೆ ಉಂಟು!', note: 'ಬರ್ಸ (monsoon rain) + ಬಪ್ಪ (coming)' },
      mysuru: { text: 'ಇವತ್ತು ಮಳೆರಾಯ ಬರ್ತಾನೆ ಕಣ್ರೀ!', note: 'ಮಳೆರಾಯ (personified rain god)' },
      central: { text: 'ಇವತ್ತು ಜಡಿಮಳೆ ಸುರಿಯುತ್ತೆ ನೋಡು!', note: 'ಜಡಿಮಳೆ (continuous hill downpour)' },
      eastern: { text: 'ಇವತ್ತು ಮಳಿ ಹೊಯ್ಯೋ ಹಂಗಾದ!', note: 'Eastern plains rain phrase' },
      kodagu: { text: 'ಇಂದ್ ಬರ್ಸ ಸುರಿಯುವ ಹಾಗೆ ಉಂಟು!', note: 'Highland mist-rain anticipation' }
    }
  }
];

// Word dictionary for dynamic rule-based sentence conversion
const WORD_MAPS = {
  north: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಆರಾಮದೀರಾ',
    'ಏನು': 'ಏನ್',
    'ಮಾಡುತ್ತಿದ್ದೀಯಾ': 'ಮಾಡಾಕತ್ತೀ',
    'ಮಾಡುತ್ತಿದ್ದೀರಿ': 'ಮಾಡಾಕತ್ತೀರಿ',
    'ಬೇಡ': 'ಬ್ಯಾಡ್ರಿ',
    'ತುಂಬಾ': 'ಶ್ಯಾನೆ',
    'ಬಹಳ': 'ಶ್ಯಾನೆ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಹೊಂಟೇನಿ',
    'ಬರುತ್ತೇನೆ': 'ಬರ್ತೀನಿ',
    'ಇಲ್ಲ': 'ಇಲ್ರಿ',
    'ಹೌದು': 'ಹೌದ್ರಿ',
    'ಮನೆ': 'ಮನಿ',
    'ಮನೆಯಲ್ಲಿ': 'ಮನ್ಯಾಗ',
    'ನೀರು': 'ತಣ್ಣೀರು',
    'ಊಟ': 'ಊಟಾ',
    'ಬೇಗ': 'ಲಗೂನ',
    'ಸ್ನೇಹಿತ': 'ದೋಸ್ತ್',
    'ಮಳೆ': 'ಮಳಿ',
    'ಕೋಪ': 'ಸಿಟ್ಟು',
    'ಇಲ್ಲಿಗೆ': 'ಇಲ್ಲಿಗೆ',
    'ಬನ್ನಿ': 'ಬರ್ರಿ',
  },
  coastal: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಎಂಚ ಉಲ್ಲರ್',
    'ಏನು': 'ಎಂಚಿನ',
    'ಮಾಡುತ್ತಿದ್ದೀಯಾ': 'ಮಲ್ತೊಂದುಲ್ಲ',
    'ಮಾಡುತ್ತಿದ್ದೀರಿ': 'ಮಲ್ತೊಂದುಲ್ಲರ್',
    'ಬೇಡ': 'ಬೋಡ್ಚಿ',
    'ತುಂಬಾ': 'ಭಾರಿ',
    'ಬಹಳ': 'ಭಾರಿ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಪೋಪೆ',
    'ಬರುತ್ತೇನೆ': 'ಬರ್ಪೆ',
    'ಇಲ್ಲ': 'ಇಜ್ಜಿ',
    'ಹೌದು': 'ಅಂದ್',
    'ಮನೆ': 'ಇಲ್ಲ',
    'ಮನೆಯಲ್ಲಿ': 'ಇಲ್ಲಡ್',
    'ನೀರು': 'ನೀರ್',
    'ಊಟ': 'ವಣಸ್',
    'ಬೇಗ': 'ಬೇಗ ಬಲೆ',
    'ಸ್ನೇಹಿತ': 'ಮಾರ್ರೆ',
    'ಮಳೆ': 'ಬರ್ಸ',
    'ಕೋಪ': 'ರೇಗು',
    'ಇಲ್ಲಿಗೆ': 'ಮುಲ್ಪ',
    'ಬನ್ನಿ': 'ಬಲೆ',
  },
  mysuru: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಹೇಗಿದ್ದೀರಾ ಸ್ವಾಮಿ',
    'ಏನು': 'ಏನ್',
    'ಮಾಡುತ್ತಿದ್ದೀಯಾ': 'ಮಾಡ್ತಿದೀಯ ಕಣ್ಲಾ',
    'ಬೇಡ': 'ಬ್ಯಾಡಿ ಸ್ವಾಮಿ',
    'ತುಂಬಾ': 'ಸಿಕ್ಕಾಪಟ್ಟೆ',
    'ಬಹಳ': 'ಸಿಕ್ಕಾಪಟ್ಟೆ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಹೊರಟಿದ್ದೀನಿ',
    'ಬರುತ್ತೇನೆ': 'ಬರ್ತೀನಿ ಕಣ್ರೀ',
    'ಮನೆ': 'ಮನೆ',
    'ಮನೆಯಲ್ಲಿ': 'ಮನೆಯಲ್ಲಿ',
    'ನೀರು': 'ತೀರ್ಥ',
    'ಊಟ': 'ಊಟ',
    'ಬೇಗ': 'ಬೇಗ ಬಾರೋ',
    'ಸ್ನೇಹಿತ': 'ಗುರು',
    'ಮಳೆ': 'ಮಳೆರಾಯ',
    'ಇಲ್ಲಿಗೆ': 'ಈ ಕಡೆ',
    'ಬನ್ನಿ': 'ಬನ್ನಿ ಸ್ವಾಮಿ',
  },
  central: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಚೆನ್ನಾಗಿದ್ದೀರಾ',
    'ಮಾಡುತ್ತಿದ್ದೀಯಾ': 'ಮಾಡ್ತಿದ್ದೀಯಪ್ಪ',
    'ಬೇಡ': 'ಬೇಡಪ್ಪ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಹೊರಟಿದ್ದೇನೆ',
    'ಮನೆಯಲ್ಲಿ': 'ಮನೆಯಲ್ಲಿ',
    'ಬೇಗ': 'ಜಲ್ದಿ',
    'ಮಳೆ': 'ಜಡಿಮಳೆ',
    'ಸ್ನೇಹಿತ': 'ಗೆಳೆಯ',
    'ಬನ್ನಿ': 'ಹಿಂಗ್ ಬನ್ನಿ',
  },
  eastern: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಸೌಖ್ಯನದೀರಾ',
    'ಮಾಡುತ್ತಿದ್ದೀಯಾ': 'ಮಾಡಾಕತ್ತೀರಾ',
    'ಬೇಡ': 'ಬ್ಯಾಡ್ರಿ',
    'ತುಂಬಾ': 'ಶ್ಯಾನೆ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಹೊಂಟೇನ್ರಿ',
    'ಬೇಗ': 'ಲಗೂನ',
    'ಮಳೆ': 'ಮಳಿ',
    'ಸ್ನೇಹಿತ': 'ದೋಸ್ತ್',
    'ಇಲ್ಲಿಗೆ': 'ಇತ್ಲಾಗ್',
    'ಬನ್ನಿ': 'ಬರ್ರಿ',
  },
  kodagu: {
    'ಹೇಗಿದ್ದೀರಾ': 'ಎನ್ನನೆ ಇದ್ದೀರ',
    'ಏನು': 'ಎನ್ನನೆ',
    'ಬೇಡ': 'ಬೋಂಡ',
    'ತುಂಬಾ': 'ಭಾರೀ',
    'ಹೋಗುತ್ತಿದ್ದೇನೆ': 'ಪೋಪ',
    'ಬರುತ್ತೇನೆ': 'ಬಪ್ಪ',
    'ಮನೆ': 'ಐನ್ ಮನೆ',
    'ನೀರು': 'ತೋಡು ನೀರ್',
    'ಊಟ': 'ಕೂಳ್',
    'ಬೇಗ': 'ಬೇಗ ಬಪ್ಪ',
    'ಸ್ನೇಹಿತ': 'ಚಂಗಾತಿ',
    'ಮಳೆ': 'ಬರ್ಸ',
    'ಬನ್ನಿ': 'ಇಲ್ಲಿ ಬಪ್ಪ',
  }
};

export default function Translator() {
  const [inputText, setInputText] = useState(PRESET_SENTENCES[0].standard);
  const [copiedRegion, setCopiedRegion] = useState(null);
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  // Compute translation results
  const currentTranslation = React.useMemo(() => {
    // Check if it matches a preset exactly
    const matchedPreset = PRESET_SENTENCES.find(
      (p) => p.standard.trim() === inputText.trim()
    );

    if (matchedPreset) {
      return {
        english: matchedPreset.english,
        results: matchedPreset.translations
      };
    }

    // Dynamic word-by-word dialect rule engine
    const results = {};
    for (const reg of REGIONS) {
      const regId = reg.id;
      const map = WORD_MAPS[regId] || {};
      let converted = inputText;

      // Replace known keywords
      for (const [key, replacement] of Object.entries(map)) {
        const regex = new RegExp(key, 'gi');
        converted = converted.replace(regex, replacement);
      }

      // Add regional flavor tag if unchanged
      if (converted === inputText) {
        if (regId === 'north') converted += ' ರೀ';
        else if (regId === 'coastal') converted += ' ಮಾರ್ರೆ';
        else if (regId === 'mysuru') converted += ' ಕಣ್ರೀ';
        else if (regId === 'eastern') converted += ' ಪಾ';
      }

      results[regId] = {
        text: converted,
        note: `Dynamic dialect cadence mapped for ${reg.nameEn}.`
      };
    }

    return {
      english: 'Custom input expression',
      results
    };
  }, [inputText]);

  // Handle Preset Selection
  const handleSelectPreset = (index) => {
    setActivePresetIndex(index);
    setInputText(PRESET_SENTENCES[index].standard);
  };

  // Text to speech
  const speakKannada = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Copy to clipboard
  const handleCopy = (text, regId) => {
    navigator.clipboard.writeText(text);
    setCopiedRegion(regId);
    setTimeout(() => setCopiedRegion(null), 2000);
  };

  return (
    <div className="translator-page">
      <div className="site-container">

        {/* Header */}
        <div className="translator-header">
          <div className="eyebrow">
            <span className="eyebrow-rule" /> ಉಪಭಾಷಾ ಅನುವಾದಕ · Real-Time Regional Dialect Converter
          </div>
          <h1 className="translator-title">
            ಕನ್ನಡ ಉಪಭಾಷಾ ಪರಿವರ್ತಕ
          </h1>
          <p className="translator-subtitle">
            Type or pick any standard Kannada sentence and watch it instantly transform into authentic regional speech across North Karnataka, Coastal Karavali, Mysuru-Mandya, Central Malnad, Eastern Deccan, and Kodagu!
          </p>
        </div>

        {/* Input Card */}
        <div className="translator-input-card">
          <div className="input-card-top">
            <span className="input-label">
              <Languages size={16} /> ಪ್ರಮಾಣ ಕನ್ನಡ (Standard Kannada Input)
            </span>
            <span className="input-hint">Type below or choose a preset phrase</span>
          </div>

          <textarea
            className="translator-textarea kannada-text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setActivePresetIndex(-1);
            }}
            placeholder="ಇಲ್ಲಿ ಕನ್ನಡ ವಾಕ್ಯವನ್ನು ಬರೆಯಿರಿ (e.g. ನಾನು ಊರಿಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ, ಹೇಗಿದ್ದೀರಾ, ಊಟ ಆಯ್ತಾ)..."
            rows={3}
          />

          {currentTranslation.english && (
            <div className="input-english-translation">
              <em>English:</em> &ldquo;{currentTranslation.english}&rdquo;
            </div>
          )}

          {/* Preset Buttons */}
          <div className="preset-sentences-bar">
            <span className="presets-title">ಜನಪ್ರಿಯ ವಾಕ್ಯಗಳು (Popular Presets):</span>
            <div className="presets-list">
              {PRESET_SENTENCES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-btn ${activePresetIndex === idx ? 'active' : ''}`}
                  onClick={() => handleSelectPreset(idx)}
                >
                  <span className="preset-btn-kn">{p.standard}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Regional Dialects Output Grid */}
        <div className="translator-results-section">
          <div className="results-heading-row">
            <div>
              <h2 className="results-title">೬ ಪ್ರಾದೇಶಿಕ ಉಪಭಾಷೆಗಳಲ್ಲಿ (In 6 Regional Dialects)</h2>
              <p className="results-desc">Listen to pronunciations, copy authentic dialect phrasing, or explore regional nuances:</p>
            </div>
            <div className="results-badge">
              <Sparkles size={14} /> Real-Time Engine
            </div>
          </div>

          <div className="translator-grid">
            {REGIONS.map((reg) => {
              const res = currentTranslation.results[reg.id] || { text: inputText, note: '' };
              const isCopied = copiedRegion === reg.id;

              return (
                <div
                  key={reg.id}
                  className="dialect-result-card"
                  style={{ borderTopColor: reg.accentColor }}
                >
                  <div className="result-card-header">
                    <div>
                      <span className="result-reg-kn">{reg.nameKn}</span>
                      <div className="result-reg-en">{reg.nameEn} ({reg.short})</div>
                    </div>
                    <span
                      className="region-indicator-dot"
                      style={{ backgroundColor: reg.accentColor }}
                    />
                  </div>

                  <div className="result-card-body">
                    <div className="result-translated-text kannada-text">
                      &ldquo;{res.text}&rdquo;
                    </div>
                    {res.note && (
                      <p className="result-dialect-note">
                        💡 {res.note}
                      </p>
                    )}
                  </div>

                  <div className="result-card-footer">
                    <button
                      type="button"
                      className="result-action-btn speak-btn"
                      onClick={() => speakKannada(res.text)}
                      title="Listen in Kannada"
                    >
                      <Volume2 size={15} /> Listen
                    </button>

                    <button
                      type="button"
                      className={`result-action-btn copy-btn ${isCopied ? 'copied' : ''}`}
                      onClick={() => handleCopy(res.text, reg.id)}
                      title="Copy translation"
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>

                    <Link
                      to={`/explore?region=${reg.id}`}
                      className="result-explore-link"
                    >
                      Explore {reg.short} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature info banner */}
        <div className="translator-info-banner">
          <div className="info-icon">
            <BookOpen size={24} />
          </div>
          <div className="info-content">
            <h3>ಕನ್ನಡ ಉಪಭಾಷೆಗಳ ಸೊಬಗು (The Beauty of Kannada Dialects)</h3>
            <p>
              Unlike standard textbook Kannada, spoken regional varieties possess rich phonetic contractions, musical intonations, and unique honorifics like the northern &ldquo;-ರೀ&rdquo; (Dharwad), coastal &ldquo;ಮಾರ್ರೆ&rdquo; (Kundapura/Mangaluru), and southern courtly &ldquo;ಕಣ್ರೀ&rdquo; (Mysuru).
            </p>
          </div>
          <Link to="/compare" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
            Open Word Comparator <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}
