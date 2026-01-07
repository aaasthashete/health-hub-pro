import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TabBar } from '@/components/TabBar';
import { Plus, Clock, Check, User, Pencil, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function FamilyScreen() {
  const { familyMembers, setCurrentScreen, setShowNicknameModal, setSelectedFamilyMember } = useApp();
  const [acceptedMembers, setAcceptedMembers] = useState<string[]>([]);

  const handleAccept = (memberId: string, memberName: string) => {
    setAcceptedMembers([...acceptedMembers, memberId]);
  };

  const handleEditNickname = (memberId: string, memberName: string) => {
    setSelectedFamilyMember({ id: memberId, name: memberName });
    setShowNicknameModal(true);
  };

  const connectionStatuses = [
    { type: 'pending-sent', id: 'sent1', name: 'Vihaan', icon: Clock, color: 'text-warning', bgColor: 'bg-warning/10', text: 'Invitation sent' },
    { type: 'connected', id: 'conn1', name: 'Aarohi', icon: Check, color: 'text-success', bgColor: 'bg-success/10', text: 'accepted' },
    { type: 'pending-received', id: 'recv1', name: 'Saanvi', icon: User, color: 'text-primary', bgColor: 'bg-primary/10', text: 'wants to connect' },
  ];

  // Gradient colors for hexagon avatars
  const avatarGradients = [
    'from-primary/80 to-secondary/60',
    'from-success/70 to-primary/50',
    'from-warning/70 to-destructive/40',
    'from-secondary/80 to-primary/60',
    'from-premium/70 to-warning/50',
  ];

  return (
    <div className="absolute inset-0 bg-background-secondary overflow-hidden flex flex-col">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-honeycomb-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-warning/[0.02] to-transparent" />
      
      {/* Floating Connection Waves */}
      <div className="floating-elements">
        <div className="absolute top-32 left-1/4 w-20 h-20 rounded-full border border-primary/10 animate-pulse-gentle opacity-30" />
        <div className="absolute top-48 right-1/3 w-16 h-16 rounded-full border border-secondary/10 animate-pulse-gentle delay-500 opacity-20" />
      </div>
      
      {/* Header */}
      <div className="pt-12 px-5 pb-4 relative z-10">
        <h1 className="text-title text-foreground animate-fade-in">My Health Circle</h1>
        <p className="text-body text-text-secondary mt-1 animate-fade-in delay-100">Care for your loved ones</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-36 custom-scrollbar relative z-10">
        {/* Family Members - Hexagonal Design */}
        <div className="flex gap-5 overflow-x-auto py-6 -mx-5 px-5 scrollbar-hide">
          {familyMembers.map((member, index) => (
            <button
              key={member.id}
              className="flex flex-col items-center shrink-0 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hexagonal Avatar */}
              <div className="relative">
                <div className={cn(
                  "hexagon-avatar bg-gradient-to-br flex items-center justify-center shadow-lg",
                  avatarGradients[index % avatarGradients.length]
                )}>
                  <span className="text-xl text-white font-bold relative z-10">
                    {member.initials}
                  </span>
                </div>
                {/* Pulsing connection ring */}
                <div className="absolute inset-0 hexagon-avatar bg-primary/20 animate-pulse-gentle opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Medical icon badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card shadow-md flex items-center justify-center border-2 border-background">
                  <Heart className="w-3 h-3 text-destructive" />
                </div>
              </div>
              <span className="text-body text-foreground font-medium mt-3">{member.name}</span>
            </button>
          ))}

          {/* Add Button - Hexagonal */}
          <button
            onClick={() => setCurrentScreen('add-family')}
            className="flex flex-col items-center shrink-0 animate-fade-in delay-300 group"
          >
            <div className="hexagon-avatar bg-muted border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <Plus className="w-8 h-8 text-text-tertiary group-hover:text-primary transition-colors" />
            </div>
            <span className="text-body text-text-secondary mt-3 group-hover:text-primary transition-colors">Add</span>
          </button>
        </div>

        {/* Connection Status Section */}
        <div className="mt-6">
          <h2 className="text-section text-foreground mb-4">Connection Status</h2>
          
          {connectionStatuses.length > 0 ? (
            <div className="space-y-3">
              {connectionStatuses.map((status, index) => {
                const isAccepted = acceptedMembers.includes(status.id);
                const showAsAccepted = status.type === 'pending-received' && isAccepted;
                
                return (
                  <div 
                    key={index}
                    className="card-elevated p-4 flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center", 
                      showAsAccepted ? 'bg-success/10' : status.bgColor
                    )}>
                      {showAsAccepted ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <status.icon className={cn("w-5 h-5", status.color)} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-body-lg text-foreground">
                        {status.type === 'pending-sent' && `${status.text} to ${status.name}`}
                        {status.type === 'connected' && `${status.name} ${status.text}`}
                        {status.type === 'pending-received' && !showAsAccepted && `${status.name} ${status.text}`}
                        {showAsAccepted && `${status.name} accepted`}
                      </p>
                    </div>
                    {status.type === 'pending-received' && !showAsAccepted && (
                      <div className="flex gap-2">
                        <Button size="sm" className="h-8 px-3" onClick={() => handleAccept(status.id, status.name)}>Accept</Button>
                        <Button size="sm" variant="ghost" className="h-8 px-3">Decline</Button>
                      </div>
                    )}
                    {(status.type === 'connected' || showAsAccepted) && (
                      <button 
                        onClick={() => handleEditNickname(status.id, status.name)}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-body-lg text-text-tertiary">No pending connections</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Add Button */}
      <div className="absolute bottom-24 left-5 right-5">
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => setCurrentScreen('add-family')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </Button>
      </div>

      <TabBar />
    </div>
  );
}
