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
  AlertTriangle,
  Sparkles
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

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : 'Kabir Sharma';

  return (
    <div className="absolute inset-0 bg-background overflow-hidden flex flex-col">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      <div className="absolute inset-0 bg-circles-pattern" />
      <div className="absolute -top-32 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />
      
      {/* Medical Cross Pattern */}
      <div className="floating-elements">
        <div className="absolute top-32 right-8 w-6 h-6 opacity-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-primary rounded-full" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-1.5 bg-primary rounded-full" />
        </div>
        <div className="absolute top-48 left-6 w-4 h-4 opacity-5 rotate-45">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-secondary rounded-full" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-1 bg-secondary rounded-full" />
        </div>
      </div>
      
      {/* Header with Profile */}
      <div className="pt-12 px-5 pb-6 flex flex-col items-center relative">
        {/* Profile Photo with Premium Effect */}
        <div className="relative animate-fade-in">
          <div className="absolute inset-0 -m-3 rounded-full bg-gradient-primary opacity-20 blur-xl animate-pulse-gentle" />
          <div className="absolute inset-0 -m-1 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-primary">
            <span className="text-4xl font-bold text-primary-foreground">
              {user?.firstName?.[0] || 'K'}
            </span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full glass-card shadow-md flex items-center justify-center border border-border group">
            <Pencil className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <h1 className="text-subtitle text-foreground mt-4 font-bold animate-fade-in delay-100">
          {displayName}
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-36 custom-scrollbar">
        {/* Medical ID Card - Premium with Holographic Effect */}
        <div className="card-medical p-5 mb-6 relative overflow-hidden animate-fade-in delay-150">
          {/* Holographic Stripe */}
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-primary/10 via-secondary/10 to-premium/10 opacity-50" />
          {/* Fingerprint Texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, transparent 30%, hsl(var(--primary)) 30%, hsl(var(--primary)) 31%, transparent 31%),
                              radial-gradient(circle at 70% 50%, transparent 35%, hsl(var(--primary)) 35%, hsl(var(--primary)) 36%, transparent 36%),
                              radial-gradient(circle at 70% 50%, transparent 40%, hsl(var(--primary)) 40%, hsl(var(--primary)) 41%, transparent 41%)`
          }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-section text-foreground font-semibold flex items-center gap-2">
                Medical ID
                <Sparkles className="w-4 h-4 text-secondary" />
              </h2>
              <button className="w-8 h-8 rounded-full bg-card/80 flex items-center justify-center hover:scale-105 transition-transform">
                <Pencil className="w-4 h-4 text-primary" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Blood Type', value: user?.bloodGroup || 'O+ Positive', icon: '🩸' },
                { label: 'Allergies', value: user?.allergies || 'Penicillin, Peanuts', icon: '⚠️' },
                { label: 'Conditions', value: user?.conditions || 'Type 2 Diabetes', icon: '💊' },
                { label: 'Emergency', value: `${user?.emergencyContact?.name || 'Priya'} (${user?.emergencyContact?.relationship || 'Wife'})`, icon: '📞' },
              ].map((item, i) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-body text-text-secondary flex items-center gap-2">
                    <span className="text-xs">{item.icon}</span>
                    {item.label}
                  </span>
                  <span className="text-body font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Medical Cross Border Pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>

        {/* Settings List */}
        <div className="glass-card overflow-hidden animate-fade-in delay-200">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "w-full h-14 px-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-all duration-200 group",
                index !== menuItems.length - 1 && "border-b border-border/50"
              )}
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="flex-1 text-body-lg text-foreground font-medium">{item.label}</span>
              
              {item.badge && (
                <span className="px-2.5 py-1 rounded-full bg-primary text-caption text-primary-foreground font-semibold">
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
                <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          ))}
        </div>

        {/* Emergency Button */}
        <button className="w-full mt-6 h-14 px-4 bg-destructive rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-[0_8px_24px_hsl(346_85%_68%/0.3)] animate-fade-in delay-300 group">
          <AlertTriangle className="w-5 h-5 text-destructive-foreground group-hover:scale-110 transition-transform" />
          <span className="text-body-lg font-semibold text-destructive-foreground">
            Activate Emergency Mode
          </span>
        </button>
        <p className="text-caption text-text-tertiary text-center mt-2">
          This will share your medical ID with emergency contacts
        </p>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in delay-400">
          <p className="text-caption text-text-tertiary">MediGuide v1.0.0</p>
          <p className="text-caption text-secondary mt-1">Made with ❤️ for your health</p>
        </div>
      </div>

      <TabBar />
    </div>
  );
}