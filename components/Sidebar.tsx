
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inspector', label: 'Profile Inspector', icon: '🔍' },
    { id: 'queue', label: 'Detection Queue', icon: '🛡️' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-xl">🛡️</span>
        </div>
        <span className="font-bold text-xl text-white tracking-tight">SocialGuard</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="p-4 bg-slate-800/50 rounded-2xl">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Admin Session</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">AD</div>
            <div className="text-sm">
              <p className="text-white font-medium">Root Admin</p>
              <p className="text-slate-500 text-xs truncate">admin@socialguard.ai</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
