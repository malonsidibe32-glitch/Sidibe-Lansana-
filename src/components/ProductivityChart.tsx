import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingDown, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import InteractiveTooltip from './InteractiveTooltip';

const chartData = [
  { day: 'Lundi', date: 'Avant départ', 'Productivité (%)': 100, 'Niveau de Panique (%)': 5, description: 'Tout fonctionne parfaitement en arrière-plan.' },
  { day: 'Mardi', date: 'Le Renvoi', 'Productivité (%)': 95, 'Niveau de Panique (%)': 15, description: 'Awa est virée le matin. Tout paraît calme.' },
  { day: 'Mercredi', date: '24h Après', 'Productivité (%)': 45, 'Niveau de Panique (%)': 55, description: 'Dossiers introuvables. Les clients s\'impatientent.' },
  { day: 'Jeudi', date: '48h Après', 'Productivité (%)': 15, 'Niveau de Panique (%)': 90, description: 'La facturation plante. Risque de coupure serveur.' },
  { day: 'Vendredi', date: '72h Après', 'Productivité (%)': 5, 'Niveau de Panique (%)': 100, description: 'Paralysie totale de SolarisTech. Appels en boucle.' }
];

export default function ProductivityChart() {
  return (
    <motion.div 
      id="productivity-chart" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExo / custom cubic-bezier
      className="bg-slate-900/40 backdrop-blur border border-slate-900 p-6 md:p-8 rounded-3xl relative overflow-hidden mt-8"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full filter blur-2xl"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-rose-400 uppercase bg-rose-500/5 px-3 py-1 rounded-full border border-rose-500/10">
            Impact Chronologique
          </span>
          <h3 className="text-lg md:text-xl font-bold font-display text-slate-100 mt-2">
            L'Effondrement Silencieux : Chute de SolarisTech
          </h3>
          <p className="text-slate-400 text-xs md:text-sm">
            Visualisation en temps réel de la perte d'activité comparée au pic de panique interne.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-mono text-slate-400">Productivité</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-[10px] font-mono text-slate-400">Panique</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full mt-4 bg-slate-950/40 border border-slate-900/80 p-4 rounded-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorChaos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              stroke="#64748b" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-xl font-sans max-w-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-100">{data.day}</span>
                        <span className="text-[10px] font-mono text-slate-500">{data.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-2 leading-relaxed border-b border-slate-900 pb-1.5">
                        {data.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-medium text-emerald-400">
                          <span>Productivité :</span>
                          <span>{data['Productivité (%)']}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium text-rose-400">
                          <span>Niveau de Panique :</span>
                          <span>{data['Niveau de Panique (%)']}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="Productivité (%)" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProd)" 
            />
            <Area 
              type="monotone" 
              dataKey="Niveau de Panique (%)" 
              stroke="#f43f5e" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorChaos)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-950/60 border border-slate-800/40 p-4 rounded-xl flex items-start gap-3">
          <TrendingDown className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-rose-300">Productivité : -95% en 72 heures</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
              Le départ d'un rouage discret stoppe instantanément les <InteractiveTooltip term="flux automatisés" definition="Tâches exécutées en arrière-plan par des scripts cron (comme le renouvellement SSL ou l'envoi de factures) sans intervention humaine." />. L'équipe restante passe 100% de son temps à chercher des dossiers de fond plutôt qu'à produire.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/40 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300">Chaos opérationnel : +95% de panique</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
              Sans guide pour piloter l'architecture invisible, la boîte perd l'accès à ses <InteractiveTooltip term="passerelles de paiement" definition="Services tiers (comme Stripe) assurant la collecte sécurisée de l'argent des abonnements et clients de la plateforme." />, coupant brutalement la trésorerie et menant à un stress maximal au sommet de la direction.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
