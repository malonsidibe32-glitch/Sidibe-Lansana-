import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ClipboardList, AlertTriangle, User, Building, 
  HelpCircle, ArrowRight, RefreshCw, Trophy, ListTodo, Share2, Copy, Check
} from 'lucide-react';
import { JOB_PRESETS } from '../data';
import { JobAnalysis } from '../types';

export default function IrreplaceabilityCalculator() {
  // Form inputs
  const [jobTitle, setJobTitle] = useState('');
  const [tasks, setTasks] = useState('');
  const [impact, setImpact] = useState('');
  const [bossName, setBossName] = useState('');
  const [companyName, setCompanyName] = useState('');

  // App states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<JobAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    "Analyse de votre profil professionnel...",
    "Compilation de vos tâches de l'ombre...",
    "Simulation du départ de votre entreprise...",
    "Calcul de l'indice de panique du management...",
    "Génération de la mise en scène dramatique par l'IA..."
  ];

  // Apply a preset
  const handleApplyPreset = (preset: typeof JOB_PRESETS[0]) => {
    setJobTitle(preset.title);
    setTasks(preset.tasks);
    setImpact(preset.impact);
    setBossName(preset.bossName);
    setCompanyName(preset.companyName);
  };

  // Submit form to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !tasks || !impact) return;

    setIsLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Stagger loading messages for premium UX
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobTitle,
          tasks,
          impact,
          bossName: bossName || 'Moussa',
          companyName: companyName || 'SolarisTech'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing job:", error);
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="irreplaceability-calculator" className="w-full bg-slate-900/40 backdrop-blur rounded-3xl border border-slate-800/80 p-6 md:p-8 relative overflow-hidden">
      {/* Absolute ambient lights */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {/* State 1: Form Input */}
        {!isLoading && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Calculez Votre Pouvoir de l'Ombre
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">
                Remplissez les détails de votre quotidien professionnel. L'intelligence artificielle va dresser le portrait dramatique de ce qui se casserait si vous décidiez de quitter votre poste demain matin.
              </p>
            </div>

            {/* Presets Grid */}
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2.5">
                Remplissage rapide par profil type :
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {JOB_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`preset-btn-${idx}`}
                    onClick={() => handleApplyPreset(preset)}
                    className="px-3 py-2 text-left rounded-xl bg-slate-950/40 border border-slate-800/60 text-[11px] font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-900/40 transition-all truncate"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                    Intitulé de Votre Poste
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="ex: Administrateur de bases de données, Coordinateur logistique..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    Nom de l'Entreprise (Optionnel)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="ex: SolarisTech"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Boss Name */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    Nom de votre Supérieur (Optionnel)
                  </label>
                  <input
                    type="text"
                    value={bossName}
                    onChange={e => setBossName(e.target.value)}
                    placeholder="ex: Moussa"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                  />
                </div>

                {/* Help Indicator */}
                <div className="bg-slate-950/40 border border-slate-800/40 rounded-xl p-3 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                    Saisir de vrais noms rend la mise en scène ultra-réaliste. Les données restent temporaires et ne sont pas conservées hors de votre session de navigation.
                  </p>
                </div>
              </div>

              {/* Tâches de l'ombre */}
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                  Vos Tâches Secrètes de l'Ombre
                </label>
                <textarea
                  required
                  rows={3}
                  value={tasks}
                  onChange={e => setTasks(e.target.value)}
                  placeholder="Qu'est-ce que vous gérez seul, en silence, sans que personne ne s'en aperçoive ? (ex: renouvellement manuel des clés d'API Stripe, script cron de backup, gestion officieuse des clients VIP grincheux...)"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans resize-none"
                />
              </div>

              {/* L'impact du départ */}
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  L'Impact Immédiat de Votre Départ (Ce qui va casser en 48 heures)
                </label>
                <textarea
                  required
                  rows={3}
                  value={impact}
                  onChange={e => setImpact(e.target.value)}
                  placeholder="Si vous disparaissez subitement un mardi matin, quelle sera la première catastrophe majeure ? (ex: blocage total des encaissements clients, suspension de notre serveur cloud, perte de 40% du chiffre d'affaires...)"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="btn-submit-calc"
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 hover:shadow-emerald-500/10 transition-all cursor-pointer"
                >
                  Générer Ma Mise en Scène
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* State 2: Loading State */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="py-16 flex flex-col items-center justify-center space-y-6 text-center"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            
            <div className="space-y-2 max-w-sm">
              <h3 className="text-sm font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Simulateur en cours...
              </h3>
              <p className="text-slate-300 text-sm font-sans animate-pulse">
                {loadingMessages[loadingStep]}
              </p>
              <div className="w-48 bg-slate-800 h-1.5 rounded-full mx-auto overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(loadingStep + 1) * 20}%` }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* State 3: Results Display */}
        {!isLoading && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header / Score Gauge */}
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-slate-800/60 pb-6">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Simulation de Pouvoir de l'Ombre
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-100 mt-2">
                  Votre diagnostic d'Irremplaçabilité
                </h2>
                <p className="text-slate-400 text-xs md:text-sm max-w-md">
                  Voici comment votre entreprise réagirait si vous décidiez de quitter votre poste.
                </p>
              </div>

              {/* Score Gauge */}
              <div className="relative shrink-0 flex items-center justify-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800/40">
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle 
                        cx="48" cy="48" r="40" 
                        stroke="#1e293b" strokeWidth="6" fill="transparent" 
                      />
                      <motion.circle 
                        cx="48" cy="48" r="40" 
                        stroke="#10b981" strokeWidth="6" fill="transparent"
                        strokeDasharray={2 * Math.PI * 40}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.irreplaceabilityScore / 100) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-xl font-bold font-display text-emerald-400">
                      {result.irreplaceabilityScore}%
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold mt-1.5">
                    Indice d'Ombre
                  </span>
                </div>
              </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Story Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-950/40 px-4 py-2 rounded-t-xl border border-b-0 border-slate-800/50">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                    Récit de Votre Départ
                  </span>
                  <button 
                    onClick={() => copyToClipboard(result.story)}
                    className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 hover:text-white transition-colors py-1 px-2.5 bg-slate-900 rounded border border-slate-800"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copié !' : 'Copier l\'histoire'}
                  </button>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-b-xl p-5 md:p-6 font-sans text-xs md:text-sm leading-relaxed text-slate-300 whitespace-pre-line shadow-inner max-h-[360px] overflow-y-auto pr-3">
                  {result.story}
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4 flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    💡
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-emerald-300">Analyse de Situation</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{result.impactAnalysis}</p>
                  </div>
                </div>
              </div>

              {/* Timeline & Advice Column */}
              <div className="space-y-6">
                {/* Timeline of Chaos */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Chronologie du Chaos (Simulé)
                  </h3>

                  <div className="space-y-2.5">
                    {result.timeline?.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          item.status === 'warning' 
                            ? 'bg-amber-950/10 border-amber-900/30 text-amber-400' 
                            : item.status === 'critical' 
                              ? 'bg-orange-950/10 border-orange-900/30 text-orange-400' 
                              : 'bg-rose-950/10 border-rose-900/30 text-rose-400'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold uppercase shrink-0 py-0.5 px-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {item.day}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Advice */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ListTodo className="w-3.5 h-3.5 text-emerald-400" />
                    Comment Valoriser Votre Silence ?
                  </h3>

                  <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-4 md:p-5 space-y-3">
                    {result.advice?.map((tip, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold font-mono mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800/60 justify-between items-center">
              <button
                onClick={() => {
                  setResult(null);
                  setCopied(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refaire une simulation
              </button>

              <button
                onClick={() => copyToClipboard(`Voici le diagnostic de mon poste sur le simulateur 'La Force du Silence'. Indice d'Irremplaçabilité : ${result.irreplaceabilityScore}%. Et vous, est-ce que votre boss découvrira votre valeur avant ou après votre départ ?`)}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-xs font-semibold text-slate-950 flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <Share2 className="w-3.5 h-3.5" />
                Partager le constat d'impact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
