import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Flame, BookOpen, UserCheck, 
  Linkedin, ExternalLink, HelpCircle, Briefcase, ChevronRight,
  Quote, RefreshCw, Volume2, VolumeX
} from 'lucide-react';
import { SOLARISTECH_STORY_DAYS, MOCK_WHATSAPP_MESSAGES, ANONYMOUS_QUOTES } from './data';
import StoryVisualizer from './components/StoryVisualizer';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import IrreplaceabilityCalculator from './components/IrreplaceabilityCalculator';
import ProductivityChart from './components/ProductivityChart';
import { OfficeAudioEngine } from './utils/AudioEngine';
import InteractiveTooltip from './components/InteractiveTooltip';

export default function App() {
  const [activeTab, setActiveTab] = useState<'awa' | 'calculator'>('awa');
  const [awaStoryIndex, setAwaStoryIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIsolationModeEnabled, setIsIsolationModeEnabled] = useState(true);
  const audioEngine = useRef<OfficeAudioEngine | null>(null);

  const isIsolated = activeTab === 'awa' && awaStoryIndex >= 2 && isIsolationModeEnabled;

  useEffect(() => {
    // Initialize audio engine on client mount
    audioEngine.current = new OfficeAudioEngine();
    return () => {
      if (audioEngine.current) {
        audioEngine.current.toggle(false);
      }
    };
  }, []);

  // Synchronize story step with synthesizer stress level
  useEffect(() => {
    if (audioEngine.current) {
      audioEngine.current.setDay(awaStoryIndex);
    }
  }, [awaStoryIndex]);

  const handleToggleAudio = () => {
    if (audioEngine.current) {
      const playing = audioEngine.current.toggle();
      setIsAudioPlaying(playing);
    }
  };

  const handleRandomQuote = () => {
    if (ANONYMOUS_QUOTES.length <= 1) return;
    let nextIndex = Math.floor(Math.random() * ANONYMOUS_QUOTES.length);
    while (nextIndex === quoteIndex) {
      nextIndex = Math.floor(Math.random() * ANONYMOUS_QUOTES.length);
    }
    setQuoteIndex(nextIndex);
  };

  const currentQuote = ANONYMOUS_QUOTES[quoteIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-950/10 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* Header Bar */}
      <header className="border-b border-slate-900/80 bg-slate-950/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo / Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display tracking-tight text-slate-100">La Force du Silence</h1>
              <p className="text-[10px] font-mono text-emerald-400">SolarisTech Case Simulator</p>
            </div>
          </div>

          {/* Actions: Sound Toggle + Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
            {/* Ambient Sound Trigger */}
            <button
              id="btn-toggle-audio"
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                isAudioPlaying
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                  : 'bg-slate-900/80 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Activer l'ambiance sonore du bureau"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="inline">Sons Bureau : Actifs</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="inline">Ambiance Bureau : Off</span>
                </>
              )}
            </button>

            {/* Isolation Mode Trigger */}
            {activeTab === 'awa' && (
              <button
                id="btn-toggle-isolation"
                onClick={() => setIsIsolationModeEnabled(!isIsolationModeEnabled)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                  isIsolated
                    ? 'bg-rose-500/15 border-rose-500/35 text-rose-300 hover:bg-rose-500/25'
                    : isIsolationModeEnabled
                      ? 'bg-slate-900/80 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-950/40 border-slate-900/40 text-slate-500 hover:text-slate-400'
                }`}
                title="Activer ou désactiver l'effacement immersif des autres sections"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isIsolated ? 'bg-rose-500 animate-pulse' : isIsolationModeEnabled ? 'bg-slate-400' : 'bg-slate-600'}`} />
                <span>Isolement {isIsolated ? 'Actif' : isIsolationModeEnabled ? 'Auto' : 'Off'}</span>
              </button>
            )}

            {/* Tab Navigation */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
              <button
                id="tab-awa"
                onClick={() => setActiveTab('awa')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'awa'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                L'Histoire d'Awa
              </button>
              <button
                id="tab-calc"
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Mon Indice d'Ombre
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
        
        {/* Animated Headline Quote Section */}
        <div className={`text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4 transition-all duration-1000 ${isIsolated ? 'opacity-10 blur-[2px] pointer-events-none scale-95' : 'opacity-100'}`}>
          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            À tous les employés discrets qui soutiennent l'empire
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-slate-100 tracking-tight leading-none">
            Votre silence n'est pas de la faiblesse.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              C'est un pouvoir invisible.
            </span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-sans">
            Moussa pensait qu'Awa était remplaçable car elle ne faisait pas de bruit. Il l'a virée. 
            En 48 heures, sa boîte s'est effondrée. Découvrez cette mise en scène captivante ou simulez l'impact de votre propre départ.
          </p>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[500px]">
          {activeTab === 'awa' ? (
            /* Tab 1: Interactive Awa Story */
            <div className="space-y-6">
              <AnimatePresence>
                {isIsolated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-2xl text-center text-xs text-rose-300 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                      <span>
                        <strong>Effondrement opérationnel (Mode Isolement) :</strong> L'absence d'Awa paralyse SolarisTech. Les autres sections de la page s'effacent pour illustrer le vide laissé par son départ.
                      </span>
                      <button
                        onClick={() => setIsIsolationModeEnabled(false)}
                        className="underline text-[11px] font-mono hover:text-rose-200 cursor-pointer ml-1"
                      >
                        [Afficher tout]
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
                {/* Left Column: Visualizer & Metrics */}
                <div className="lg:col-span-7 h-full">
                  <StoryVisualizer
                    days={SOLARISTECH_STORY_DAYS}
                    currentIndex={awaStoryIndex}
                    onDayChange={setAwaStoryIndex}
                  />
                </div>

                {/* Right Column: WhatsApp simulated thread */}
                <div className="lg:col-span-5 flex flex-col justify-center items-center">
                  <div className="text-center mb-4 lg:hidden">
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                      Fil WhatsApp de Moussa (Défilement auto)
                    </p>
                  </div>
                  <WhatsAppSimulator
                    messages={MOCK_WHATSAPP_MESSAGES}
                    currentDayIndex={awaStoryIndex}
                  />
                </div>

              </div>
            </div>
          ) : (
            /* Tab 2: Custom Irreplaceability Calculator */
            <div className="max-w-4xl mx-auto">
              <IrreplaceabilityCalculator />
            </div>
          )}
        </div>

        {/* Secondary Corporate Context (Dimmed in Isolation Mode to accentuate Awa's Absence) */}
        <div className={`transition-all duration-1000 ${isIsolated ? 'opacity-10 blur-[2px] pointer-events-none scale-[0.98] origin-top select-none' : 'opacity-100'}`}>
          
          {/* Gallup statistic callout */}
          <section className="mt-16 md:mt-24 bg-gradient-to-b from-slate-900/60 to-slate-950/20 border border-slate-900 p-6 md:p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-2xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Stat Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-slate-950/60 border border-slate-800/60 rounded-2xl">
              <span className="text-5xl md:text-6xl font-black font-display text-emerald-400">70%</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-2 font-bold">
                <InteractiveTooltip 
                  term="Indice Gallup" 
                  definition="Mesure statistique de l'engagement et de l'alignement des salariés. Gallup démontre qu'une grande part de la valeur repose sur des piliers silencieux rarement mis en avant."
                />
              </span>
            </div>

            {/* Stat Message */}
            <div className="md:col-span-8 space-y-3 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold font-display text-slate-100">
                La majorité des employés critiques sont invisibles.
              </h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                Selon l'institut Gallup, près de 70% des <InteractiveTooltip term="salariés indispensables" definition="Les profils clés ou 'Single Points of Failure' (SPOF) d'une structure : s'ils s'en vont, un pan entier de l'activité s'arrête instantanément." /> ne se vendent jamais lors des réunions ou des évaluations annuelles. Ils gèrent en silence les rouages techniques et administratifs que leurs dirigeants ne comprennent même pas.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Précision de l'infrastructure
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Gestion de crise silencieuse
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Productivity Collapse Area Chart */}
        <ProductivityChart />

        {/* Anonymous Testimonies Section */}
        <section id="anonymous-testimonies" className="mt-8 bg-slate-900/30 border border-slate-900 p-6 md:p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full filter blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                Paroles de l'ombre
              </span>
              <h3 className="text-lg md:text-xl font-bold font-display text-slate-100 mt-2">
                Paroles de l'Ombre : Témoignages Anonymes
              </h3>
              <p className="text-slate-400 text-xs md:text-sm">
                Découvrez des tranches de vie d'employés discrets qui font tourner la machine au quotidien.
              </p>
            </div>
            
            <button
              id="btn-next-quote"
              onClick={handleRandomQuote}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-hover:spin" />
              Autre témoignage
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl relative min-h-[160px] flex flex-col justify-between">
            <Quote className="absolute top-4 right-6 w-12 h-12 text-slate-800/40 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic font-sans pr-8">
                  {currentQuote.text}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-900/80 pt-3">
                  <div>
                    <span className="text-xs font-bold text-slate-100 block">
                      — {currentQuote.role} (Anonyme)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {currentQuote.seniority}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10">
                    Témoignage {quoteIndex + 1} / {ANONYMOUS_QUOTES.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        </div>
      </main>

      {/* Footer / Punchline */}
      <footer className="border-t border-slate-900/60 bg-slate-950 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-xs text-slate-400 font-sans">
              « Est-ce que ton boss découvrira ta valeur avant ou après ton départ ? »
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Inspiré de récits réels de résistance silencieuse d'entreprise.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-[11px] font-mono text-slate-500">
              SolarisTech Simulator v1.0.0
            </span>
            <div className="w-px h-4 bg-slate-800" />
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-emerald-400 transition-colors"
              title="Partager sur LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
