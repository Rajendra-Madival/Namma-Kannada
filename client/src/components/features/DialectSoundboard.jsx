import React, { useState } from 'react';
import { Volume2, Sparkles, Shuffle, Check, Copy } from 'lucide-react';
import { REGIONS } from '../../data/mockData';
import './DialectSoundboard.css';

const SOUNDBOARD_DATA = {
  north: [
    { kannada: 'ಬ್ಯಾಡ್ರಿ!', transliteration: 'Byādri!', meaning: 'No need / Please don\'t!', nuance: 'Respectful -ri honorific' },
    { kannada: 'ಖರೇನಾ?', transliteration: 'Kharēnā?', meaning: 'Is it truly so?', nuance: 'Incredulous query' },
    { kannada: 'ಶ್ಯಾನೆ ಚೊಲೋ ಐತಿ!', transliteration: 'Śyāne cholō aiti!', meaning: 'It is exceedingly splendid!', nuance: 'High praise' },
    { kannada: 'ಲಗೂನ ನಡೀರಿ!', transliteration: 'Lagūna naḍīri!', meaning: 'Walk quickly without delay!', nuance: 'Northern urgency' },
    { kannada: 'ಮನ್ಯಾಗ ಎಲ್ಲಾರೂ ಆರಾಮ?', transliteration: 'Manyāga ellārū ārāma?', meaning: 'Is everyone well at home?', nuance: 'Family inquiry' },
    { kannada: 'ಗಿರ್ಮಿಟ್ ಮಿರ್ಚಿ ತಿನ್ರಿ!', transliteration: 'Girmiṭ mirchi tinri!', meaning: 'Have girmit and hot bajjis!', nuance: 'Street snack hospitality' },
  ],
  coastal: [
    { kannada: 'ಮಾರ್ರೆ!', transliteration: 'Mārre!', meaning: 'My dear friend / Buddy!', nuance: 'Ubiquitous coastal address' },
    { kannada: 'ಎಂಚ ಉಲ್ಲರ್?', transliteration: 'Encha ullar?', meaning: 'How are you holding up?', nuance: 'Melodic coastal greeting' },
    { kannada: 'ಕೊರೆಸಬೇಡ ಮಾರ್ರೆ!', transliteration: 'Koresabēḍa mārre!', meaning: 'Don\'t blabber aimlessly!', nuance: 'Friendly chiding' },
    { kannada: 'ಭಾರಿ ಪೊರ್ಲುಂಟು!', transliteration: 'Bhāri porlunṭu!', meaning: 'Gorgeously beautiful!', nuance: 'Coastal aesthetic exclamation' },
    { kannada: 'ಬರ್ಪೆ ಮಾರ್ರೆ!', transliteration: 'Barpe mārre!', meaning: 'I am coming right away!', nuance: 'Distinct -ಪೆ verb ending' },
    { kannada: 'ವಣಸ್ ಆತಾ?', transliteration: 'Vaṇas ātā?', meaning: 'Did you have the feast?', nuance: 'Traditional meal term' },
  ],
  mysuru: [
    { kannada: 'ಕಣ್ರೀ!', transliteration: 'Kaṇrī!', meaning: 'You see / Indeed so!', nuance: 'Courtly polite tag' },
    { kannada: 'ಬಾ ಗುರು!', transliteration: 'Bā Guru!', meaning: 'Come along pal!', nuance: 'Youth & friendly address' },
    { kannada: 'ಬುಡಿ ಕಣ್ಲಾ!', transliteration: 'Buḍi kaṇlā!', meaning: 'Leave it alone brother!', nuance: 'Mandya rural dismissive' },
    { kannada: 'ಹೇಗಿದ್ದೀರಾ ಸ್ವಾಮಿ?', transliteration: 'Hēgiddīrā swāmi?', meaning: 'How are you respected sir?', nuance: 'Mysuru courtly greeting' },
    { kannada: 'ಸಿಕ್ಕಾಪಟ್ಟೆ ಮಜಾ!', transliteration: 'Sikkāpaṭṭe majā!', meaning: 'Immense, unbounded fun!', nuance: 'Southern exuberance' },
    { kannada: 'ಸ್ವಲ್ಪ ಬಸ್ಸಾರು ತಗೊಳ್ಳಿ!', transliteration: 'Svalpa bassāru tagoḷḷi!', meaning: 'Please take some more bassaru!', nuance: 'Agrarian dining hospitality' },
  ],
  central: [
    { kannada: 'ಬೆಣ್ಣೆ ದೋಸೆ ತಿನ್ನೋಣು!', transliteration: 'Beṇṇe dōse tinnōṇu!', meaning: 'Let us relish crisp butter dosa!', nuance: 'Davanagere pride' },
    { kannada: 'ಜಡಿಮಳೆ ಸುರಿಯುತ್ತಿದೆ!', transliteration: 'Jaḍimaḷe suriyuttide!', meaning: 'Continuous torrential rains!', nuance: 'Malnad monsoon' },
    { kannada: 'ಹಿಂಗ್ ಬನ್ನಿ ಕಣಪ್ಪ!', transliteration: 'Hing banni kaṇappa!', meaning: 'Step this way dear friend!', nuance: 'Central warmth' },
    { kannada: 'ಚೆನ್ನಾಗಿದ್ದೀರಾ?', transliteration: 'Chennāgiddīrā?', meaning: 'Are you doing well?', nuance: 'Traditional greeting' },
    { kannada: 'ಕಾಯಿಸಾರು ಘಮ ಘಮ!', transliteration: 'Kāyisāru ghama ghama!', meaning: 'Aromatic coconut pepper broth!', nuance: 'Ghats cuisine' },
    { kannada: 'ಜಲ್ದಿ ಬಾ!', transliteration: 'Jaldi bā!', meaning: 'Come swiftly!', nuance: 'Brisk pace' },
  ],
  eastern: [
    { kannada: 'ಬರ್ರಿ ಶರಣು!', transliteration: 'Barri śaraṇu!', meaning: 'Welcome with deep reverence!', nuance: 'Vachana hospitality' },
    { kannada: 'ಕಾಯಕವೇ ಕೈಲಾಸ!', transliteration: 'Kāyakavē kailāsa!', meaning: 'Dedicated work is heaven itself!', nuance: 'Basava eternal motto' },
    { kannada: 'ಸೌಖ್ಯನದೀರಾ ಅಪ್ಪಗೋರೇ?', transliteration: 'Saukhyanadīrā appagōrē?', meaning: 'Are you peaceful respected elder?', nuance: 'Deccan reverence' },
    { kannada: 'ಇತ್ಲಾಗ್ ಬರ್ರಿ!', transliteration: 'Itlāg barri!', meaning: 'Please step over to this side!', nuance: 'Deccan direction' },
    { kannada: 'ಶೇಂಗಾ ಹೋಳಿಗೆ ಸವಿಯಿರಿ!', transliteration: 'Śēṅgā hōḷige saviyiri!', meaning: 'Relish crisp peanut holige!', nuance: 'Kalaburagi festive sweet' },
    { kannada: 'ದೋಸ್ತ್ ಯಾರ್!', transliteration: 'Dōst yār!', meaning: 'My beloved true comrade!', nuance: 'Deccan camaraderie' },
  ],
  kodagu: [
    { kannada: 'ಠಕ್ ಠಕ್!', transliteration: 'Ṭhak Ṭhak!', meaning: 'Top-class! Absolutely superb!', nuance: 'Kodava high praise' },
    { kannada: 'ಬೋಂಡ ಬ್ಯಾಡ!', transliteration: 'Bōṇḍa byāḍa!', meaning: 'No, don\'t want that!', nuance: 'Kodava negative' },
    { kannada: 'ಎನ್ನನೆ ಇದ್ದೀರ?', transliteration: 'Ennane iddīra?', meaning: 'How have you been in the hills?', nuance: 'Highland inquiry' },
    { kannada: 'ಪಂಡಿ ಕರ್ರಿ ಕಡಂಬುಟ್ಟು!', transliteration: 'Paṇḍi karri kaḍambuṭṭu!', meaning: 'Spicy curry with rice dumplings!', nuance: 'Festive identity feast' },
    { kannada: 'ಇಲ್ಲಿ ಬಪ್ಪ ಚಂಗಾತಿ!', transliteration: 'Illi bappa chaṅgāti!', meaning: 'Come here dear companion!', nuance: 'Highland welcome' },
    { kannada: 'ಕಾಫಿ ಹೂವಿನ ಘಮ!', transliteration: 'Kāphi hūvina ghama!', meaning: 'Aroma of white coffee blooms!', nuance: 'Estate blessing' },
  ]
};

