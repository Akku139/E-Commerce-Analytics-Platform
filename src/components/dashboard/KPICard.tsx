import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorClass: string;
  glowClass: string;
}

export default function KPICard({
  title,
  value,
  change,
  isPositive,
  description,
  icon: Icon,
  colorClass,
  glowClass
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl glass-card glass-card-hover p-6 flex flex-col justify-between"
    >
      {/* Background Radial Glow */}
      <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-10 blur-2xl ${glowClass}`} />

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">{title}</span>
        <div className={`p-2 rounded-lg bg-zinc-900/60 border border-brand-border ${colorClass}`}>
          <Icon size={16} />
        </div>
      </div>

      {/* Value Display */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold tracking-tight text-brand-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          {value}
        </h3>
      </div>

      {/* Trend Info */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border/60">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <div className="flex items-center text-accent-emerald text-xs font-bold bg-accent-emerald/10 px-2 py-0.5 rounded-full border border-accent-emerald/20">
              <ArrowUpRight size={12} className="stroke-[3]" />
              <span>+{change}%</span>
            </div>
          ) : (
            <div className="flex items-center text-accent-rose text-xs font-bold bg-accent-rose/10 px-2 py-0.5 rounded-full border border-accent-rose/20">
              <ArrowDownRight size={12} className="stroke-[3]" />
              <span>{change}%</span>
            </div>
          )}
        </div>
        <span className="text-[10px] text-brand-dim font-medium">{description}</span>
      </div>
    </motion.div>
  );
}
