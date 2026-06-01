import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell
} from 'recharts';
import type { CustomerSegment } from '../../types';

interface CustomerChartProps {
  data: CustomerSegment[];
}

const COLORS = ['#8b5cf6', '#6366f1', '#f43f5e']; // Violet, Indigo, Rose

export default function CustomerChart({ data }: CustomerChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{item.segment} Segment</p>
          <div className="space-y-1 text-zinc-300">
            <p>Customers: <span className="font-medium text-white">{item.count.toLocaleString()}</span></p>
            <p>Revenue: <span className="font-medium text-white">${item.revenueContribution.toLocaleString()}</span></p>
            <p>Share of Base: <span className="font-medium text-accent-indigo">{item.percentage}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 h-[400px] flex flex-col justify-between">
      {/* Title */}
      <div>
        <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Segment Profiles</h4>
        <span className="text-xs text-brand-muted">Comparing buyer count vs revenue contribution</span>
      </div>

      {/* Chart container */}
      <div className="flex-1 min-h-0 w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" vertical={false} />
            <XAxis 
              dataKey="segment" 
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
              tickFormatter={(value) => `${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="focus:outline-none"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary insights under chart */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-brand-border/60 text-center">
        {data.map((item, index) => (
          <div key={item.segment}>
            <span className="text-[10px] text-brand-dim font-bold uppercase block">{item.segment} Spend</span>
            <span 
              className="text-xs font-bold mt-1 block"
              style={{ color: COLORS[index % COLORS.length] }}
            >
              ${(item.revenueContribution / 1000).toFixed(0)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