export default function DialectSoundboard() {
  const [activeRegion, setActiveRegion] = useState('north');
  const [playingIndex, setPlayingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const regionObj = REGIONS.find((r) => r.id === activeRegion) || REGIONS[0];
  const phrases = SOUNDBOARD_DATA[activeRegion] || SOUNDBOARD_DATA.north;

  const playSpeech = (text, index) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[!?,]/g, ''));
      utterance.lang = 'kn-IN';
      utterance.rate = 0.88;
      setPlayingIndex(index);
      utterance.onend = () => setPlayingIndex(null);
      utterance.onerror = () => setPlayingIndex(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleSurprise = () => {
    const allRegions = Object.keys(SOUNDBOARD_DATA);
    const randomReg = allRegions[Math.floor(Math.random() * allRegions.length)];
    setActiveRegion(randomReg);
    const list = SOUNDBOARD_DATA[randomReg];
    const randomPhraseIdx = Math.floor(Math.random() * list.length);
    setTimeout(() => {
      playSpeech(list[randomPhraseIdx].kannada, randomPhraseIdx);
    }, 150);
  };

  return (
    <section className="soundboard-section site-container" aria-labelledby="soundboard-title">
      <div className="soundboard-card">
        {/* Header */}
        <div className="soundboard-header">
          <div>
            <div className="eyebrow" style={{ color: '#F4C430' }}>
              <span className="eyebrow-rule" style={{ backgroundColor: '#F4C430' }} />
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              ಕರ್ನಾಟಕ ಧ್ವನಿ ಪೆಟ್ಟಿಗೆ · Interactive Dialect Soundboard
            </div>
            <h2 id="soundboard-title" className="soundboard-title">
              ಕ್ಲಿಕ್ ಮಾಡಿ — ಆಯಾ ಪ್ರಾಂತ್ಯದ ಧ್ವನಿ ಆಲಿಸಿ!
            </h2>
            <p className="soundboard-subtitle">
              Tap any phrase card to hear authentic spoken regional intonations, cadences, and signature local expressions.
            </p>
          </div>

          <button
            type="button"
            className="soundboard-shuffle-btn"
            onClick={handleSurprise}
            title="Play a random surprise phrase"
          >
            <Shuffle size={16} /> Surprise Phrase
          </button>
        </div>

        {/* Region Tabs */}
        <div className="soundboard-tabs-bar" role="tablist">
          {REGIONS.map((reg) => (
            <button
              key={reg.id}
              type="button"
              role="tab"
              aria-selected={activeRegion === reg.id}
              className={`soundboard-tab ${activeRegion === reg.id ? 'is-active' : ''}`}
              onClick={() => setActiveRegion(reg.id)}
              style={{
                '--tab-color': reg.accentColor,
              }}
            >
              <span className="tab-dot" style={{ backgroundColor: reg.accentColor }} />
              <span className="tab-text-kn">{reg.nameKn}</span>
              <span className="tab-text-en">({reg.short})</span>
            </button>
          ))}
        </div>

        {/* Phrases Grid */}
        <div className="soundboard-grid">
          {phrases.map((item, idx) => {
            const isPlaying = playingIndex === idx;
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={idx}
                className={`soundboard-item-card ${isPlaying ? 'is-playing' : ''}`}
                onClick={() => playSpeech(item.kannada, idx)}
                style={{ borderTopColor: regionObj.accentColor }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playSpeech(item.kannada, idx);
                  }
                }}
              >
                <div className="soundboard-item-top">
                  <span className="soundboard-nuance-tag">{item.nuance}</span>
                  <button
                    type="button"
                    className="soundboard-copy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.kannada, idx);
                    }}
                    title="Copy phrase"
                  >
                    {isCopied ? <Check size={13} style={{ color: '#4caf50' }} /> : <Copy size={13} />}
                  </button>
                </div>

                <div className="soundboard-item-body">
                  <div className="soundboard-phrase-kn kannada-text">{item.kannada}</div>
                  <div className="soundboard-phrase-tr">{item.transliteration}</div>
                  <div className="soundboard-phrase-mean">&ldquo;{item.meaning}&rdquo;</div>
                </div>

                <div className="soundboard-item-footer">
                  <span className="play-cue">
                    <Volume2 size={15} className={isPlaying ? 'wave-pulse' : ''} />
                    <span>{isPlaying ? 'ಆಲಿಸುತ್ತಿದೆ…' : 'ಪ್ಲೇ ಮಾಡಿ'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
