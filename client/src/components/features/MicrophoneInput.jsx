import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Square, AlertCircle, RefreshCw } from 'lucide-react';
import './MicrophoneInput.css';

/**
 * MicrophoneInput — Kannada & English Speech Recognition Component
 * Uses the Web Speech API (SpeechRecognition / webkitSpeechRecognition).
 * Supports kn-IN (Kannada) and en-IN (English).
 */

const STATE = {
  IDLE: 'IDLE',
  REQUESTING: 'REQUESTING_PERMISSION',
  LISTENING: 'LISTENING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
  UNSUPPORTED: 'UNSUPPORTED',
};

const ERROR_MESSAGES = {
  'not-allowed': 'Microphone access was denied. Please allow microphone permission in your browser settings and try again.',
  'service-not-available': 'Speech recognition service is not available right now. Please try again in a moment.',
  'audio-capture': 'No microphone detected. Please connect a microphone and try again.',
  'network': 'A network error occurred. Speech recognition requires an internet connection.',
  'no-speech': 'No speech detected. Please speak clearly and try again.',
  'aborted': 'Speech recognition was cancelled.',
  'language-not-supported': "The selected language is not supported by your browser's speech recognition.",
  'bad-grammar': 'Recognition grammar error. Please try again.',
  default: 'An unexpected error occurred. Please try again.',
};

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function MicrophoneInput({
  onTranscript,
  language = 'kn-IN',
  placeholder = 'ಮಾತನಾಡಿ... (Speak now...)',
  className = '',
  showLanguageToggle = true,
}) {
  const SpeechRecognition = getSpeechRecognition();
  const isSupported = !!SpeechRecognition;

  const [micState, setMicState] = useState(isSupported ? STATE.IDLE : STATE.UNSUPPORTED);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeLang, setActiveLang] = useState(language);

  const recognitionRef = useRef(null);
  const isMountedRef = useRef(true);
  const isStoppingRef = useRef(false);

  const stopRecognition = useCallback((force = false) => {
    isStoppingRef.current = true;
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
      recognitionRef.current = null;
    }
    if (!force) {
      setTimeout(() => { isStoppingRef.current = false; }, 200);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      stopRecognition(true);
    };
  }, [stopRecognition]);

  const startRecognition = useCallback(() => {
    if (!isSupported) return;
    if (micState === STATE.LISTENING) {
      stopRecognition();
      if (isMountedRef.current) setMicState(STATE.IDLE);
      return;
    }
    if (isStoppingRef.current) return;

    setErrorMsg('');
    setInterimTranscript('');
    setMicState(STATE.REQUESTING);

    const recognition = new SpeechRecognition();
    recognition.lang = activeLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      if (!isMountedRef.current || isStoppingRef.current) {
        recognition.abort();
        return;
      }
      setMicState(STATE.LISTENING);
    };

    recognition.onresult = (event) => {
      if (!isMountedRef.current) return;
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) { final += res[0].transcript; }
        else { interim += res[0].transcript; }
      }
      if (final) {
        setTranscript((prev) => {
          const combined = prev ? `${prev} ${final}`.trim() : final.trim();
          if (onTranscript) onTranscript(combined);
          return combined;
        });
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onnomatch = () => {
      if (!isMountedRef.current) return;
      setErrorMsg('Could not recognize speech. Please try speaking more clearly.');
      setMicState(STATE.ERROR);
    };

    recognition.onerror = (event) => {
      if (!isMountedRef.current) return;
      if (event.error === 'aborted' && isStoppingRef.current) {
        setMicState(STATE.IDLE);
        return;
      }
      const msg = ERROR_MESSAGES[event.error] || ERROR_MESSAGES.default;
      setErrorMsg(msg);
      setMicState(STATE.ERROR);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;
      recognitionRef.current = null;
      isStoppingRef.current = false;
      setInterimTranscript('');
      setMicState((prev) => {
        if (prev === STATE.LISTENING || prev === STATE.PROCESSING) return STATE.COMPLETED;
        return prev === STATE.ERROR ? STATE.ERROR : STATE.IDLE;
      });
    };

    try {
      recognition.start();
    } catch (err) {
      setErrorMsg('Failed to start speech recognition. ' + err.message);
      setMicState(STATE.ERROR);
      recognitionRef.current = null;
    }
  }, [isSupported, micState, activeLang, onTranscript, stopRecognition, SpeechRecognition]);

  const handleReset = () => {
    stopRecognition();
    setTranscript('');
    setInterimTranscript('');
    setErrorMsg('');
    setMicState(STATE.IDLE);
    if (onTranscript) onTranscript('');
  };

  const handleStop = () => {
    stopRecognition();
    setInterimTranscript('');
    setMicState((prev) => (prev === STATE.LISTENING ? STATE.COMPLETED : STATE.IDLE));
  };

  // ── Unsupported Browser Fallback ──
  if (!isSupported) {
    return (
      <div className={`mic-input-wrap mic-unsupported ${className}`} role="alert" aria-live="polite">
        <div className="mic-unsupported-icon" aria-hidden="true">
          <MicOff size={28} />
        </div>
        <div className="mic-unsupported-text">
          <strong>Speech recognition is not supported in this browser.</strong>
          <p>
            Please use <strong>Google Chrome</strong> (desktop or Android) or <strong>Microsoft Edge</strong> for voice input.
            You can still type Kannada text directly in the input field.
          </p>
        </div>
      </div>
    );
  }

  const isListening = micState === STATE.LISTENING;
  const isRequesting = micState === STATE.REQUESTING;
  const isError = micState === STATE.ERROR;
  const isCompleted = micState === STATE.COMPLETED;
  const displayText = transcript || interimTranscript;

  return (
    <div className={`mic-input-wrap ${className}`} aria-label="Voice input control">
      {/* Language toggle */}
      {showLanguageToggle && (
        <div className="mic-lang-row" aria-label="Recognition language">
          <span className="mic-lang-label">Language:</span>
          <button
            type="button"
            className={`mic-lang-pill ${activeLang === 'kn-IN' ? 'active' : ''}`}
            onClick={() => !isListening && setActiveLang('kn-IN')}
            disabled={isListening}
            aria-pressed={activeLang === 'kn-IN'}
          >
            &#127470;&#127475; &#3221;&#3240;&#3277;&#3240;&#3233; (kn-IN)
          </button>
          <button
            type="button"
            className={`mic-lang-pill ${activeLang === 'en-IN' ? 'active' : ''}`}
            onClick={() => !isListening && setActiveLang('en-IN')}
            disabled={isListening}
            aria-pressed={activeLang === 'en-IN'}
          >
            &#127470;&#127475; English (en-IN)
          </button>
        </div>
      )}

      {/* Transcript display */}
      <div
        className={`mic-transcript-area ${isListening ? 'is-listening' : ''} ${isError ? 'is-error' : ''}`}
        aria-live="polite"
        aria-atomic="false"
        lang={activeLang === 'kn-IN' ? 'kn' : 'en'}
      >
        {displayText ? (
          <>
            <span className="mic-final-text">{transcript}</span>
            {interimTranscript && (
              <span className="mic-interim-text" aria-label="Processing speech...">
                {' '}{interimTranscript}
              </span>
            )}
          </>
        ) : (
          <span className="mic-placeholder">
            {isListening
              ? (activeLang === 'kn-IN' ? 'ಮಾತನಾಡಿ...' : 'Speak now...')
              : isRequesting
              ? 'Requesting microphone permission...'
              : isError
              ? 'Recognition error'
              : placeholder}
          </span>
        )}
      </div>

      {/* Status indicator */}
      <div className="mic-status-row" aria-live="polite">
        <span className={`mic-status-dot mic-status-${micState.toLowerCase().replace(/_/g, '-')}`} aria-hidden="true" />
        <span className="mic-status-text">
          {micState === STATE.IDLE && 'Ready'}
          {micState === STATE.REQUESTING && 'Requesting permission...'}
          {micState === STATE.LISTENING && (activeLang === 'kn-IN' ? 'ಕೇಳುತ್ತಿದ್ದೇನೆ (Listening in Kannada)...' : 'Listening in English...')}
          {micState === STATE.PROCESSING && 'Processing...'}
          {micState === STATE.COMPLETED && 'Recognition complete'}
          {micState === STATE.ERROR && 'Error occurred'}
        </span>
      </div>

      {/* Error message */}
      {isError && errorMsg && (
        <div className="mic-error-msg" role="alert" aria-live="assertive">
          <AlertCircle size={15} aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="mic-actions">
        {!isListening ? (
          <button
            type="button"
            id="mic-start-btn"
            className={`mic-btn mic-btn-record ${isError || isCompleted ? 'mic-btn-retry' : ''}`}
            onClick={startRecognition}
            disabled={isRequesting}
            aria-label={isRequesting ? 'Requesting microphone permission' : 'Start voice input'}
          >
            {isRequesting ? (
              <>
                <RefreshCw size={18} className="spin-icon" aria-hidden="true" />
                Requesting...
              </>
            ) : (
              <>
                <Mic size={18} aria-hidden="true" />
                {isError || isCompleted ? 'Try Again' : 'Start Speaking'}
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            id="mic-stop-btn"
            className="mic-btn mic-btn-stop"
            onClick={handleStop}
            aria-label="Stop recording"
          >
            <Square size={16} aria-hidden="true" />
            Stop
          </button>
        )}

        {(transcript || isError || isCompleted) && !isListening && !isRequesting && (
          <button
            type="button"
            className="mic-btn mic-btn-clear"
            onClick={handleReset}
            aria-label="Clear transcript and reset"
          >
            Clear
          </button>
        )}
      </div>

      <p className="mic-compat-note">
        Voice input works best in <strong>Chrome</strong> and <strong>Edge</strong>.
        Firefox and Safari have limited support.
      </p>
    </div>
  );
}
