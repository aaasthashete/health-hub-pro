import React from 'react';
import { Home, FileText, Users, User, Plus } from 'lucide-react';
import { useApp, Tab } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function TabBar() {
  const { activeTab, setActiveTab, setCurrentScreen } = useApp();

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'scan') {
      setCurrentScreen('scan');
    } else {
      setCurrentScreen(tab);
    }
  };

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Home' },
    { id: 'history' as Tab, icon: FileText, label: 'History' },
    { id: 'scan' as Tab, icon: Plus, label: 'Scan', isCenter: true },
    { id: 'family' as Tab, icon: Users, label: 'Family' },
    { id: 'profile' as Tab, icon: User, label: 'Profile' },
  ];

  return (
    <div className="tab-bar absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 safe-area-pb">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center justify-center w-[75px] py-2 transition-all duration-300 group",
            tab.isCenter && "relative -mt-6"
          )}
        >
          {tab.isCenter ? (
            <div className="scan-button">
              <Plus className="w-7 h-7 text-primary-foreground relative z-10" strokeWidth={2.5} />
            </div>
          ) : (
            <>
              <div className={cn(
                "relative p-2 rounded-xl transition-all duration-300",
                activeTab === tab.id && "bg-primary/10"
              )}>
                <tab.icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    activeTab === tab.id 
                      ? "text-primary scale-110" 
                      : "text-text-tertiary group-hover:text-text-secondary"
                  )}
                  strokeWidth={activeTab === tab.id ? 2 : 1.5}
                />
              </div>
              <span 
                className={cn(
                  "text-xs mt-0.5 transition-all duration-300 font-medium",
                  activeTab === tab.id 
                    ? "text-primary" 
                    : "text-text-tertiary group-hover:text-text-secondary"
                )}
              >
                {tab.label}
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}