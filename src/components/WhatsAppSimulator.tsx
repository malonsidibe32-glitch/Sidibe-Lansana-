import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Video, MoreVertical, Send, CheckCheck, ShieldAlert } from 'lucide-react';
import { WhatsAppMessage } from '../types';

interface WhatsAppSimulatorProps {
  messages: WhatsAppMessage[];
  currentDayIndex: number;
}

export default function WhatsAppSimulator({ messages, currentDayIndex }: WhatsAppSimulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map day index to what messages should be visible
  // Day 0 (Lundi): w1, w2, w3
  // Day 1 (Mardi): w1-w4
  // Day 2 (Mercredi): w1-w6
  // Day 3 (Jeudi): w1-w8
  // Day 4 (Vendredi): w1-w10
  const getVisibleMessages = () => {
    if (currentDayIndex === 0) return messages.slice(0, 3);
    if (currentDayIndex === 1) return messages.slice(0, 4);
    if (currentDayIndex === 2) return messages.slice(0, 6);
    if (currentDayIndex === 3) return messages.slice(0, 8);
    return messages; // Day 4 (Friday)
  };

  const visibleMessages = getVisibleMessages();

  // Scroll to bottom when message count changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages.length]);

  // Status text based on current day
  const getStatusText = () => {
    if (currentDayIndex === 0) return "En ligne";
    if (currentDayIndex === 1) return "Dernière connexion mar. à 10:05";
    if (currentDayIndex === 2) return "Dernière connexion hier à 10:05";
    if (currentDayIndex === 3) return "Dernière connexion mar. à 10:05";
    return "Dernière connexion mar. à 10:05";
  };

  return (
    <div id="whatsapp-simulator" className="w-full max-w-sm mx-auto bg-slate-950 rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-hidden aspect-[9/19] flex flex-col relative font-sans">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center">
        <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
        <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
      </div>

      {/* WhatsApp Header */}
      <div className="bg-emerald-900/90 backdrop-blur text-white pt-8 pb-3 px-4 flex items-center justify-between border-b border-emerald-950/40 z-10">
        <div className="flex items-center space-x-2 mt-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-emerald-800 flex items-center justify-center font-bold text-emerald-100">
              M
            </div>
            {currentDayIndex === 0 && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-sm leading-tight text-emerald-50">Moussa (DG)</h4>
            <p className="text-[10px] text-emerald-300/85 font-medium transition-all duration-300">
              {getStatusText()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-emerald-100 mt-1">
          <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
          <Video className="w-4 h-4 cursor-pointer hover:text-white" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* WhatsApp Background Wallpaper */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative flex flex-col scroll-smooth"
        style={{
          backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundColor: '#0a0f0d'
        }}
      >
        <div className="self-center bg-slate-900/80 backdrop-blur text-[10px] text-slate-400 py-1 px-3 rounded-md border border-slate-800/50 mb-2 font-mono">
          Chiffrement de bout en bout actif
        </div>

        <AnimatePresence initial={false}>
          {visibleMessages.map((msg, idx) => {
            const isMoussa = msg.sender === 'moussa';
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs relative flex flex-col ${
                  isMoussa 
                    ? 'bg-slate-800 text-slate-100 self-start rounded-tl-none border border-slate-700/30' 
                    : 'bg-emerald-800 text-emerald-50 self-end rounded-tr-none border border-emerald-700/30'
                }`}
              >
                {/* Message Text */}
                <p className="leading-relaxed break-words">{msg.text}</p>
                
                {/* Meta details */}
                <div className="flex items-center justify-end space-x-1 mt-1 self-end text-[9px] text-slate-400/80 font-mono">
                  <span>{msg.time.split(', ')[1] || msg.time}</span>
                  {!isMoussa && (
                    <CheckCheck className={`w-3.5 h-3.5 ${currentDayIndex >= 2 ? 'text-sky-400' : 'text-slate-400'}`} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator or notification alerts */}
        {currentDayIndex === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-2 rounded-xl bg-rose-950/40 border border-rose-900/30 text-[10px] text-rose-300 text-center gap-1.5 font-mono"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Moussa tente de vous appeler en boucle...</span>
          </motion.div>
        )}
      </div>

      {/* WhatsApp Input Bar */}
      <div className="bg-slate-900 px-4 py-3 flex items-center space-x-2 border-t border-slate-800/60 pb-6">
        <div className="flex-1 bg-slate-800 rounded-full px-4 py-2 flex items-center justify-between border border-slate-700/50">
          <input 
            type="text" 
            placeholder="Écrire un message..." 
            disabled
            className="bg-transparent text-xs text-slate-400 outline-none w-full cursor-not-allowed font-sans"
          />
        </div>
        <button 
          disabled
          className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white cursor-not-allowed opacity-50 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
