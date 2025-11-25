import React, { useState, useMemo } from 'react';
import { Settings2, Info } from 'lucide-react';
import { FIGHTERS, INITIAL_WEIGHTS } from './constants';
import { calculateARIRankings } from './utils/ariAlgorithm';
import { FighterRow } from './components/FighterRow';
import { SliderControl } from './components/SliderControl';
import { FighterDetailModal } from './components/FighterDetailModal';
import { Weights } from './types';

const App: React.FC = () => {
  const [weights, setWeights] = useState<Weights>(INITIAL_WEIGHTS);
  const [selectedFighterId, setSelectedFighterId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Memoized calculation to avoid recalculating on every render unless weights change
  const rankings = useMemo(() => {
    return calculateARIRankings(FIGHTERS, weights);
  }, [weights]);

  const handleWeightChange = (key: keyof Weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const selectedFighter = FIGHTERS.find(f => f.id === selectedFighterId) || null;
  const selectedResult = rankings.find(r => r.fighterId === selectedFighterId);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tighter uppercase font-['Teko']">UFC <span className="text-red-600">ARI</span> Calculator</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Algoritmo de Rendimiento Integral</p>
        </div>
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-300 hover:text-white bg-gray-800 rounded-lg"
        >
          <Settings2 size={24} />
        </button>
      </div>

      {/* Sidebar / Controls Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-80 bg-[#020617] border-r border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-800 hidden md:block">
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase font-['Teko'] leading-none">UFC <span className="text-red-600">ARI</span></h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Ranking Objetivo 2025</p>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <Settings2 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Configurar Algoritmo</span>
          </div>
          
          <SliderControl 
            label="Recencia y Actividad" 
            value={weights.activity} 
            onChange={(v) => handleWeightChange('activity', v)}
            description="Penaliza inactividad y premia frecuencia (Ej: Merab)."
          />
          <SliderControl 
            label="Nivel de Oposición (SOS)" 
            value={weights.sos} 
            onChange={(v) => handleWeightChange('sos', v)}
            description="Importancia del ranking del rival (Recursivo)."
          />
          <SliderControl 
            label="Dominio y Control" 
            value={weights.control} 
            onChange={(v) => handleWeightChange('control', v)}
            description="Tiempo de control y volumen de golpes."
          />
          <SliderControl 
            label="Daño y Finalización" 
            value={weights.finish} 
            onChange={(v) => handleWeightChange('finish', v)}
            description="Valoración de KOs y Submisiones (Ej: Ilia)."
          />
          
          <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
             <div className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed">
               <Info size={16} className="mt-0.5 shrink-0" />
               <p>
                 Ajusta los controles para ver cómo cambia el ranking. Un modelo enfocado en "Daño" favorece a Ilia/Pereira. Un modelo enfocado en "Actividad" favorece a Merab/Pantoja.
               </p>
             </div>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-4 bg-gray-900 text-center text-red-500 font-bold border-t border-gray-800"
        >
            CERRAR CONTROLES
        </button>
      </aside>

      {/* Main Content: Leaderboard */}
      <main className="flex-grow overflow-y-auto bg-[#0f172a] relative">
        <div className="max-w-4xl mx-auto md:p-8 p-4">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-['Teko'] uppercase font-bold text-white">Clasificación P4P</h2>
            <span className="text-xs text-gray-500">Datos proyectados a Nov 2025</span>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="flex bg-gray-950 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
               <div className="w-12 text-center shrink-0">Rank</div>
               <div className="w-12 md:w-16 shrink-0"></div>
               <div className="flex-grow">Luchador</div>
               <div className="hidden md:block w-32 text-right">Puntaje ARI</div>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-800">
              {rankings.map((result) => {
                const fighter = FIGHTERS.find(f => f.id === result.fighterId);
                if (!fighter) return null;
                return (
                  <FighterRow 
                    key={fighter.id} 
                    fighter={fighter} 
                    result={result} 
                    onClick={() => setSelectedFighterId(fighter.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedFighterId && (
        <FighterDetailModal 
            fighter={selectedFighter} 
            result={selectedResult} 
            onClose={() => setSelectedFighterId(null)} 
        />
      )}

      {/* Overlay for sidebar on mobile */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;