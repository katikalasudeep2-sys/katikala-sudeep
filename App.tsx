
import React, { useState, useEffect } from 'react';
import { analyzeProfile } from './services/geminiService';
import { ProfileInput, ProfileAnalysis, SystemStats } from './types';
import Sidebar from './components/Sidebar';
import StatsOverview from './components/StatsOverview';
import ProfileInspector from './components/ProfileInspector';
import DetectionQueue from './components/DetectionQueue';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inspector' | 'queue'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProfileAnalysis | null>(null);
  
  const [stats] = useState<SystemStats>({
    totalScanned: 12849,
    fakeDetected: 1422,
    accuracy: "91.2%",
    avgResponseTime: "1.4s"
  });

  const handleAnalyze = async (input: ProfileInput) => {
    setLoading(true);
    try {
      const data = await analyzeProfile(input);
      setResults(data);
      setActiveTab('inspector');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Control Panel</h1>
            <p className="text-slate-400">ML-Powered Fake Profile Detection Engine</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <span className="text-xs uppercase text-emerald-400 font-bold block">Status</span>
              <span className="text-emerald-200 font-medium">Monitoring Live</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <StatsOverview stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileInspector onAnalyze={handleAnalyze} loading={loading} results={results} />
              <DetectionQueue />
            </div>
          </div>
        )}

        {activeTab === 'inspector' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <ProfileInspector onAnalyze={handleAnalyze} loading={loading} results={results} />
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <DetectionQueue fullWidth />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
