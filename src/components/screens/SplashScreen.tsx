import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Shield, Activity, Heart, Sparkles } from 'lucide-react';

export function SplashScreen() {
  const { setCurrentScreen } = useApp();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Slight delay for smoother entrance
    setTimeout(() => setShowContent(true), 100);
    
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="absolute inset-0 bg-gradient-primary flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-16 left-8 w-3 h-3 rounded-full bg-primary-foreground/20 animate-float" />
        <div className="absolute top-32 right-12 w-2 h-2 rounded-full bg-primary-foreground/15 animate-float delay-200" />
        <div className="absolute bottom-40 left-16 w-4 h-4 rounded-full bg-primary-foreground/10 animate-float delay-400" />
        <div className="absolute top-1/4 right-8 w-2 h-2 rounded-full bg-primary-foreground/20 animate-float delay-300" />
        
        {/* Large Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl animate-pulse-gentle" />
        <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-secondary-light/10 blur-3xl animate-pulse-gentle delay-500" />
        
        {/* Medical Cross Pattern */}
        <div className="absolute top-1/3 left-6 opacity-10">
          <Heart className="w-8 h-8 text-primary-foreground animate-bounce-gentle" />
        </div>
        <div className="absolute bottom-1/3 right-10 opacity-10">
          <Sparkles className="w-6 h-6 text-primary-foreground animate-bounce-gentle delay-300" />
        </div>
      </div>

      {/* Logo Container */}
      <div className={`relative transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Glowing Ring */}
        <div className="absolute inset-0 -m-4 rounded-[36px] bg-gradient-to-r from-primary-foreground/20 to-secondary-light/20 blur-xl animate-pulse-gentle" />
        
        {/* Logo Card */}
        <div className="relative w-28 h-28 rounded-[28px] bg-primary-foreground/10 backdrop-blur-xl flex items-center justify-center border border-primary-foreground/30 shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-[20px] bg-gradient-to-br from-primary-foreground/10 to-transparent" />
          
          <div className="relative">
            <Shield className="w-16 h-16 text-primary-foreground drop-shadow-lg" strokeWidth={1.5} />
            <Activity className="w-7 h-7 text-secondary-light absolute -bottom-1 -right-2 drop-shadow-lg" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* App Name with Gradient Effect */}
      <h1 className={`text-4xl font-bold text-primary-foreground mt-6 tracking-tight transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        MediGuide
      </h1>

      {/* Tagline */}
      <p className={`text-secondary-light/90 text-body-lg mt-2 font-medium tracking-wide transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Your Proactive Health Partner
      </p>

      {/* Loading Indicator - DNA Style */}
      <div className={`absolute bottom-20 flex items-center gap-3 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
              style={{
                animation: `bounce-gentle 1s ease-in-out infinite`,
                animationDelay: `${i * 100}ms`,
                opacity: 0.4 + (i * 0.15),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}