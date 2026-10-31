/**
 * Kannada pronunciation engine.
 *
 * Provides a resilient multi-tier strategy for authentic Kannada speech:
 * 1. Verified recorded audio URL (if provided)
 * 2. Same-origin TTS proxy (/api/tts) — streams native Kannada audio cleanly
 * 3. Direct Google Translate TTS audio stream
 * 4. Native browser Kannada TTS voice (if installed in OS/browser)
 * 5. Phonetic Web Speech fallback for English/Indian system voices
 */

const KANNADA_LANG = 'kn-IN';
const SPEAK_AFTER_CANCEL_MS = 60;

let voicesPromise = null;
let speakGeneration = 0;
let currentAudio = null;

const listeners = new Set();

const state = {
  status: 'idle', // idle | loading | speaking | unavailable | error
  speakingId: null,
  message: '',
  supported: true,
  hasKannadaVoice: false,
  voiceName: null,
  voicesReady: false,
  source: null, // 'recording' | 'tts' | 'audio-stream' | null
};

function emit() {
  const snapshot = { ...state };
  listeners.forEach((fn) => fn(snapshot));
}

function setState(patch) {
  Object.assign(state, patch);
  emit();
}

export function getKannadaSpeechState() {
  return { ...state };
}

export function subscribeKannadaSpeech(listener) {
  listeners.add(listener);
  listener({ ...state });
  return () => listeners.delete(listener);
}

