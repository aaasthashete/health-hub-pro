import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Shield, FileSearch, TrendingUp, Users, Activity, Sparkles } from 'lucide-react';

export function OnboardingScreen() {
  const { setShowAuthModal, setAuthMode } = useApp();

  const features = [
    {
      icon: FileSearch,
      title: 'Lab Report Scanner',
      subtitle: 'AI-powered report analysis',
      gradient: 'from-primary to-primary-light',
      iconBg: 'bg-gradient-to-br from-primary/20 to-primary/10',
      delay: 'stagger-1',
    },
    {
      icon: TrendingUp,
      title: 'Health Tracking',
      subtitle: 'Monitor trends over time',
      gradient: 'from-success to-secondary',
      iconBg: 'bg-gradient-to-br from-success/20 to-success/10',
      delay: 'stagger-2',
    },
    {
      icon: Users,
      title: 'Family Monitoring',
      subtitle: 'Care for your loved ones',
      gradient: 'from-warning to-premium',
      iconBg: 'bg-gradient-to-br from-warning/20 to-warning/10',
      delay: 'stagger-3',
    },
  ];

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="absolute inset-0 bg-background overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-secondary/[0.02]" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-medical-pattern opacity-40" />
      
      {/* Decorative Orbs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-48 -left-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
      
      {/* Header */}
      <div className="pt-16 px-5 flex flex-col items-center animate-fade-in relative">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 -m-4 rounded-3xl bg-primary/20 blur-2xl animate-pulse-gentle" />
          
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-primary">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            <div className="relative">
              <Shield className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
              <Activity className="w-5 h-5 text-secondary-light absolute -bottom-0.5 -right-0.5 drop-shadow" />
            </div>
          </div>
        </div>
        
        <h1 className="text-title text-foreground mt-5 font-bold tracking-tight">MediGuide</h1>
        <p className="text-text-secondary text-body mt-1">Your health, simplified</p>
      </div>

      {/* Feature Cards */}
      <div className="px-5 mt-10 space-y-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`glass-card p-5 flex items-center gap-4 animate-fade-in ${feature.delay} group cursor-pointer`}
            style={{ animationDelay: `${(index + 1) * 150}ms` }}
          >
            {/* Icon Container */}
            <div className={`relative w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              <feature.icon className="w-7 h-7 text-foreground relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-section text-foreground font-semibold">{feature.title}</h3>
              <p className="text-body text-text-secondary mt-0.5">{feature.subtitle}</p>
            </div>
            
            {/* Decorative Sparkle */}
            <Sparkles className="w-4 h-4 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 bg-gradient-to-t from-background via-background/95 to-transparent pt-16">
        <div className="flex gap-4 animate-fade-in delay-500">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 h-13 backdrop-blur-sm bg-card/50"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Button
            size="lg"
            className="flex-1 h-13 relative overflow-hidden group"
            onClick={handleSignup}
          >
            <span className="relative z-10">Sign Up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </div>
        <p className="text-caption text-text-tertiary text-center mt-4 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}