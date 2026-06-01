import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Geography from './pages/Geography';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'sales':
        return <Sales />;
      case 'customers':
        return <Customers />;
      case 'geography':
        return <Geography />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex relative">
      {/* Background neon glows */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vh] radial-glow opacity-60 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vh] radial-glow opacity-30 blur-3xl pointer-events-none z-0" />

      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-64 z-10">
        <Header activeTab={activeTab} />
        
        <main className="flex-grow p-6 md:p-10 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
