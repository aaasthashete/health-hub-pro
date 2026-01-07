import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { TabBar } from '@/components/TabBar';
import { Shield, Check, Lightbulb, Crown, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HomeScreen() {
  const { user, freeScansLeft, setShowPremiumModal } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Time-aware color temperature
  const getTimeColor = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'from-warning/10 to-premium/5'; // Warm morning
    if (hour < 17) return 'from-primary/10 to-secondary/5'; // Neutral afternoon
    return 'from-primary/15 to-secondary/10'; // Cool evening
  };

  const healthTips = [
    "Drinking water before meals can aid digestion and help with portion control.",
    "Taking short walks after meals can help regulate blood sugar levels.",
    "Deep breathing for 5 minutes daily can lower stress and blood pressure.",
    "Getting 7-9 hours of sleep is crucial for immune system function.",
  ];

  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <div className="absolute inset-0 bg-background overflow-hidden flex flex-col">
      {/* Background Layers */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getTimeColor()}`} />
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-40 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
      
      {/* Header */}
      <div className="pt-12 px-5 pb-4 relative">
        <div className="flex justify-between items-start">
          <div className="animate-fade-in">
            <h1 className="text-subtitle text-foreground font-bold tracking-tight">
              {getGreeting()}, {user?.firstName || 'User'}!
            </h1>
            <p className="text-body text-text-secondary mt-1">{formatDate()}</p>
          </div>
          
          {/* Premium Indicator */}
          <button 
            onClick={() => setShowPremiumModal(true)}
            className="flex flex-col items-end group animate-fade-in delay-100"
          >
            <div className="relative">
              <Crown className="w-6 h-6 text-premium transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-premium/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-caption text-text-secondary mt-1.5 font-medium">
              {freeScansLeft}/3 free scans
            </span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 custom-scrollbar relative">
        {/* ABDM Connection Card - Glass Morphism */}
        <div className="glass-card p-5 border-2 border-primary/30 relative overflow-hidden animate-fade-in delay-150">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03]" />
          <div className="absolute inset-0 bg-medical-pattern opacity-20" />
          
          {/* Floating Particles */}
          <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-primary/20 animate-float" />
          <div className="absolute bottom-8 right-16 w-1.5 h-1.5 rounded-full bg-secondary/30 animate-float delay-300" />
          <div className="absolute top-12 right-20 w-1 h-1 rounded-full bg-primary/30 animate-float delay-500" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" strokeWidth={1.5} />
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 rounded-xl border-2 border-success/30 animate-pulse-gentle" />
              </div>
              <div>
                <h2 className="text-subtitle text-foreground font-semibold">Your Digital Health Locker</h2>
              </div>
            </div>

            <Button size="lg" className="w-full mb-5 h-14 relative overflow-hidden group">
              <span className="relative z-10 font-semibold">Connect to ABDM</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>

            <div className="space-y-3">
              {[
                'Securely store all health reports',
                'Easy sharing with doctors',
                'Build lifelong health record',
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-success" strokeWidth={2.5} />
                  </div>
                  <span className="text-body text-text-secondary">{benefit}</span>
                </div>
              ))}
            </div>

            <p className="text-caption text-text-tertiary text-center mt-5 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" />
              Protected by ABDM
            </p>
          </div>
        </div>

        {/* Health Tip Card - Warm Accent */}
        <div className="glass-card p-5 mt-6 animate-fade-in delay-300 relative overflow-hidden group">
          {/* Warm Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-warning/[0.05] to-premium/[0.02]" />
          
          <div className="flex gap-4 relative">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warning/20 to-premium/10 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-warning" strokeWidth={1.5} />
              </div>
              <Sparkles className="w-4 h-4 text-premium absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1">
              <h3 className="text-section text-foreground font-semibold">Today's Health Tip</h3>
              <p className="text-body text-text-secondary mt-2 leading-relaxed">{randomTip}</p>
            </div>
          </div>
        </div>

      </div>

      <TabBar />
    </div>
  );
}