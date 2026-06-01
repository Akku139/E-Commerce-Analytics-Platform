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
import { ShoppingCart, RefreshCcw, DollarSign, Package } from 'lucide-react';

import productsData from '../../data/processed/products.json';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

export default function Sales() {
  const totalSales = productsData.reduce((sum, item) => sum + item.sales, 0);
  const totalUnits = productsData.reduce((sum, item) => sum + item.unitsSold, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{data.category}</p>
          <div className="space-y-1 text-zinc-300">
            <p>Revenue: <span className="font-medium text-white">${data.sales.toLocaleString()}</span></p>
            <p>Units Sold: <span className="font-medium text-white">{data.unitsSold.toLocaleString()}</span></p>
            <p>Avg Unit Price: <span className="font-medium text-accent-indigo">${data.averagePrice.toFixed(2)}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top mini-metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Total Sales Revenue</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">${totalSales.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
            <DollarSign size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Total Units Dispatched</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{totalUnits.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
            <Package size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Avg Transaction Price</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">$96.45</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-amber/10 text-accent-amber border border-accent-amber/20">
            <ShoppingCart size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Gross Returns Rate</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">1.84%</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-rose/10 text-accent-rose border border-accent-rose/20">
            <RefreshCcw size={16} />
          </div>
        </div>
      </div>

      {/* Main Charts: Revenue vs Units Sold by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category revenue contribution */}
        <div className="glass-card rounded-xl p-6 h-[380px] flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Category Sales Contribution</h4>
            <span className="text-xs text-brand-muted">Comparing sales yields across primary classifications</span>
          </div>
          <div className="flex-1 min-h-0 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" vertical={false} />
                <XAxis 
                  dataKey="category" 
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
                  tickFormatter={(value) => `$${value / 1000}k`}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {productsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Units sold by category */}
        <div className="glass-card rounded-xl p-6 h-[380px] flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Volume Sold by Category</h4>
            <span className="text-xs text-brand-muted">Comparing total shipment units dispatched</span>
          </div>
          <div className="flex-1 min-h-0 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" vertical={false} />
                <XAxis 
                  dataKey="category" 
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
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
                <Bar dataKey="unitsSold" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {productsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid of Product categories list */}
      <div className="glass-card rounded-xl border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border">
          <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Product Catalog Insights</h4>
          <span className="text-xs text-brand-muted">Financial yields mapped with unit metrics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 text-brand-dim border-b border-brand-border font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Category Name</th>
                <th className="py-4 px-6">Sales Volume</th>
                <th className="py-4 px-6">Units Sold</th>
                <th className="py-4 px-6">Average Ticket Value</th>
                <th className="py-4 px-6 text-right">Revenue Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {productsData.map((prod, index) => (
                <tr key={prod.category} className="hover:bg-zinc-900/25 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-semibold text-brand-text">{prod.category}</span>
                  </td>
                  <td className="py-4 px-6 text-brand-muted">{(prod.sales / totalSales * 100).toFixed(1)}% Share</td>
                  <td className="py-4 px-6 text-brand-muted">{prod.unitsSold.toLocaleString()} units</td>
                  <td className="py-4 px-6 text-brand-dim">${prod.averagePrice.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right font-bold text-brand-text">${prod.sales.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
