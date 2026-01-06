import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AuthModal() {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    authMode, 
    setCurrentScreen,
    setIsLoggedIn 
  } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = () => {
    setShowAuthModal(false);
    setIsLoggedIn(true);
    setCurrentScreen('profile-setup');
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-[320px] bg-card rounded-2xl shadow-elevated p-6 animate-scale-in">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-title text-foreground text-center mb-6">
          {authMode === 'login' ? 'Log In' : 'Create Account'}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {authMode === 'signup' && (
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <Button 
            className="w-full"
            onClick={handleSubmit}
          >
            Continue
          </Button>
          <Button 
            variant="ghost"
            className="w-full"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
