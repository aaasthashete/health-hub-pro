import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NicknameModal() {
  const { currentScreen, setCurrentScreen, setActiveTab } = useApp();
  const [nickname, setNickname] = useState('');

  if (currentScreen !== 'nickname-popup') return null;

  const handleSave = () => {
    setActiveTab('family');
    setCurrentScreen('family');
  };

  const handleCancel = () => {
    setActiveTab('family');
    setCurrentScreen('family');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="relative w-[300px] bg-card rounded-2xl shadow-elevated p-6 animate-scale-in">
        <h2 className="text-section text-foreground text-center mb-4">
          Set a nickname
        </h2>

        <Input
          placeholder="e.g., Mom, Dad, Dr. Smith"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-6"
        />

        <div className="flex gap-3">
          <Button 
            variant="secondary"
            className="flex-1"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
