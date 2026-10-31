import { useEffect, useState } from 'react';
import {
  cancelKannadaSpeech,
  getKannadaSpeechState,
  refreshKannadaVoiceCapability,
  speakKannada,
  subscribeKannadaSpeech,
} from '../lib/kannadaSpeech';

export function useKannadaSpeech() {
  const [speech, setSpeech] = useState(getKannadaSpeechState);

  useEffect(() => {
    const unsubscribe = subscribeKannadaSpeech(setSpeech);
    refreshKannadaVoiceCapability();
    return unsubscribe;
  }, []);

  return {
    ...speech,
    speak: speakKannada,
    stop: cancelKannadaSpeech,
  };
}
