import { 
  BarChart3, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Globe, 
  Menu, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'overview', name: 'Executive Overview', icon: LayoutDashboard, color: 'text-accent-indigo' },
    { id: 'sales', name: 'Sales Analytics', icon: TrendingUp, color: 'text-accent-emerald' },
    { id: 'customers', name: 'Customer Analytics', icon: Users, color: 'text-accent-amber' },
    { id: 'geography', name: 'Geographic Insights', icon: Globe, color: 'text-accent-cyan' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-brand-card border border-brand-border text-brand-text md:hidden hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-45 w-64 glass-panel flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-brand-border gap-3">
          <div className="p-2 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30">
            <BarChart3 className="text-accent-indigo" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-brand-text tracking-wide bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              InsightCart
            </h1>
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">
              E-Commerce BI
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // Close on mobile
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-zinc-900/80 text-brand-text border border-brand-border'
                    : 'text-brand-muted hover:text-brand-text hover:bg-zinc-900/30'
                }`}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 bg-accent-indigo rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive ? item.color : 'text-zinc-500 group-hover:text-brand-text'
                  }`}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info / Analyst status */}
        <div className="p-6 border-t border-brand-border bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-brand-border flex items-center justify-center text-accent-emerald">
              <FileSpreadsheet size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-text">Active Segment</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                <span className="text-[10px] text-brand-muted uppercase font-medium">Phase 1: Processed JSON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
