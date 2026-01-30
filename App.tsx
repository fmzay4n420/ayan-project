
import React, { useState, useEffect } from 'react';
import { User, WithdrawRequest, AppState } from './types';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import Withdraw from './components/Withdraw';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'dashboard' | 'admin' | 'profile' | 'withdraw'>('login');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('lifeGoodData');
    if (saved) return JSON.parse(saved);
    return {
      users: [],
      withdraws: [],
      currentUser: null,
      isAdmin: false
    };
  });

  useEffect(() => {
    localStorage.setItem('lifeGoodData', JSON.stringify(state));
  }, [state]);

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null, isAdmin: false }));
    setView('login');
  };

  const renderView = () => {
    if (state.isAdmin) return <AdminDashboard state={state} setState={setState} onLogout={handleLogout} />;
    
    if (state.currentUser) {
      switch (view) {
        case 'profile':
          return <Profile user={state.currentUser} setState={setState} onBack={() => setView('dashboard')} />;
        case 'withdraw':
          return <Withdraw state={state} setState={setState} onBack={() => setView('dashboard')} />;
        default:
          return <UserDashboard state={state} setView={setView} onLogout={handleLogout} />;
      }
    }

    switch (view) {
      case 'register':
        return <Register setView={setView} setState={setState} state={state} />;
      case 'admin':
        return <AdminDashboard state={state} setState={setState} onLogout={handleLogout} />;
      default:
        return <Login setView={setView} setState={setState} state={state} />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {renderView()}
    </div>
  );
};

export default App;
