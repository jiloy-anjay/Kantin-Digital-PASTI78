'use client';

import { useState, useEffect, useCallback } from 'react';
import { voiceService } from '@/lib/speech';

export function useSpeech() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);

  useEffect(() => {
    setIsVoiceEnabled(voiceService.getIsVoiceEnabled());
  }, []);

  const toggleVoice = useCallback(() => {
    const nextState = voiceService.toggleVoice();
    setIsVoiceEnabled(nextState);
    if (nextState) {
      voiceService.speak('Fitur notifikasi suara diaktifkan.');
    }
  }, []);

  const speak = useCallback((text: string) => {
    voiceService.speak(text);
  }, []);

  const playChime = useCallback(() => {
    voiceService.playChime();
  }, []);

  const playPop = useCallback(() => {
    voiceService.playPop();
  }, []);

  const notifyOrderPlaced = useCallback((orderCode: string) => {
    voiceService.notifyOrderPlaced(orderCode);
  }, []);

  const notifyOrderReady = useCallback((orderCode: string, stallName: string) => {
    voiceService.notifyOrderReady(orderCode, stallName);
  }, []);

  return {
    isVoiceEnabled,
    toggleVoice,
    speak,
    playChime,
    playPop,
    notifyOrderPlaced,
    notifyOrderReady,
  };
}
