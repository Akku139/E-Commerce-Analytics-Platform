import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  Award, 
  RotateCcw,
  TrendingUp
} from 'lucide-react';

import KPICard from '../components/dashboard/KPICard';
import RevenueChart from '../components/dashboard/RevenueChart';
import CategoryChart from '../components/dashboard/CategoryChart';

// Data imports
import salesData from '../../data/processed/sales.json';
import productsData from '../../data/processed/products.json';
import ordersData from '../../data/processed/orders.json';
import customersData from '../../data/processed/customers.json';

export default function Dashboard() {
  // Aggregate KPIs dynamically from our processed data
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageAOV = salesData.reduce((sum, item) => sum + item.aov, 0) / salesData.length;
  const totalCustomers = customersData.reduce((sum, item) => sum + item.count, 0);

  // VIP segment analytics
  const vipContribution = customersData.find(c => c.segment === 'VIP')?.revenueContribution || 0;
  const clv = vipContribution / (customersData.find(c => c.segment === 'VIP')?.count || 1);

  // SQL placeholder simulation data
  const repeatPurchaseRate = 64.0; // Simulated from customer_analysis.sql query result

  const kpiMetrics = [
    {
      title: 'Gross Revenue',
      value: `$${(totalRevenue / 1000000).toFixed(2)}M`,
      change: 12.4,
      isPositive: true,
      description: 'vs Last Year',
      icon: DollarSign,
      colorClass: 'text-accent-indigo',
      glowClass: 'bg-accent-indigo'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: 8.7,
      isPositive: true,
      description: 'vs Last Year',
      icon: ShoppingBag,
      colorClass: 'text-accent-emerald',
      glowClass: 'bg-accent-emerald'
    },
    {
      title: 'Active Customers',
      value: totalCustomers.toLocaleString(),
      change: 5.2,
      isPositive: true,
      description: 'vs Last Month',
      icon: Users,
      colorClass: 'text-accent-amber',
      glowClass: 'bg-accent-amber'
    },
    {
      title: 'Avg Order Value',
      value: `$${averageAOV.toFixed(2)}`,
      change: 3.4,
      isPositive: true,
      description: 'vs Last Quarter',
      icon: Activity,
      colorClass: 'text-accent-cyan',
      glowClass: 'bg-accent-cyan'
    },
    {
      title: 'Avg VIP Lifetime Value',
      value: `$${clv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      change: 6.8,
      isPositive: true,
      description: 'Customer Tier Index',
      icon: Award,
      colorClass: 'text-accent-violet',
      glowClass: 'bg-accent-violet'
    },
    {
      title: 'Repeat Purchase Rate',
      value: `${repeatPurchaseRate}%`,
      change: 2.1,
      isPositive: true,
      description: 'Cohorts Performance',
      icon: RotateCcw,
      colorClass: 'text-accent-rose',
      glowClass: 'bg-accent-rose'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl glass-card border border-brand-border p-6 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full radial-glow opacity-40 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-accent-indigo text-xs font-bold uppercase tracking-wider block mb-1">
              Active Session Status: Standard Operations
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-brand-text">
              Welcome back, Lead Analyst
            </h3>
            <p className="text-xs text-brand-muted mt-1 max-w-xl">
              InsightCart is reporting a strong Q4 performance. Gross revenue is trending upward, led by high-frequency VIP buyers in metropolitan regions.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-brand-border p-2 rounded-xl text-xs text-brand-text self-start md:self-auto font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>Vite Dev Environment Live</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={salesData} />
        </div>
        <div>
          <CategoryChart data={productsData} />
        </div>
      </div>

      {/* Recent High Value Transactions Table */}
      <div className="glass-card rounded-xl border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Recent Orders Sandbox</h4>
            <span className="text-xs text-brand-muted">Latest transactional logs parsed from processed dataset</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-brand-muted bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-brand-border">
            <TrendingUp size={14} className="text-accent-indigo" />
            <span>Top ticket items first</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 text-brand-dim border-b border-brand-border font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">City Hub</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {ordersData.slice(0, 5).map((order) => (
                <tr key={order.orderId} className="hover:bg-zinc-900/25 transition-colors group">
                  <td className="py-4 px-6 font-semibold text-accent-indigo group-hover:text-accent-indigo/80">{order.orderId}</td>
                  <td className="py-4 px-6 text-brand-text font-medium">{order.customerId}</td>
                  <td className="py-4 px-6 text-brand-muted">{order.category}</td>
                  <td className="py-4 px-6 text-brand-muted">{order.city}</td>
                  <td className="py-4 px-6 text-brand-dim">{order.date}</td>
                  <td className="py-4 px-6 text-right font-bold text-brand-text">${order.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