export function cleanSpeechText(text) {
  if (text == null) return '';
  return String(text)
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[/|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Primary TTS endpoint: uses same-origin proxy (/api/tts) to avoid
 * browser Referer blocking and CORS restrictions.
 */
export function getKannadaAudioUrl(text) {
  if (!text) return null;
  const cleaned = cleanSpeechText(text);
  if (!cleaned) return null;
  const encoded = encodeURIComponent(cleaned.slice(0, 200));
  return `/api/tts?text=${encoded}`;
}

/**
 * Direct Google Translate TTS endpoint as secondary audio fallback.
 */
export function getDirectGoogleTtsUrl(text) {
  if (!text) return null;
  const cleaned = cleanSpeechText(text);
  if (!cleaned) return null;
  const encoded = encodeURIComponent(cleaned.slice(0, 200));
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encoded}`;
}

/**
 * Phonetic transliterator from Kannada Unicode to Latin alphabet.
 * Ensures that if a device only has English/Indian TTS voices,
 * words like "ನಮಸ್ಕಾರ" are read audibly as "namaskaara" instead of skipped as silent Unicode.
 */
export function transliterateKannada(text) {
  if (!text) return '';
  const vowels = {
    0x0c85: 'a', 0x0c86: 'aa', 0x0c87: 'i', 0x0c88: 'ee', 0x0c89: 'u', 0x0c8a: 'oo', 0x0c8b: 'ru',
    0x0c8e: 'e', 0x0c8f: 'ae', 0x0c90: 'ai', 0x0c92: 'o', 0x0c93: 'oa', 0x0c94: 'au',
    0x0c82: 'm', 0x0c83: 'h'
  };
  const consonants = {
    0x0c95: 'k', 0x0c96: 'kh', 0x0c97: 'g', 0x0c98: 'gh', 0x0c99: 'ng',
    0x0c9a: 'ch', 0x0c9b: 'chh', 0x0c9c: 'j', 0x0c9d: 'jh', 0x0c9e: 'ny',
    0x0c9f: 't', 0x0ca0: 'th', 0x0ca1: 'd', 0x0ca2: 'dh', 0x0ca3: 'n',
    0x0ca4: 'th', 0x0ca5: 'thh', 0x0ca6: 'd', 0x0ca7: 'dh', 0x0ca8: 'n',
    0x0caa: 'p', 0x0cab: 'ph', 0x0cac: 'b', 0x0cad: 'bh', 0x0cae: 'm',
    0x0caf: 'y', 0x0cb0: 'r', 0x0cb1: 'r', 0x0cb2: 'l', 0x0cb3: 'l', 0x0cb5: 'v',
    0x0cb6: 'sh', 0x0cb7: 'sh', 0x0cb8: 's', 0x0cb9: 'h'
  };
  const matras = {
    0x0cbe: 'aa', 0x0cbf: 'i', 0x0cc0: 'ee', 0x0cc1: 'u', 0x0cc2: 'oo', 0x0cc3: 'ru',
    0x0cc6: 'e', 0x0cc7: 'ae', 0x0cc8: 'ai', 0x0cca: 'o', 0x0ccb: 'oa', 0x0ccc: 'au'
  };
  const virama = 0x0ccd;

  let out = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (vowels[code]) {
      out += vowels[code];
    } else if (consonants[code]) {
      const c = consonants[code];
      const nextCode = text.charCodeAt(i + 1);
      if (nextCode === virama) {
        out += c;
        i++; // skip virama
      } else if (matras[nextCode]) {
        out += c + matras[nextCode];
        i++; // skip matra
      } else {
        out += c + 'a';
      }
    } else if (code === 0x0c82) {
      out += 'm';
    } else {
      out += text[i];
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

export function isKannadaVoice(voice) {
  if (!voice) return false;
  const lang = String(voice.lang || '').toLowerCase().replace('_', '-');
  const name = String(voice.name || '').toLowerCase();
  return lang === 'kn' || lang.startsWith('kn-') || name.includes('kannada');
}

export function pickKannadaVoice(voices = []) {
  const kannadaVoices = voices.filter(isKannadaVoice);
  if (!kannadaVoices.length) return null;
  return (
    kannadaVoices.find((v) => String(v.lang).toLowerCase().replace('_', '-').startsWith('kn-in')) ||
    kannadaVoices[0]
  );
}

function readVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices() || [];
}

export function loadSpeechVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }
  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise((resolve) => {
    const existing = readVoices();
    if (existing.length) {
      resolve(existing);
      return;
    }

    const finish = () => {
      try {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      } catch {
        // ignore
      }
      resolve(readVoices());
    };

    const onVoices = () => finish();
    window.speechSynthesis.addEventListener('voiceschanged', onVoices);
    window.setTimeout(finish, 1000);
  });

  return voicesPromise;
}

export async function refreshKannadaVoiceCapability() {
  if (typeof window === 'undefined') {
    setState({
      supported: false,
      hasKannadaVoice: false,
      voiceName: null,
      voicesReady: true,
    });
    return getKannadaSpeechState();
  }

  const voices = await loadSpeechVoices();
  const voice = pickKannadaVoice(voices);
  setState({
    supported: true,
    hasKannadaVoice: Boolean(voice),
    voiceName: voice ? voice.name : null,
    voicesReady: true,
  });
  return getKannadaSpeechState();
}

function stopCurrentAudio() {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
    currentAudio.removeAttribute('src');
    currentAudio.load();
  } catch {
    // ignore
  }
  currentAudio = null;
}

export function cancelKannadaSpeech() {
  speakGeneration += 1;
  stopCurrentAudio();
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
  setState({
    status: 'idle',
    speakingId: null,
    message: '',
    source: null,
  });
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function playAudioUrl(audioUrl, id, generation) {
  stopCurrentAudio();

  let playUrl = audioUrl;
  let objectUrlToRevoke = null;

  // Try fetching into a local Blob first for instant, stutter-free playback
  try {
    const res = await fetch(audioUrl);
    if (res.ok) {
      const blob = await res.blob();
      if (blob && blob.size > 100) {
        objectUrlToRevoke = URL.createObjectURL(blob);
        playUrl = objectUrlToRevoke;
      }
    }
  } catch {
    // Fall back to direct media stream if fetch is blocked
    playUrl = audioUrl;
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    const audio = new Audio();
    audio.preload = 'auto';
    currentAudio = audio;

    const cleanup = () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      if (objectUrlToRevoke) {
        try { URL.revokeObjectURL(objectUrlToRevoke); } catch { /* ignore */ }
      }
      if (currentAudio === audio) currentAudio = null;
    };

    const onEnded = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const onError = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Audio playback failed or was interrupted.'));
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    if (generation !== speakGeneration) {
      settled = true;
      cleanup();
      resolve();
      return;
    }

    audio.src = playUrl;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (generation !== speakGeneration) {
          settled = true;
          cleanup();
          resolve();
        } else {
          onError(err);
        }
      });
    }
  }).then(() => {
    if (generation === speakGeneration && state.speakingId === id) {
      setState({ status: 'idle', speakingId: null, message: '', source: null });
    }
  });
}

function speakWithVoice(text, voice, id, generation) {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || KANNADA_LANG;
    } else {
      utterance.lang = KANNADA_LANG;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      if (generation === speakGeneration && state.speakingId === id) {
        setState({ status: 'idle', speakingId: null, message: '', source: null });
      }
      resolve();
    };

    utterance.onerror = (event) => {
      if (event.error === 'interrupted' || event.error === 'canceled') {
        resolve();
        return;
      }
      reject(new Error(event.error || 'Speech synthesis failed.'));
    };

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Pronounce Kannada text using a resilient multi-tier fallback system.
 * 
 * @param {string} text
 * @param {{ id?: string, audioUrl?: string | null } | string} [options]
 */
export async function speakKannada(text, options = {}) {
  const opts = typeof options === 'string' ? { id: options } : (options || {});
  const { id = 'default', audioUrl = null } = opts;
  const cleaned = cleanSpeechText(text);

  if (state.speakingId === id && (state.status === 'speaking' || state.status === 'loading')) {
    cancelKannadaSpeech();
    return { ok: false, reason: 'stopped' };
  }

  cancelKannadaSpeech();
  const generation = speakGeneration;
  setState({
    status: 'loading',
    speakingId: id,
    message: 'ಧ್ವನಿ ಸಿದ್ಧವಾಗುತ್ತಿದೆ (Preparing pronunciation)…',
    source: audioUrl ? 'recording' : null,
  });

  if (!cleaned && !audioUrl) {
    setState({
      status: 'error',
      speakingId: null,
      message: 'There is no Kannada text to pronounce.',
      source: null,
    });
    return { ok: false, reason: 'empty' };
  }

  // Tier 1: User-contributed recorded audio URL
  if (audioUrl) {
    try {
      setState({
        status: 'speaking',
        speakingId: id,
        message: 'ಆಲಿಸಿ (Playing recorded audio)…',
        source: 'recording',
      });
      await playAudioUrl(audioUrl, id, generation);
      return { ok: true, source: 'recording' };
    } catch {
      // Fall through to next tier
    }
  }

  // Tier 2: Same-origin /api/tts proxy (bypasses CORS and Referer restrictions)
  const proxyAudioUrl = getKannadaAudioUrl(cleaned);
  if (proxyAudioUrl) {
    try {
      if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };
      setState({
        status: 'speaking',
        speakingId: id,
        message: 'ಆಲಿಸಿ (Playing Kannada pronunciation)…',
        source: 'audio-stream',
      });
      await playAudioUrl(proxyAudioUrl, id, generation);
      return { ok: true, source: 'audio-stream' };
    } catch {
      // Fall through to direct stream
    }
  }

  // Tier 3: Direct Google Translate TTS endpoint
  const directAudioUrl = getDirectGoogleTtsUrl(cleaned);
  if (directAudioUrl) {
    try {
      if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };
      setState({
        status: 'speaking',
        speakingId: id,
        message: 'ಆಲಿಸಿ (Playing Kannada pronunciation)…',
        source: 'audio-stream',
      });
      await playAudioUrl(directAudioUrl, id, generation);
      return { ok: true, source: 'audio-stream' };
    } catch {
      // Fall through to Web Speech API
    }
  }

  // Tier 4: Browser SpeechSynthesis with phonetic transliteration
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const voices = await loadSpeechVoices();
      if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };
      const voice = pickKannadaVoice(voices);

      await wait(SPEAK_AFTER_CANCEL_MS);
      if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };

      // If no native Kannada voice is installed, pass phonetic Latin text so English/Indian voices speak audibly
      const speechText = voice ? cleaned : (transliterateKannada(cleaned) || cleaned);
      const chosenVoice = voice || voices.find((v) => String(v.lang).startsWith('en-IN') || String(v.lang).startsWith('hi')) || null;

      setState({
        status: 'speaking',
        speakingId: id,
        message: voice ? `Speaking with ${voice.name}` : 'Speaking Kannada pronunciation…',
        source: 'tts',
      });
      await speakWithVoice(speechText, chosenVoice, id, generation);
      return { ok: true, source: 'tts', voiceName: chosenVoice ? chosenVoice.name : 'system-default' };
    } catch {
      if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };
    }
  }

  if (generation !== speakGeneration) return { ok: false, reason: 'stopped' };
  setState({
    status: 'error',
    speakingId: null,
    message: 'Kannada pronunciation could not be played. Please check your speaker connection.',
    source: null,
  });
  return { ok: false, reason: 'error' };
}

refreshKannadaVoiceCapability();
