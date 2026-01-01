
import React from 'react';
import { GreetingData } from '../types';

interface GreetingDisplayProps {
  data: GreetingData | null;
  imageUrl: string | null;
  loading: boolean;
}

const GreetingDisplay: React.FC<GreetingDisplayProps> = ({ data, imageUrl, loading }) => {
  if (loading && !data) {
    return (
      <div className="w-full aspect-[16/9] bg-slate-900/50 rounded-3xl animate-pulse flex items-center justify-center">
        <p className="text-slate-500 font-medium">Linguist AI is thinking...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Artwork Section */}
      <div className="relative group overflow-hidden rounded-3xl shadow-2xl bg-slate-900 aspect-[16/9]">
        {loading || !imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-300 text-sm">Generating Visual Interpretation...</p>
            </div>
          </div>
        ) : null}
        
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="AI interpretation" 
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${loading ? 'blur-md' : 'blur-0'}`}
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent">
          <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2 font-bold">Linguistic Translation</p>
          <div className="flex flex-col md:flex-row md:items-baseline gap-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              {data.originalScript}
            </h2>
            <span className="text-2xl md:text-3xl font-light text-blue-300 italic opacity-80">
              ({data.translation})
            </span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect p-8 rounded-3xl">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Pronunciation
          </h3>
          <p className="text-2xl text-slate-100 font-medium leading-relaxed">
            {data.pronunciation}
          </p>
        </div>

        <div className="glass-effect p-8 rounded-3xl">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Cultural Essence
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            {data.culturalContext}
          </p>
        </div>
      </div>

      <div className="p-6 border border-slate-800 rounded-3xl bg-slate-900/30">
         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Visual Prompt used by Gemini:</h4>
         <p className="text-slate-400 italic text-sm">{data.visualPrompt}</p>
      </div>
    </div>
  );
};

export default GreetingDisplay;
