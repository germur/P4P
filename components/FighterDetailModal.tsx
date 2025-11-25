import React from 'react';
import { X, Trophy, Activity, Skull, Shield, Zap } from 'lucide-react';
import { Fighter, CalculationResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

interface Props {
  fighter: Fighter | null;
  result: CalculationResult | undefined;
  onClose: () => void;
}

export const FighterDetailModal: React.FC<Props> = ({ fighter, result, onClose }) => {
  if (!fighter || !result) return null;

  const data = [
    { subject: 'Actividad', A: result.breakdown.activityScore, fullMark: 150 },
    { subject: 'Rival (SOS)', A: result.breakdown.sosScore, fullMark: 150 },
    { subject: 'Dominio', A: result.breakdown.dominanceScore, fullMark: 150 },
    { subject: 'Finalización', A: result.breakdown.finishScore, fullMark: 150 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 w-full max-w-4xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex justify-between items-start border-b border-gray-700">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase font-['Teko'] tracking-wide">
              {fighter.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold uppercase">{fighter.division}</span>
                {fighter.isMultiDivChamp && <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded font-bold uppercase">Champ-Champ</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Col: Stats */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-gray-400 text-xs uppercase flex items-center gap-1 mb-1">
                        <Trophy size={14} /> Ranking Real
                    </div>
                    <div className="text-3xl font-bold text-white">#{fighter.officialRank}</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-red-900/50">
                    <div className="text-red-400 text-xs uppercase flex items-center gap-1 mb-1">
                        <Zap size={14} /> ARI Ranking
                    </div>
                    <div className="text-3xl font-bold text-red-500">#{result.rank}</div>
                </div>
              </div>

              <div className="space-y-3">
                 <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-gray-700 pb-2">Estadísticas Clave (2025)</h3>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Récord</span>
                    <span className="text-white font-mono">{fighter.record}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Peleas (Últimos 12m)</span>
                    <span className="text-white font-mono">{fighter.fightsInLast12Months}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Última Pelea</span>
                    <span className="text-white font-mono">{fighter.lastFightDate}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Control Promedio</span>
                    <span className="text-white font-mono">{fighter.controlTimeAvg} min</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tasa Finalización</span>
                    <span className="text-white font-mono">{(fighter.finishRate * 100).toFixed(0)}%</span>
                 </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg text-sm text-gray-300 italic border-l-2 border-red-500">
                  "El Algoritmo de Rendimiento Integral calcula que {fighter.name} tiene un puntaje total de <span className="text-white font-bold">{result.totalScore}</span>. 
                  Esto se debe a su {result.breakdown.activityScore > 40 ? "alta actividad" : "actividad moderada"} y 
                  {result.breakdown.sosScore > 60 ? " excepcional calidad de oposición." : " nivel de competencia estándar."}"
              </div>
            </div>

            {/* Right Col: Charts */}
            <div className="h-64 md:h-full min-h-[300px] flex flex-col">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest text-center mb-4">Desglose de Vectores ARI</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Radar
                        name="Fighter"
                        dataKey="A"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                        itemStyle={{ color: '#ef4444' }}
                    />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};