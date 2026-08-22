// ========================================================
// TEXT-TO-SPEECH (WEB SPEECH API) & AUDIO SERVICE - PASTI78
// ========================================================

class VoiceService {
  private isEnabled: boolean = true;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pasti78_voice_enabled');
      this.isEnabled = saved !== null ? saved === 'true' : true;
    }
  }

  public toggleVoice(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pasti78_voice_enabled', String(this.isEnabled));
    }
    return this.isEnabled;
  }

  public getIsVoiceEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Speak a text string in Indonesian (id-ID) using Web Speech API
   */
  public speak(text: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    if (!this.isEnabled) return;

    try {
      // Cancel previous utterances to avoid queue delays
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      // Select Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to trigger speech synthesis:', err);
    }
  }

  /**
   * Play synthesizer chime via Web Audio API
   */
  public playChime(): void {
    if (typeof window === 'undefined') return;

    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  /**
   * Play simple pop sound
   */
  public playPop(): void {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  /**
   * Speak when an order is placed
   */
  public notifyOrderPlaced(orderCode: string): void {
    this.playChime();
    this.speak(`Pesanan Anda dengan kode ${orderCode.replace('-', ' ')} telah berhasil dibuat.`);
  }

  /**
   * Speak when an order status changes to READY
   */
  public notifyOrderReady(orderCode: string, stallName: string): void {
    this.playChime();
    this.speak(`Perhatian! Pesanan ${orderCode.replace('-', ' ')} siap diambil di ${stallName}. Silakan tunjukkan kode pesanan ke stan.`);
  }
}

export const voiceService = new VoiceService();
