
import React from 'react';
import { GreetingStyle } from '../types';

interface ControlsProps {
  language: string;
  style: GreetingStyle;
  loading: boolean;
  onLanguageChange: (val: string) => void;
  onStyleChange: (val: GreetingStyle) => void;
  onExplore: () => void;
}

const LANGUAGES = [
  "Japanese", "Arabic", "French", "Icelandic", "Mandarin", "Swahili", 
  "Greek", "Hindi", "Portuguese", "Russian", "Quechua", "Maori"
];

const STYLES: GreetingStyle[] = ["formal", "casual", "poetic", "futuristic", "historical"];

const Controls: React.FC<ControlsProps> = ({ 
  language, style, loading, onLanguageChange, onStyleChange, onExplore 
}) => {
  return (
    <div className="glass-effect p-6 rounded-3xl shadow-2xl flex flex-col gap-6">
      <div>
        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Select Language
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              disabled={loading}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                language === lang 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <input 
            type="text" 
            placeholder="Or type custom language..."
            value={LANGUAGES.includes(language) ? '' : language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Vibe & Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={() => onStyleChange(s)}
              disabled={loading}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                style === s 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onExplore}
        disabled={loading}
        className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : "Explore Greeting"}
      </button>
    </div>
  );
};

export default Controls;
