import { useState, useEffect } from 'react';
import { Search, Calendar, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

export default function Header({ activeTab }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getPageDetails = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'Executive Overview',
          desc: 'High-level business intelligence, operational KPIs, and core revenues.',
        };
      case 'sales':
        return {
          title: 'Sales Analytics',
          desc: 'Performance metrics, category breakdowns, and monthly trends.',
        };
      case 'customers':
        return {
          title: 'Customer Analytics',
          desc: 'RFM segmentation, retention analysis, and VIP profiles.',
        };
      case 'geography':
        return {
          title: 'Geographic Insights',
          desc: 'Sales performance mapped by city density and regional distribution.',
        };
      default:
        return { title: 'Dashboard', desc: '' };
    }
  };

  const { title, desc } = getPageDetails();

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-brand-border bg-brand-bg/40 backdrop-blur-md sticky top-0 z-30">
      {/* Title & Description */}
      <div className="hidden sm:block">
        <h2 className="text-xl font-bold text-brand-text tracking-tight">{title}</h2>
        <p className="text-xs text-brand-muted mt-0.5">{desc}</p>
      </div>

      {/* Spacing for mobile toggle */}
      <div className="sm:hidden w-10"></div>

      {/* Right Tools Section */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Bar - SaaS Style */}
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="text"
            placeholder="Search transactions, customer IDs..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-zinc-900/60 border border-brand-border text-xs text-brand-text placeholder-zinc-500 focus:outline-none focus:border-accent-indigo transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-brand-border">
            ⌘K
          </kbd>
        </div>

        {/* Date Display */}
        <div className="flex items-center gap-2 text-xs text-brand-muted bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-brand-border">
          <Calendar size={14} className="text-accent-indigo" />
          <span>{currentTime}</span>
        </div>

        {/* Environment Tag */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-accent-emerald bg-accent-emerald/5 border border-accent-emerald/20 px-3 py-1.5 rounded-lg">
          <ShieldCheck size={14} />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Data Sandbox</span>
        </div>

        {/* Notifications Profile icon */}
        <div className="flex items-center gap-3 border-l border-brand-border pl-4 md:pl-6">
          <button className="relative p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-zinc-900/40 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-rose"></span>
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-indigo to-accent-violet flex items-center justify-center font-bold text-xs text-white border border-brand-border">
            AG
          </div>
        </div>
      </div>
    </header>
  );
}
