import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import './AmbientAudioPlayer.css';

/**
 * Procedural Web Audio Ambient Player for Namma Kannada
 * Synthesizes peaceful pentatonic drone (Tanpura/Bhoopali tones) and gentle temple bell harmonics.
 * Pure Web Audio API: 100% offline, 0 bytes external download, pristine audio quality.
 */
export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const bellIntervalRef = useRef(null);

  // Frequencies for soothing traditional Indian classical drone (Sa, Pa, High Sa - Mohana / Bhoopali scale)
  const DRONE_FREQUENCIES = [146.83, 220.00, 293.66, 440.00]; // D3, A3, D4, A4

  const playTempleBell = (ctx, masterGain) => {
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      // Fundamental bell tone (high chime around 1174Hz - D6)
      const osc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now);
      // Slight shimmer detune
      osc.frequency.exponentialRampToValueAtTime(1170.00, now + 3);

      bellGain.gain.setValueAtTime(0.08, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4);

      osc.connect(bellGain);
      bellGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 4.2);
    } catch (e) {
      // Audio context might be restricted
    }
  };

  const startAmbient = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft Tanpura Drones
      oscillatorsRef.current = DRONE_FREQUENCIES.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow subtle LFO vibrato
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + i * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      // Play periodic gentle temple bell chime every 9 seconds
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
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try { o.stop(); } catch (e) {}
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

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  return (
    <div className="ambient-widget-wrap">
      <button
        type="button"
        className={`ambient-toggle-pill ${isPlaying ? 'is-active' : ''}`}
        onClick={toggleAudio}
        title={isPlaying ? 'Mute Kannada ambient soundscape' : 'Play soothing Kannada ambient soundscape (Tanpura & Chime)'}
        aria-label="Toggle Kannada Ambient Soundscape"
      >
        <span className="ambient-icon-box">
          {isPlaying ? (
            <Volume2 size={16} className="ambient-playing-wave" />
          ) : (
            <Music size={16} />
          )}
        </span>
        <span className="ambient-text">
          {isPlaying ? 'ಕನ್ನಡ ನಾದ (ಆನ್)' : 'ಕನ್ನಡ ನಾದ'}
        </span>
        {isPlaying && <span className="ambient-pulse-dot" />}
      </button>
    </div>
  );
}
