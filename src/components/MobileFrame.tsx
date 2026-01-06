import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="mobile-frame relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
