import React, { useEffect, useId, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, X, Square, LoaderCircle } from 'lucide-react';
import { useKannadaSpeech } from '../../hooks/useKannadaSpeech';
import './AmbientAudioPlayer.css';

/**
 * Kannada Naada — pronunciation helper plus optional ambient tanpura/bells.
 * Ambient audio is procedural Web Audio (offline). Pronunciation uses
 * recorded URLs when present, otherwise a Kannada browser voice only.
 */
export default function AmbientAudioPlayer() {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sampleText, setSampleText] = useState('ಬ್ಯಾಡ್ರಿ');
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const bellIntervalRef = useRef(null);
  const panelId = useId();
  const speech = useKannadaSpeech();

  const DRONE_FREQUENCIES = [146.83, 220.00, 293.66, 440.00];

  const playTempleBell = (ctx, masterGain) => {
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now);
      osc.frequency.exponentialRampToValueAtTime(1170.00, now + 3);

      bellGain.gain.setValueAtTime(0.08, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4);

      osc.connect(bellGain);
      bellGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 4.2);
    } catch {
      // Audio context might be restricted
    }
  };

  const startAmbient = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      oscillatorsRef.current = DRONE_FREQUENCIES.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + i * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      playTempleBell(ctx, masterGain);
      bellIntervalRef.current = setInterval(() => {
        playTempleBell(ctx, masterGain);
      }, 9500);

      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio not allowed or supported', err);
    }
  };

  const stopAmbient = () => {
    if (bellIntervalRef.current) clearInterval(bellIntervalRef.current);
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      } catch {
        // ignore
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try { o.stop(); } catch { /* already stopped */ }
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      }, 900);
    }
    setIsPlaying(false);
  };

  const toggleAmbient = () => {
    if (isPlaying) stopAmbient();
    else startAmbient();
  };

  const handlePronounce = () => {
    const id = 'naada-sample';
    if (speech.speakingId === id && (speech.status === 'speaking' || speech.status === 'loading')) {
      speech.stop();
      return;
    }
    speech.speak(sampleText, { id });
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  const naadaSpeaking = speech.speakingId === 'naada-sample';
  const canTrySpeech = Boolean(sampleText && sampleText.trim());

  return (
    <div className="ambient-widget-wrap">
      {open && (
        <div
          className="naada-panel"
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby="naada-title"
        >
          <div className="naada-panel-header">
            <div>
              <p className="naada-kicker">Audio helper</p>
              <h2 id="naada-title">ಕನ್ನಡ ನಾದ</h2>
              <p className="naada-subtitle">Hear a word, or play a quiet Karnataka drone.</p>
            </div>
            <button
              type="button"
              className="naada-close"
              onClick={() => setOpen(false)}
              aria-label="Close Kannada Naada panel"
            >
              <X size={16} />
            </button>
          </div>

          <section className="naada-section" aria-labelledby="naada-pronounce-heading">
            <h3 id="naada-pronounce-heading">Pronounce a word</h3>
            <p>
              Type or paste Kannada text to hear authentic spoken Kannada pronunciation.
            </p>
            <label className="naada-field-label" htmlFor="naada-text">
              Kannada text
            </label>
            <input
              id="naada-text"
              className="naada-input kannada-text"
              lang="kn"
              value={sampleText}
              onChange={(event) => setSampleText(event.target.value)}
              placeholder="ಉದಾ: ಬ್ಯಾಡ್ರಿ"
            />
            <div className="naada-actions">
              <button
                type="button"
                className={`naada-primary ${naadaSpeaking ? 'is-active' : ''}`}
                onClick={handlePronounce}
                disabled={!canTrySpeech}
                aria-label={naadaSpeaking ? 'Stop pronunciation' : 'Play pronunciation'}
              >
                {speech.status === 'loading' && naadaSpeaking ? (
                  <LoaderCircle size={15} className="naada-spin" />
                ) : naadaSpeaking ? (
                  <Square size={13} />
                ) : (
                  <Volume2 size={15} />
                )}
                {naadaSpeaking ? 'Stop' : 'Play'}
              </button>
            </div>
            <p className="naada-status" role="status" aria-live="polite">
              {!sampleText.trim() && 'Enter a Kannada word or phrase above to pronounce.'}
              {sampleText.trim() && speech.hasKannadaVoice && (
                <>Kannada voice available{speech.voiceName ? `: ${speech.voiceName}` : ''}.</>
              )}
              {sampleText.trim() && !speech.hasKannadaVoice && (
                <>Kannada speech ready (Online native pronunciation &amp; browser engine).</>
              )}
              {speech.message && (speech.status === 'error' || naadaSpeaking) ? (
                <> {speech.message}</>
              ) : null}
            </p>
          </section>

          <section className="naada-section" aria-labelledby="naada-ambient-heading">
            <h3 id="naada-ambient-heading">Ambient soundscape</h3>
            <p>
              Optional tanpura drone and temple-bell chime generated on this device.
              It is background atmosphere, not word pronunciation.
            </p>
            <button
              type="button"
              className={`naada-secondary ${isPlaying ? 'is-active' : ''}`}
              onClick={toggleAmbient}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? 'Stop ambient soundscape' : 'Play ambient soundscape'}
            >
              {isPlaying ? <VolumeX size={15} /> : <Music size={15} />}
              {isPlaying ? 'Stop drone' : 'Play drone'}
            </button>
          </section>
        </div>
      )}

      <button
        type="button"
        className={`ambient-toggle-pill ${open || isPlaying || naadaSpeaking ? 'is-active' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        title="Open Kannada Naada — pronunciation and ambient sound"
        aria-label={open ? 'Close Kannada Naada audio helper' : 'Open Kannada Naada audio helper'}
      >
        <span className="ambient-icon-box">
          {isPlaying || naadaSpeaking ? (
            <Volume2 size={16} className="ambient-playing-wave" />
          ) : (
            <Music size={16} />
          )}
        </span>
        <span className="ambient-text">ಕನ್ನಡ ನಾದ</span>
        {(isPlaying || naadaSpeaking) && <span className="ambient-pulse-dot" />}
      </button>
    </div>
  );
}
