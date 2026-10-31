import React from 'react';
import { LoaderCircle, Square, Volume2 } from 'lucide-react';
import { useKannadaSpeech } from '../../hooks/useKannadaSpeech';
import './PronounceButton.css';

export default function PronounceButton({
  text,
  audioUrl = null,
  id,
  className = '',
  idleLabel = 'ಕೇಳಿ',
}) {
  const speech = useKannadaSpeech();
  const itemId = id || text || 'expression';
  const isThis = speech.speakingId === itemId;
  const isLoading = isThis && speech.status === 'loading';
  const isSpeaking = isThis && speech.status === 'speaking';

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading || isSpeaking) {
      speech.stop();
      return;
    }
    speech.speak(text, { id: itemId, audioUrl });
  };

  let label = idleLabel;
  if (isLoading) label = 'ತಯಾರಾಗುತ್ತಿದೆ…';
  else if (isSpeaking) label = 'ನಿಲ್ಲಿಸಿ';

  const ariaLabel = isSpeaking
    ? `Stop pronunciation of ${text || 'this expression'}`
    : `Play pronunciation of ${text || 'this expression'}`;

  return (
    <span className="pronounce-control">
      <button
        type="button"
        className={`pronounce-btn ${isSpeaking ? 'is-speaking' : ''} ${isLoading ? 'is-loading' : ''} ${className}`.trim()}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-pressed={isSpeaking}
        title={ariaLabel}
      >
        {isLoading ? (
          <LoaderCircle size={14} className="pronounce-spin" aria-hidden="true" />
        ) : isSpeaking ? (
          <Square size={12} aria-hidden="true" />
        ) : (
          <Volume2 size={14} aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
      {isThis && speech.message ? (
        <span className="visually-hidden" role="status" aria-live="polite">
          {speech.message}
        </span>
      ) : null}
    </span>
  );
}
