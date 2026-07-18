/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A Web Audio API based ambient synthesizer to simulate office panic
export class OfficeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeDay: number = 0; // 0 to 4
  
  // Audio Nodes
  private masterGain: GainNode | null = null;
  private humOsc1: OscillatorNode | null = null;
  private humOsc2: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  
  // Timer handles
  private typingInterval: any = null;
  private alertInterval: any = null;

  constructor() {
    // Generate white noise buffer for typing sound bursts
    if (typeof window !== 'undefined') {
      const sampleRate = 44100;
      const bufferSize = sampleRate * 0.1; // 100ms of noise
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
        const output = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
  }

  public toggle(forceState?: boolean): boolean {
    const targetState = forceState !== undefined ? forceState : !this.isPlaying;
    if (targetState) {
      this.start();
    } else {
      this.stop();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private async start() {
    if (!this.ctx) return;
    
    // Resume context if suspended (browser security policy)
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    
    // Create master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime); // Overall volume limit
    this.masterGain.connect(this.ctx.destination);

    // Start background hum (server/ventilation hum)
    this.startHum();

    // Start scheduled sound events
    this.scheduleSounds();
  }

  private stop() {
    this.isPlaying = false;
    
    // Clear scheduled intervals
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.alertInterval) clearInterval(this.alertInterval);
    
    // Stop oscillators
    try {
      if (this.humOsc1) this.humOsc1.stop();
      if (this.humOsc2) this.humOsc2.stop();
    } catch (e) {}

    // Disconnect everything
    if (this.masterGain) {
      this.masterGain.disconnect();
    }
    this.masterGain = null;
    this.humOsc1 = null;
    this.humOsc2 = null;
  }

  public setDay(day: number) {
    this.activeDay = day;
    if (this.isPlaying) {
      // Adjust hum parameters live
      this.updateHumParameters();
      // Reschedule typing and alarms to match new panic pace
      this.scheduleSounds();
    }
  }

  private startHum() {
    if (!this.ctx || !this.masterGain) return;

    // Create 2 low oscillators for a rich, drone/hum sound
    this.humOsc1 = this.ctx.createOscillator();
    this.humOsc2 = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();

    this.humOsc1.type = 'sine';
    this.humOsc2.type = 'triangle';

    this.humGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.humOsc1.connect(this.humGain);
    this.humOsc2.connect(this.humGain);
    this.humGain.connect(this.masterGain);

    this.humOsc1.start();
    this.humOsc2.start();

    this.updateHumParameters();
  }

  private updateHumParameters() {
    if (!this.ctx || !this.humOsc1 || !this.humOsc2 || !this.humGain) return;

    const t = this.ctx.currentTime;
    
    // Day 0: Soft 55Hz + 110Hz hum
    // Day 4: Tense, slightly vibrating 75Hz + 150Hz hum with louder volume
    const baseFreq = 55 + this.activeDay * 6; // 55Hz to 79Hz
    this.humOsc1.frequency.setValueAtTime(baseFreq, t);
    this.humOsc2.frequency.setValueAtTime(baseFreq * 2, t);

    // Increase hum volume as chaos builds
    const gainVal = 0.05 + (this.activeDay * 0.04); // 0.05 to 0.21
    this.humGain.gain.linearRampToValueAtTime(gainVal, t + 1);
  }

  // Generate a physical "keyboard click" sound synthetically
  private playKeyboardClick() {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    const t = this.ctx.currentTime;

    // Create a buffer source for noise burst
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = this.noiseBuffer;

    // Create a high-pass filter to only keep higher click sounds
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    // Slightly randomize pitch for variety
    filter.frequency.setValueAtTime(1200 + Math.random() * 800, t);
    filter.Q.setValueAtTime(1.5, t);

    // Create decay gain envelope
    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.12 + Math.random() * 0.08, t);
    // Extremely fast release/decay to sound like a tactile switch keycap click
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    noiseNode.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.masterGain);

    noiseNode.start(t);
    noiseNode.stop(t + 0.04);
  }

  // Play a notification alert (synthesized high pitch sine chime)
  private playAlert() {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const alertGain = this.ctx.createGain();

    osc.type = 'sine';
    
    // Different alerts based on stress days
    if (this.activeDay <= 2) {
      // Soft Slack-like double chime (Day 2)
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.setValueAtTime(840, t + 0.08);
      alertGain.gain.setValueAtTime(0.06, t);
      alertGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    } else if (this.activeDay === 3) {
      // More intense dual-frequency server warning alert (Day 3)
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.setValueAtTime(1100, t + 0.1);
      alertGain.gain.setValueAtTime(0.1, t);
      alertGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    } else {
      // Fast, repetitive high-pitched alarm loop (Day 4)
      osc.type = 'sawtooth';
      // Siren frequency sweep
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.setValueAtTime(1400, t + 0.15);
      alertGain.gain.setValueAtTime(0.08, t);
      alertGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    }

    osc.connect(alertGain);
    alertGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.6);
  }

  // Dynamic scheduling based on day stress level
  private scheduleSounds() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.alertInterval) clearInterval(this.alertInterval);

    if (!this.isPlaying) return;

    // 1. TYPING SCHEDULING
    // Day 0: Slow, intermittent typing (relaxed)
    // Day 4: High velocity, ultra chaotic typing
    let minTypingDelay = 400;
    let maxTypingDelay = 1200;

    if (this.activeDay === 1) {
      minTypingDelay = 600;
      maxTypingDelay = 1500;
    } else if (this.activeDay === 2) {
      minTypingDelay = 250;
      maxTypingDelay = 600;
    } else if (this.activeDay === 3) {
      minTypingDelay = 100;
      maxTypingDelay = 350;
    } else if (this.activeDay === 4) {
      minTypingDelay = 40;
      maxTypingDelay = 120;
    }

    const runTypingLoop = () => {
      if (!this.isPlaying) return;
      this.playKeyboardClick();
      // Re-trigger typing sound on random interval to simulate human (or chaotic) typing cadence
      const nextDelay = Math.random() * (maxTypingDelay - minTypingDelay) + minTypingDelay;
      this.typingInterval = setTimeout(runTypingLoop, nextDelay);
    };
    runTypingLoop();

    // 2. ALERT / ALARM SCHEDULING
    // Day 0 & 1: No alerts
    // Day 2: Every 8-12 seconds (quiet notification)
    // Day 3: Every 4-6 seconds (server warnings)
    // Day 4: Every 1.5-3 seconds (cacophony / phone lines burning)
    if (this.activeDay >= 2) {
      let alarmMin = 8000;
      let alarmMax = 14000;

      if (this.activeDay === 3) {
        alarmMin = 3000;
        alarmMax = 6000;
      } else if (this.activeDay === 4) {
        alarmMin = 800;
        alarmMax = 2200;
      }

      const runAlarmLoop = () => {
        if (!this.isPlaying) return;
        this.playAlert();
        const nextAlarmDelay = Math.random() * (alarmMax - alarmMin) + alarmMin;
        this.alertInterval = setTimeout(runAlarmLoop, nextAlarmDelay);
      };
      runAlarmLoop();
    }
  }
}
