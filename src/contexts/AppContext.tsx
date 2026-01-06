import React, { createContext, useContext, useState } from 'react';

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'profile-setup'
  | 'home'
  | 'history'
  | 'scan'
  | 'scanning'
  | 'scan-error'
  | 'report-result'
  | 'family'
  | 'add-family'
  | 'nickname-popup'
  | 'profile';

export type Tab = 'home' | 'history' | 'scan' | 'family' | 'profile';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  allergies: string;
  conditions: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface Report {
  id: string;
  date: string;
  type: string;
  labName: string;
  flagLevel: 'green' | 'yellow' | 'red';
  uploadedToABDM: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  initials: string;
  status: 'good' | 'needs-review' | 'critical' | 'pending';
  connectionStatus: 'connected' | 'pending-sent' | 'pending-received';
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  hasCompletedProfile: boolean;
  setHasCompletedProfile: (value: boolean) => void;
  freeScansLeft: number;
  setFreeScansLeft: (value: number) => void;
  reports: Report[];
  setReports: (reports: Report[]) => void;
  familyMembers: FamilyMember[];
  setFamilyMembers: (members: FamilyMember[]) => void;
  showAuthModal: boolean;
  setShowAuthModal: (value: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  showPremiumModal: boolean;
  setShowPremiumModal: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockReports: Report[] = [
  { id: '1', date: 'Jan 3, 2025', type: 'Lipid Panel', labName: 'CityLab Diagnostics', flagLevel: 'yellow', uploadedToABDM: true },
  { id: '2', date: 'Dec 28, 2024', type: 'Complete Blood Count', labName: 'Apollo Labs', flagLevel: 'green', uploadedToABDM: true },
  { id: '3', date: 'Dec 15, 2024', type: 'HbA1c Test', labName: 'HealthFirst Labs', flagLevel: 'red', uploadedToABDM: false },
  { id: '4', date: 'Nov 30, 2024', type: 'Liver Function Test', labName: 'CityLab Diagnostics', flagLevel: 'green', uploadedToABDM: true },
  { id: '5', date: 'Nov 15, 2024', type: 'Thyroid Panel', labName: 'MedPath Labs', flagLevel: 'yellow', uploadedToABDM: false },
];

const mockFamilyMembers: FamilyMember[] = [
  { id: '1', name: 'Mom', initials: 'M', status: 'good', connectionStatus: 'connected' },
  { id: '2', name: 'Dad', initials: 'D', status: 'needs-review', connectionStatus: 'connected' },
  { id: '3', name: 'Sarah', initials: 'S', status: 'pending', connectionStatus: 'pending-received' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [freeScansLeft, setFreeScansLeft] = useState(3);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        hasCompletedProfile,
        setHasCompletedProfile,
        freeScansLeft,
        setFreeScansLeft,
        reports,
        setReports,
        familyMembers,
        setFamilyMembers,
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
        showPremiumModal,
        setShowPremiumModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
