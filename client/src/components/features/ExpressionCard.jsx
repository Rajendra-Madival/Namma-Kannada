import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, ArrowRight } from 'lucide-react';
import './ExpressionCard.css';

export default function ExpressionCard({ expression }) {
  const {
    id,
    kannada,
    transliteration,
    meaning,
    regionId,
    regionName,
    domain,
    audioUrl,
    isDialectSpecific,
  } = expression;

  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean word from parentheses for clean TTS
      const cleanWord = kannada.replace(/\([^)]*\)/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'kn-IN';
      utterance.rate = 0.88;
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <article className="expression-card">
      {/* Region & status badges */}
      <div className="card-badges">
        <Link to={`/explore?region=${regionId}`} className="badge badge-region">
          {regionName}
        </Link>
        {domain && (
          <span className="badge badge-domain" style={{ backgroundColor: '#F5E9CB', color: '#575248', textTransform: 'capitalize' }}>
            {domain.replace('-', ' ')}
          </span>
        )}
        {isDialectSpecific ? (
          <span className="badge badge-verified" title="Verified regional dialect expression">
            Dialect idiom
          </span>
        ) : (
          <span className="badge badge-sample" title="Common heritage Kannada expression">
            Common
          </span>
        )}
        {expression.otherDialects && (
          <span
            className="badge badge-other-dialects"
            style={{ backgroundColor: '#FFF0D6', color: '#8C5208', border: '1px solid #FEDDA6' }}
            title="Available with equivalents in other 5 regions"
          >
            ೬ ಉಪಭಾಷೆಗಳು
          </span>
        )}
      </div>

      {/* Core content */}
      <div className="card-body">
        <h3 className="expression-word kannada-text">{kannada}</h3>
        {transliteration && (
          <p className="expression-transliteration">{transliteration}</p>
        )}
        <p className="expression-meaning">{meaning}</p>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <button
          type="button"
          className={`card-audio-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={handleSpeak}
          title={`Listen to pronunciation of ${kannada}`}
          aria-label={`Listen to pronunciation of ${kannada}`}
        >
          <Volume2 size={14} className={isPlaying ? 'wave-anim' : ''} />
          <span>{isPlaying ? 'ಆಲಿಸುತ್ತಿದೆ…' : 'ಕೇಳಿ'}</span>
        </button>

        <Link to={`/explore/${id}`} className="view-detail-link" aria-label={`View details for ${kannada}`}>
          Details <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </Link>
      </div>
    </article>
  );
}
