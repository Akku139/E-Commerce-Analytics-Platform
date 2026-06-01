import { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { TrendingUp, ShoppingBag } from 'lucide-react';
import type { SaleData } from '../../types';

interface RevenueChartProps {
  data: SaleData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const [metric, setMetric] = useState<'revenue' | 'orders'>('revenue');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-zinc-300">
              <span className="font-medium text-accent-indigo">
                {metric === 'revenue' ? 'Revenue: ' : 'Orders: '}
              </span>
              {metric === 'revenue' 
                ? `$${payload[0].value.toLocaleString()}` 
                : `${payload[0].value.toLocaleString()}`}
            </p>
            <p className="text-[10px] text-brand-dim">
              AOV: ${data.find(d => d.month === label)?.aov.toFixed(2)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getChartColor = () => {
    return metric === 'revenue' ? '#6366f1' : '#10b981'; // Indigo or Emerald
  };

  const getGradientId = () => {
    return metric === 'revenue' ? 'revenueGlow' : 'ordersGlow';
  };

  return (
    <div className="glass-card rounded-xl p-6 h-[400px] flex flex-col justify-between">
      {/* Title and metric switches */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Performance Metrics</h4>
          <span className="text-xs text-brand-muted">Monthly sales volumes and revenue tracking</span>
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-brand-border p-1 rounded-lg">
          <button
            onClick={() => setMetric('revenue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              metric === 'revenue'
                ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20'
                : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <TrendingUp size={14} />
            <span>Revenue</span>
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              metric === 'orders'
                ? 'bg-accent-emerald text-white shadow-lg shadow-accent-emerald/20'
                : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Orders</span>
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="ordersGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.15)" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#71717a" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => metric === 'revenue' ? `$${value / 1000}k` : value}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.15)', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={getChartColor()}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${getGradientId()})`}
              name={metric}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
