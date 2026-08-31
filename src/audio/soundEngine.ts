// Procedural Web Audio API sound generator for Meri Chhoti Si Mela ❤️
// No external MP3 files needed - 100% reliable in all browser contexts!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicInterval: number | null = null;
  private isMusicPlaying: boolean = false;
  private musicGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);

      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.musicGainNode.connect(this.masterGainNode);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // --- SOUND EFFECTS ---

  // 1. Ring Toss Whoosh (Air throw)
  public playThrow() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    // Pitch envelope: starting low, sweeping up then down
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.35);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // 2. Ring Spinning Shimmer
  public playSpin() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(280, now + 0.2);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // 3. Ring Land / Table Tap
  public playBounce() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // 4. Successful Hit - Carnival Chime & Sparkle
  public playHit() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.28, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.65);
    });
  }

  // 5. Miss - Soft gentle woodwind "Aww"
  public playMiss() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, now); // E4
    osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.35); // C4

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // 6. Ribbon Untie Rustle
  public playRibbonUntie() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const now = this.ctx.currentTime;
    const freqs = [600, 850, 1100, 950, 1400];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.01, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.3);
    });
  }

  // 7. Box Opening Magic Sparkle
  public playBoxOpen() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const now = this.ctx.currentTime;
    const melody = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760]; // A Major sparkle

    melody.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGainNode);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.85);
    });
  }

  // 8. Grand Celebration Fanfare (for Birthday Finale)
  public playFanfare() {
    this.initContext();
    if (!this.ctx || this.isMuted || !this.masterGainNode) return;

    const now = this.ctx.currentTime;
    const chords = [
      { time: 0.0, freqs: [261.63, 329.63, 392.00] }, // C Major
      { time: 0.25, freqs: [329.63, 392.00, 523.25] }, // E-G-C
      { time: 0.5, freqs: [392.00, 523.25, 659.25] }, // G-C-E
      { time: 0.8, freqs: [523.25, 659.25, 783.99, 1046.5] }, // C Major High Chord
    ];

    chords.forEach(chord => {
      chord.freqs.forEach(freq => {
        if (!this.ctx || !this.masterGainNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + chord.time);

        gain.gain.setValueAtTime(0.01, now + chord.time);
        gain.gain.linearRampToValueAtTime(0.2, now + chord.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + chord.time + 0.7);

        osc.connect(gain);
        gain.connect(this.masterGainNode);

        osc.start(now + chord.time);
        osc.stop(now + chord.time + 0.75);
      });
    });
  }

  // 9. Soft Romantic Background Music Loop (Dreamy Music Box / Chime)
  public startBackgroundMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    this.isMusicPlaying = true;

    // Romantic calming pentatonic scale notes (D, E, F#, A, B, D5, E5, F#5)
    const romanticScale = [
      293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99
    ];

    // Dreamy peaceful arpeggio patterns
    const patterns = [
      [0, 2, 4, 3, 5, 4, 2, 1],
      [4, 3, 5, 6, 7, 5, 4, 2],
      [1, 3, 4, 6, 5, 3, 2, 0],
      [0, 4, 5, 7, 6, 4, 3, 2]
    ];

    let patternIdx = 0;
    let stepIdx = 0;

    this.musicInterval = window.setInterval(() => {
      if (!this.ctx || this.isMuted || !this.musicGainNode) return;
      if (this.ctx.state === 'suspended') return;

      const currentPattern = patterns[patternIdx];
      const noteIdx = currentPattern[stepIdx];
      const freq = romanticScale[noteIdx];
      const now = this.ctx.currentTime;

      // Music box bell sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.musicGainNode);

      osc.start(now);
      osc.stop(now + 0.95);

      // Subtle warm sub-bass pad on downbeats
      if (stepIdx === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(romanticScale[0] / 2, now);
        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.06, now + 0.1);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGainNode);
        bassOsc.start(now);
        bassOsc.stop(now + 1.9);
      }

      stepIdx++;
      if (stepIdx >= currentPattern.length) {
        stepIdx = 0;
        patternIdx = (patternIdx + 1) % patterns.length;
      }
    }, 450); // Gentle 133 BPM ambient tempo
  }

  public stopBackgroundMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.isMusicPlaying = false;
  }
}

export const sound = new SoundEngine();
