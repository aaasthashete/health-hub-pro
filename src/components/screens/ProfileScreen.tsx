import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TabBar } from '@/components/TabBar';
import { 
  User, 
  FileText, 
  Moon, 
  Sun,
  Shield, 
  HelpCircle, 
  Info,
  ChevronRight,
  Pencil,
  AlertTriangle
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function ProfileScreen() {
  const { user, setCurrentScreen } = useApp();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: User, label: 'Edit Profile', onClick: () => setCurrentScreen('profile-setup') },
    { icon: FileText, label: 'Health Reports', badge: '18', onClick: () => {} },
    { icon: theme === 'dark' ? Sun : Moon, label: 'App Theme', isTheme: true, onClick: toggleTheme },
    { icon: Shield, label: 'Privacy & Security', hasArrow: true, onClick: () => {} },
    { icon: HelpCircle, label: 'Help & Support', hasArrow: true, onClick: () => {} },
    { icon: Info, label: 'About', hasArrow: true, onClick: () => {} },
  ];

  // Use Indian name as specified
  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : 'Kabir Sharma';

  return (
    <div className="absolute inset-0 bg-background-secondary overflow-hidden flex flex-col">
      {/* Header with Profile - No stats */}
      <div className="pt-12 px-5 pb-6 flex flex-col items-center">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-primary">
            <span className="text-3xl font-bold text-primary-foreground">
              {user?.firstName?.[0] || 'K'}
            </span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card shadow-md flex items-center justify-center border border-border">
            <Pencil className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

        {/* Name */}
        <h1 className="text-subtitle text-foreground mt-4 font-bold">
          {displayName}
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-36 custom-scrollbar">
        {/* Medical ID Card */}
        <div className="card-medical p-5 mb-6 relative">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-section text-foreground">Medical ID</h2>
            <button className="w-8 h-8 rounded-full bg-card flex items-center justify-center">
              <Pencil className="w-4 h-4 text-primary" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-body text-text-secondary">Blood Type</span>
              <span className="text-body font-medium text-foreground">{user?.bloodGroup || 'O+ Positive'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-text-secondary">Allergies</span>
              <span className="text-body font-medium text-foreground">{user?.allergies || 'Penicillin, Peanuts'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-text-secondary">Conditions</span>
              <span className="text-body font-medium text-foreground">{user?.conditions || 'Type 2 Diabetes'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-text-secondary">Emergency Contact</span>
              <span className="text-body font-medium text-foreground">
                {user?.emergencyContact?.name || 'Priya'} ({user?.emergencyContact?.relationship || 'Wife'})
              </span>
            </div>
          </div>
        </div>

        {/* Settings List - No notifications */}
        <div className="card-elevated overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "w-full h-14 px-4 flex items-center gap-3 text-left hover:bg-muted transition-colors",
                index !== menuItems.length - 1 && "border-b border-border"
              )}
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-body-lg text-foreground">{item.label}</span>
              
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-caption text-primary-foreground font-medium">
                  {item.badge}
                </span>
              )}
              
              {item.isTheme && (
                <div className="flex items-center gap-2">
                  <span className="text-body-sm text-text-secondary capitalize">{theme}</span>
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
              )}
              
              {item.hasArrow && (
                <ChevronRight className="w-5 h-5 text-text-tertiary" />
              )}
            </button>
          ))}
        </div>

        {/* Emergency Button */}
        <button className="w-full mt-6 h-13 px-4 py-3 bg-destructive rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
          <span className="text-body-lg font-semibold text-destructive-foreground">
            Activate Emergency Mode
          </span>
        </button>
        <p className="text-caption text-text-tertiary text-center mt-2">
          This will share your medical ID with emergency contacts
        </p>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-caption text-text-tertiary">MediGuide v1.0.0</p>
          <p className="text-caption text-secondary mt-1">Made with ❤️ for your health</p>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
