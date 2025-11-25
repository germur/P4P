import React from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (val: number) => void;
  description?: string;
}

export const SliderControl: React.FC<Props> = ({ label, value, onChange, description }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="font-semibold text-sm tracking-wider uppercase text-gray-300">{label}</label>
        <span className="text-red-500 font-bold font-mono">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-colors"
      />
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
  );
};