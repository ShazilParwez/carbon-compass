import { useState, useEffect, useCallback } from 'react';

function preprocessForSpeech(text) {
  if (!text) return '';

  let processed = text;

  // 1. Remove bold and italic markers (*, **, _, __)
  processed = processed.replace(/(\*\*|__)(.*?)\1/g, '$2');
  processed = processed.replace(/(\*|_)(.*?)\1/g, '$2');

  // 2. Remove code blocks and inline code
  processed = processed.replace(/```[\s\S]*?```/g, ' [code block] ');
  processed = processed.replace(/`(.*?)`/g, '$1');

  // 3. Remove headers and add natural pauses
  processed = processed.replace(/^#+\s*(.*?)$/gm, '$1. ');

  // 4. Convert numbered lists into spoken numbering
  processed = processed.replace(/^(\d+)\.\s+(.*)$/gm, 'Number $1: $2');

  // 5. Convert bullet points into natural pauses
  processed = processed.replace(/^[\*\-]\s+(.*)$/gm, 'Next point: $1. ');

  // 6. Strip links but keep the anchor text
  processed = processed.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 7. Fix excessive newlines and whitespace to improve sentence boundaries
  processed = processed.replace(/\n{2,}/g, '. ');
  processed = processed.replace(/\s+/g, ' ');

  return processed.trim();
}

export default function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  const speak = useCallback((text) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    if (!text) return;

    const cleanedText = preprocessForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    // Pick an English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Natural'))) || voices.find(v => v.lang.startsWith('en-')) || voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
