import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Fighter, CalculationResult } from '../types';

interface Props {
  fighter: Fighter;
  result: CalculationResult;
  onClick: () => void;
}

export const FighterRow: React.FC<Props> = ({ fighter, result, onClick }) => {
  const rankDiff = fighter.officialRank - result.rank; // Positive means moved UP (e.g. was 5, now 2)
  
  return (
    <div 
      onClick={onClick}
      className="group relative bg-gray-800/50 hover:bg-gray-700/80 border-b border-gray-700 transition-all cursor-pointer p-4 flex items-center gap-4"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-red-600 transition-colors"></div>
      
      {/* Rank Section */}
      <div className="flex flex-col items-center w-12 shrink-0">
        <span className="text-3xl font-bold font-['Teko'] text-white leading-none">{result.rank}</span>
        <div className="flex items-center text-xs font-bold mt-1">
          {rankDiff > 0 ? (
            <span className="text-green-500 flex items-center"><ArrowUp size={12} /> {rankDiff}</span>
          ) : rankDiff < 0 ? (
            <span className="text-red-500 flex items-center"><ArrowDown size={12} /> {Math.abs(rankDiff)}</span>
          ) : (
             <span className="text-gray-500"><Minus size={12} /></span>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-red-500 transition-colors">
            {/* Using a gradient placeholder if image fails, normally real images would go here */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs text-gray-500">
             IMG
            </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg md:text-xl font-bold text-white truncate group-hover:text-red-400 transition-colors uppercase tracking-tight">
          {fighter.name}
        </h3>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{fighter.division} • {fighter.record}</p>
        
        {/* Mobile Mini Stats */}
        <div className="flex md:hidden gap-3 mt-2 text-[10px] text-gray-500">
           <span>ARI Score: <span className="text-red-400">{result.totalScore}</span></span>
        </div>
      </div>

      {/* Desktop Score Stats */}
      <div className="hidden md:flex flex-col items-end gap-1 w-32 shrink-0">
        <div className="text-sm text-gray-400 uppercase text-[10px] tracking-widest">ARI Score</div>
        <div className="text-2xl font-bold font-mono text-red-500">{result.totalScore}</div>
        <div className="text-xs text-gray-500">Oficial: #{fighter.officialRank}</div>
      </div>
    </div>
  );
};