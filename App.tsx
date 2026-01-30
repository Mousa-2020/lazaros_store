
import React, { useState, useEffect } from 'react';
import { StoreData, SectionType } from './types';
import { INITIAL_DATA } from './constants';
import { fetchFromGitHub, saveToGitHub, isConfigured } from './services/githubDB';
import Layout from './components/Layout';
import DashboardHome from './components/DashboardHome';
import ServiceManager from './components/ServiceManager';
import Settings from './components/Settings';
import Login from './components/Login';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [storeData, setStoreData] = useState<StoreData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (isConfigured()) {
        const data = await fetchFromGitHub();
        if (data) setStoreData(data);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleLogin = (pass: string) => {
    // كلمة مرور افتراضية بسيطة للداشبورد
    if (pass === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('كلمة المرور خاطئة!');
    }
  };

  const handleSaveData = async (newData: StoreData) => {
    setStoreData(newData);
    const success = await saveToGitHub(newData);
    if (success) {
      alert('تم تحديث قاعدة البيانات على GitHub بنجاح!');
    } else {
      alert('تم الحفظ محلياً فقط. يرجى التأكد من إعدادات GitHub لحفظ التغييرات بشكل دائم.');
    }
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
    if (isLoading) return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold">جاري جلب البيانات من GitHub...</p>
      </div>
    );

    switch (activeSection) {
      case 'overview': return <DashboardHome data={storeData} />;
      case 'instagram': return <ServiceManager section={SectionType.INSTAGRAM} data={storeData} onSave={handleSaveData} />;
      case 'facebook': return <ServiceManager section={SectionType.FACEBOOK} data={storeData} onSave={handleSaveData} />;
      case 'tiktok': return <ServiceManager section={SectionType.TIKTOK} data={storeData} onSave={handleSaveData} />;
      case 'chat': return <ServiceManager section={SectionType.CHAT} data={storeData} onSave={handleSaveData} />;
      case 'gemini': return <ServiceManager section={SectionType.GEMINI} data={storeData} onSave={handleSaveData} />;
      case 'settings': return <Settings />;
      default: return <DashboardHome data={storeData} />;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection} 
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
