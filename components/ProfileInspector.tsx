
import React, { useState } from 'react';
import { ProfileInput, ProfileAnalysis } from '../types';

interface Props {
  onAnalyze: (input: ProfileInput) => void;
  loading: boolean;
  results: ProfileAnalysis | null;
}

const ProfileInspector: React.FC<Props> = ({ onAnalyze, loading, results }) => {
  const [input, setInput] = useState<ProfileInput>({
    username: 'crypto_guy_99',
    bio: 'Investing expert | DM for signals | 100x gains guaranteed',
    followers: 12400,
    following: 200,
    postFrequency: '15 posts/hour'
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-blue-500">🔍</span> Profile Authenticity Inspector
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profile Handle</label>
              <input 
                type="text" 
                value={input.username}
                onChange={(e) => setInput({...input, username: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Biography / Description</label>
              <textarea 
                rows={3}
                value={input.bio}
                onChange={(e) => setInput({...input, bio: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="User bio content..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Followers</label>
                <input 
                  type="number" 
                  value={input.followers}
                  onChange={(e) => setInput({...input, followers: parseInt(e.target.value)})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Following</label>
                <input 
                  type="number" 
                  value={input.following}
                  onChange={(e) => setInput({...input, following: parseInt(e.target.value)})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Activity Metric (e.g. posts/hr)</label>
              <input 
                type="text" 
                value={input.postFrequency}
                onChange={(e) => setInput({...input, postFrequency: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button 
              onClick={() => onAnalyze(input)}
              disabled={loading}
              className="w-full h-[52px] bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Run ML Analysis"}
            </button>
          </div>
        </div>

        {results && (
          <div className="border-t border-slate-800 pt-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      results.status === 'genuine' ? 'bg-emerald-500/10 text-emerald-400' : 
                      results.status === 'fake' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      System Verdict: {results.status}
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-2">{results.category} Detected</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Confidence</p>
                    <p className="text-3xl font-black text-blue-500">{results.confidenceScore}%</p>
                  </div>
                </div>
                
                <p className="text-slate-400 italic">"{results.verdict}"</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.riskFactors.map((factor, i) => (
                    <div key={i} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{factor.label}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          factor.level === 'high' ? 'bg-red-900/40 text-red-400' : 
                          factor.level === 'medium' ? 'bg-amber-900/40 text-amber-400' : 'bg-slate-800 text-slate-400'
                        }`}>{factor.level}</span>
                      </div>
                      <p className="text-xs text-slate-500">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInspector;
