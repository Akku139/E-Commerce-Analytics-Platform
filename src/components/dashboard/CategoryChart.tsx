import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import type { ProductData } from '../../types';

interface CategoryChartProps {
  data: ProductData[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

export default function CategoryChart({ data }: CategoryChartProps) {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.sales / totalSales) * 100).toFixed(1);
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{item.category}</p>
          <div className="space-y-1 text-zinc-300">
            <p>Sales: <span className="font-medium text-white">${item.sales.toLocaleString()}</span></p>
            <p>Units Sold: <span className="font-medium text-white">{item.unitsSold.toLocaleString()}</span></p>
            <p>Share: <span className="font-medium text-accent-indigo">{percentage}%</span></p>
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
        <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Category Distribution</h4>
        <span className="text-xs text-brand-muted">Product sales split and market share analysis</span>
      </div>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 min-h-0">
        {/* Pie representation */}
        <div className="w-full md:w-1/2 h-[200px] md:h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="sales"
                nameKey="category"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="rgba(9, 9, 11, 0.8)"
                    strokeWidth={2}
                    className="focus:outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend Keys */}
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          {data.map((item, index) => {
            const percentage = ((item.sales / totalSales) * 100).toFixed(1);
            return (
              <div 
                key={item.category} 
                className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-transparent hover:border-brand-border/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="text-xs text-brand-text font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-muted block font-semibold">${(item.sales / 1000).toFixed(0)}k</span>
                  <span className="text-[10px] text-brand-dim font-bold">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
