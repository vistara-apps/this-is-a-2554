import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppBar from './components/AppBar';
import Dashboard from './components/Dashboard';
import RightsGuides from './components/RightsGuides';
import RecordAlert from './components/RecordAlert';
import RemixGenerator from './components/RemixGenerator';
import StateSelection from './components/StateSelection';
import { UserProvider } from './context/UserContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState({
    userId: null,
    selectedState: null,
    preferredLanguage: 'en',
    trustedContacts: [],
    subscriptionStatus: 'free'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('zaraRightsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (updates) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
    localStorage.setItem('zaraRightsUser', JSON.stringify(newUser));
  };

  const renderView = () => {
    if (!user.selectedState) {
      return <StateSelection onStateSelect={(state) => updateUser({ selectedState: state })} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'guides':
        return <RightsGuides user={user} />;
      case 'record':
        return <RecordAlert user={user} />;
      case 'remix':
        return <RemixGenerator user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <UserProvider value={{ user, updateUser }}>
      <div className="min-h-screen gradient-bg">
        <AppBar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          user={user}
        />
        <main className="pt-16">
          {renderView()}
        </main>
      </div>
    </UserProvider>
  );
}

export default App;