import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

/**
 * AudioPlayer Component
 * Handles authentic native speaker recordings with accessible playback controls,
 * state indicators, and graceful fallbacks when audio has not yet been contributed/verified.
 */
export default function AudioPlayer({
  audioUrl,
  expressionKannada,
  regionName,
  compact = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset state if URL changes
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Audio playback error:', err);
        setHasError(true);
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Graceful fallback when authentic audio is not yet uploaded or pending verification
  if (!audioUrl || hasError) {
    return (
      <div className={`audio-player-fallback ${compact ? 'compact' : ''}`}>
        <span className="audio-fallback-icon" aria-hidden="true">🎙️</span>
        <div className="audio-fallback-text">
          <span className="fallback-title">ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ (Audio Pending)</span>
          {!compact && (
            <span className="fallback-subtitle">
              Authentic native recording for "{expressionKannada}" ({regionName}) has not yet been submitted or verified.
            </span>
          )}
        </div>
      </div>
    );
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`audio-player ${compact ? 'compact' : ''}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
        preload="metadata"
      />
      <button
        type="button"
        className="audio-play-button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pause recording for ${expressionKannada}` : `Listen to pronunciation of ${expressionKannada}`}
      >
        <span className="play-icon" aria-hidden="true">
          {isPlaying ? '⏸' : '▶'}
        </span>
      </button>

      <div className="audio-track-info">
        <div className="audio-progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div className="audio-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="audio-time-row">
          <span className="audio-time">{formatTime(currentTime)}</span>
          <span className="audio-time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
