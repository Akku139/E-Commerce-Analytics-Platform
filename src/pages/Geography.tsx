import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Globe, MapPin, Navigation, Landmark } from 'lucide-react';
import ordersData from '../../data/processed/orders.json';

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4'];
const BAR_COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

export default function Geography() {
  // Aggregate sales by city from processed orders
  const citySalesMap: { [key: string]: number } = {};
  ordersData.forEach(order => {
    citySalesMap[order.city] = (citySalesMap[order.city] || 0) + order.amount;
  });

  const citySalesData = Object.keys(citySalesMap).map(city => ({
    city: city.charAt(0).toUpperCase() + city.slice(1),
    sales: citySalesMap[city]
  })).sort((a, b) => b.sales - a.sales);

  // Regional sales groupings (simulated from product_analysis.sql)
  const regionalSales = [
    { name: 'West Region', value: 966000, percentage: 38.4 },
    { name: 'North Region', value: 712000, percentage: 28.3 },
    { name: 'South Region', value: 510000, percentage: 20.3 },
    { name: 'East Region', value: 329000, percentage: 13.0 }
  ];


  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{item.name}</p>
          <div className="space-y-1 text-zinc-300">
            <p>Sales: <span className="font-medium text-white">${item.value.toLocaleString()}</span></p>
            <p>Contribution: <span className="font-medium text-accent-indigo">{item.percentage}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{item.city} Hub</p>
          <p className="text-zinc-300">
            Cumulative Revenue: <span className="font-medium text-accent-emerald">${item.sales.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top geographic quick KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Core Regional Market</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">West Region</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
            <Globe size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Leading City Center</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">Mumbai Hub</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
            <Landmark size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Primary Shipping Preference</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">Standard Class</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
            <Navigation size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Active City Hubs</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{citySalesData.length} Centers</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-amber/10 text-accent-amber border border-accent-amber/20">
            <MapPin size={16} />
          </div>
        </div>
      </div>

      {/* Region Split vs Top Cities chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Region split pie chart */}
        <div className="glass-card rounded-xl p-6 h-[400px] flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Regional Revenue Share</h4>
            <span className="text-xs text-brand-muted">Market penetration split by territory</span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-4 min-h-0 mt-4">
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={regionalSales}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {regionalSales.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={PIE_COLORS[index % PIE_COLORS.length]} 
                        stroke="rgba(9, 9, 11, 0.8)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom legends */}
            <div className="w-full grid grid-cols-2 gap-2 text-center text-[10px] mt-2">
              {regionalSales.map((item, index) => (
                <div key={item.name} className="p-1 rounded bg-zinc-900/40 border border-brand-border/40">
                  <span className="font-medium text-brand-muted">{item.name}</span>
                  <span 
                    className="block font-bold mt-0.5 text-xs" 
                    style={{ color: PIE_COLORS[index % PIE_COLORS.length] }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top cities sales bar chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 h-[400px] flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Revenue by City Centers</h4>
            <span className="text-xs text-brand-muted">Top revenue contributing metropolitan nodes</span>
          </div>
          <div className="flex-1 min-h-0 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={citySalesData.slice(0, 5)}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" vertical={false} />
                <XAxis 
                  dataKey="city" 
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
                  tickFormatter={(val) => `$${val}`}
                  dx={-10}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]} maxBarSize={45}>
                  {citySalesData.slice(0, 5).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transaction Density / Sales Heatmap simulated table */}
      <div className="glass-card rounded-xl border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border">
          <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">City Transaction Matrices</h4>
          <span className="text-xs text-brand-muted">Aggregated order values, date spreads, and revenue contribution</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 text-brand-dim border-b border-brand-border font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Metropolitan City</th>
                <th className="py-4 px-6">Cumulative Order Volume</th>
                <th className="py-4 px-6">Revenue Share</th>
                <th className="py-4 px-6 text-right">Total Net Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {citySalesData.map((data) => {
                const totalSalesSum = citySalesData.reduce((s, c) => s + c.sales, 0);
                const share = ((data.sales / totalSalesSum) * 100).toFixed(1);
                // Count orders for this city from raw orders
                const ordersCount = ordersData.filter(o => o.city.toLowerCase() === data.city.toLowerCase()).length;
                return (
                  <tr key={data.city} className="hover:bg-zinc-900/25 transition-colors">
                    <td className="py-4 px-6 font-semibold text-brand-text">{data.city} Hub</td>
                    <td className="py-4 px-6 text-brand-muted">{ordersCount} orders tracked</td>
                    <td className="py-4 px-6 text-brand-dim">{share}% share</td>
                    <td className="py-4 px-6 text-right font-bold text-brand-text">${data.sales.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
