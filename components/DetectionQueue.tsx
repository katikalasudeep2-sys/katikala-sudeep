
import React from 'react';

const MOCK_QUEUE = [
  { id: 1, user: "@bot_master_22", reason: "Unusual Post Volume", time: "2m ago", risk: "High" },
  { id: 2, user: "@elon_musk_officiall", reason: "Impersonation Attempt", time: "14m ago", risk: "High" },
  { id: 3, user: "@user7748219", reason: "Randomized Handle Pattern", time: "28m ago", risk: "Medium" },
  { id: 4, user: "@free_gift_claims", reason: "Known Phishing Link", time: "1h ago", risk: "High" },
  { id: 5, user: "@inactive_buyer", reason: "Suspicious Network Ratio", time: "3h ago", risk: "Low" },
];

const DetectionQueue: React.FC<{ fullWidth?: boolean }> = ({ fullWidth }) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 h-full ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-emerald-500">🛡️</span> Detection Queue
        </h3>
        <button className="text-xs text-blue-500 font-bold hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {MOCK_QUEUE.map((item) => (
          <div key={item.id} className="group p-4 bg-slate-950/30 border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all cursor-pointer flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
              item.risk === 'High' ? 'bg-red-500/10 text-red-500' : 
              item.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400'
            }`}>
              {item.risk[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{item.user}</p>
              <p className="text-xs text-slate-500 truncate">{item.reason}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-600 font-bold uppercase">{item.time}</p>
              <button className="text-[10px] text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
        <p className="text-xs text-blue-300 leading-relaxed">
          <strong>Proactive Tip:</strong> 82% of current high-risk detections are originating from the 'Impersonator' category. Consider updating the ensemble weights for profile picture verification.
        </p>
      </div>
    </div>
  );
};

export default DetectionQueue;
