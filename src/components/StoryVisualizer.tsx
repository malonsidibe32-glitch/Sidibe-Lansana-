import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Activity, Flame, Shield, Users2, Quote } from 'lucide-react';
import { StoryDay } from '../types';
import InteractiveTooltip from './InteractiveTooltip';

interface StoryVisualizerProps {
  days: StoryDay[];
  currentIndex: number;
  onDayChange: (index: number) => void;
}

export default function StoryVisualizer({ days, currentIndex, onDayChange }: StoryVisualizerProps) {
  const currentDay = days[currentIndex];

  const handleNext = () => {
    if (currentIndex < days.length - 1) {
      onDayChange(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onDayChange(currentIndex - 1);
    }
  };

  // Helper to color metrics based on severity
  const getStabilityColor = (val: number) => {
    if (val > 70) return 'text-emerald-400 bg-emerald-500/10';
    if (val > 30) return 'text-amber-400 bg-amber-500/10';
    return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
  };

  const getChaosColor = (val: number) => {
    if (val < 20) return 'text-slate-400 bg-slate-500/10';
    if (val < 60) return 'text-amber-400 bg-amber-500/10';
    return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div id="story-visualizer" className="flex flex-col h-full bg-slate-900/40 backdrop-blur rounded-3xl border border-slate-800/80 p-6 md:p-8 justify-between relative overflow-hidden">
      {/* Absolute ambient lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>

      <div>
        {/* Timeline Progress Indicators */}
        <div className="flex justify-between items-center mb-8 bg-slate-950/60 p-2 rounded-full border border-slate-800/40">
          {days.map((day, idx) => {
            const isCompleted = idx <= currentIndex;
            const isActive = idx === currentIndex;
            
            return (
              <button
                key={day.id}
                id={`timeline-step-${idx}`}
                onClick={() => onDayChange(idx)}
                className="flex flex-col items-center flex-1 relative py-1 focus:outline-none group"
              >
                {/* Horizontal line connector */}
                {idx > 0 && (
                  <div className={`absolute left-0 right-1/2 top-3 h-[2px] -translate-y-1/2 -translate-x-1/2 w-full z-0 transition-all duration-300 ${
                    idx <= currentIndex ? 'bg-emerald-500' : 'bg-slate-800'
                  }`} />
                )}
                
                {/* Visual Dot */}
                <span className={`w-4 h-4 rounded-full z-10 flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-emerald-400 ring-4 ring-emerald-500/20 scale-125' 
                    : isCompleted 
                      ? 'bg-emerald-600' 
                      : 'bg-slate-800 group-hover:bg-slate-700'
                }`} />

                {/* Micro Label */}
                <span className={`text-[10px] mt-1.5 font-medium transition-colors duration-200 ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-500 group-hover:text-slate-400'
                }`}>
                  {day.date.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Narrative Title & Date */}
        <div className="mb-6">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {currentDay.date}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-100 mt-3 tracking-tight">
            {currentDay.title}
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
            {currentDay.subtitle}
          </p>
        </div>

        {/* Story Text */}
        <div className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans space-y-4 min-h-[140px] max-h-[220px] overflow-y-auto pr-2">
          <p className="whitespace-pre-line">{currentDay.description}</p>
        </div>

        {/* Highlight Quote */}
        {currentDay.quote && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={`quote-${currentIndex}`}
            className="flex items-start gap-3 bg-slate-950/40 border-l-2 border-emerald-500 p-4 rounded-r-xl mb-8"
          >
            <Quote className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm italic text-slate-400 font-sans leading-relaxed">
              {currentDay.quote}
            </p>
          </motion.div>
        )}
      </div>

      {/* Interactive Live Metrics Dashboard */}
      <div className="bg-slate-950/60 border border-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-500" />
          Indicateurs en temps réel (SolarisTech)
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Stabilité Opérationnelle */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                <InteractiveTooltip term="Stabilité" definition="État d'intégrité opérationnelle du système d'information et des workflows de facturation automatisés." />
              </span>
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold font-display text-slate-100">
                {currentDay.metrics.stability}%
              </p>
              {/* Progress bar container */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentDay.metrics.stability}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    currentDay.metrics.stability > 70 
                      ? 'bg-emerald-500' 
                      : currentDay.metrics.stability > 30 
                        ? 'bg-amber-500' 
                        : 'bg-rose-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Satisfaction Clients */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                <InteractiveTooltip term="Clients" definition="Niveau de confiance des 10 plus gros clients de SolarisTech (suivis auparavant de près par Awa)." />
              </span>
              <Users2 className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold font-display text-slate-100">
                {currentDay.metrics.satisfaction}%
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentDay.metrics.satisfaction}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    currentDay.metrics.satisfaction > 70 
                      ? 'bg-sky-500' 
                      : currentDay.metrics.satisfaction > 30 
                        ? 'bg-amber-500' 
                        : 'bg-rose-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Niveau de Chaos */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                <InteractiveTooltip term="Panique" definition="Mesure du désarroi des équipes internes face à la perte des codes d'accès et des procédures d'urgence." />
              </span>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold font-display text-slate-100">
                {currentDay.metrics.chaos}%
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${currentDay.metrics.chaos}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    currentDay.metrics.chaos < 30 
                      ? 'bg-slate-500' 
                      : currentDay.metrics.chaos < 70 
                        ? 'bg-amber-500' 
                        : 'bg-rose-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Stress du DG */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                <InteractiveTooltip term="Stress DG" definition="Fréquence cardiaque simulée de Moussa (le DG) à mesure que les serveurs s'arrêtent de fonctionner." />
              </span>
              <Activity className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold font-display text-slate-100">
                {currentDay.metrics.pressure} <span className="text-[10px] font-sans text-slate-400 font-normal">BPM</span>
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentDay.metrics.pressure - 60) / 1.4}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    currentDay.metrics.pressure < 100 
                      ? 'bg-emerald-500' 
                      : currentDay.metrics.pressure < 150 
                        ? 'bg-amber-500' 
                        : 'bg-rose-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <button
          id="btn-prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>

        <span className="text-[11px] font-mono text-slate-500">
          Étape {currentIndex + 1} sur {days.length}
        </span>

        <button
          id="btn-next"
          onClick={handleNext}
          disabled={currentIndex === days.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white disabled:opacity-30 disabled:hover:bg-emerald-600 transition-all shadow-md shadow-emerald-950/20"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
