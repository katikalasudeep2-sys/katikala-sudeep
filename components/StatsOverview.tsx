
import React from 'react';
import { SystemStats } from '../types';

const StatsOverview: React.FC<{ stats: SystemStats }> = ({ stats }) => {
  const cards = [
    { label: 'Profiles Scanned', value: stats.totalScanned.toLocaleString(), color: 'blue' },
    { label: 'Fake Detected', value: stats.fakeDetected.toLocaleString(), color: 'red' },
    { label: 'Model Accuracy', value: stats.accuracy, color: 'emerald' },
    { label: 'Avg Analysis Time', value: stats.avgResponseTime, color: 'amber' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
          <p className="text-slate-500 text-sm font-medium mb-1">{card.label}</p>
          <p className="text-3xl font-bold text-white">{card.value}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-${card.color}-500 animate-pulse`}></span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Real-time Stream</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
