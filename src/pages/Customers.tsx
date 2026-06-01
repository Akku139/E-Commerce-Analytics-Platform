import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Users, Award, UserCheck, UserMinus } from 'lucide-react';
import CustomerChart from '../components/dashboard/CustomerChart';
import customersData from '../../data/processed/customers.json';

// Simulated cohort retention data (from customer_analysis.sql)
const RETENTION_COHORT_DATA = [
  { month: 'Month 1', retention: 100 },
  { month: 'Month 2', retention: 82.4 },
  { month: 'Month 3', retention: 74.8 },
  { month: 'Month 4', retention: 68.2 },
  { month: 'Month 5', retention: 61.9 },
  { month: 'Month 6', retention: 57.5 },
  { month: 'Month 7', retention: 54.0 },
  { month: 'Month 8', retention: 51.2 },
  { month: 'Month 9', retention: 49.8 },
  { month: 'Month 10', retention: 48.5 }
];

export default function Customers() {
  const vipData = customersData.find(c => c.segment === 'VIP');
  const regularData = customersData.find(c => c.segment === 'Regular');
  const atRiskData = customersData.find(c => c.segment === 'At Risk');

  const totalCustomers = customersData.reduce((sum, item) => sum + item.count, 0);

  const CustomRetentionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border border-brand-border text-xs shadow-2xl backdrop-blur-md">
          <p className="font-semibold text-brand-text mb-1">{payload[0].payload.month}</p>
          <p className="text-zinc-300">
            Retention Rate: <span className="font-medium text-accent-indigo">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top customer summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Total Customer Base</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{totalCustomers.toLocaleString()}</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
            <Users size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Loyal VIP Partners</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{vipData?.count || 0} Buyers</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
            <Award size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">Regular Segment Base</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{regularData?.count || 0} Buyers</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
            <UserCheck size={16} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-dim font-bold uppercase tracking-wider block">At-Risk Segment Base</span>
            <span className="text-lg font-bold text-brand-text mt-1 block">{atRiskData?.count || 0} Churn Risk</span>
          </div>
          <div className="p-2 rounded-lg bg-accent-rose/10 text-accent-rose border border-accent-rose/20">
            <UserMinus size={16} />
          </div>
        </div>
      </div>

      {/* Main Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CustomerChart data={customersData} />
        </div>

        {/* Retention cohort chart */}
        <div className="glass-card rounded-xl p-6 h-[400px] flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">Cohort Retention Curve</h4>
            <span className="text-xs text-brand-muted">Percentage of repeat customer activity month-over-month</span>
          </div>
          <div className="flex-1 min-h-0 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={RETENTION_COHORT_DATA}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(63, 63, 70, 0.1)" vertical={false} />
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
                  tickFormatter={(val) => `${val}%`}
                  dx={-10}
                />
                <Tooltip content={<CustomRetentionTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.15)', strokeWidth: 1 }} />
                <Line 
                  type="monotone" 
                  dataKey="retention" 
                  stroke="#8b5cf6" // Violet
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2, fill: '#09090b', stroke: '#8b5cf6' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* VIP Customer detailed profiles table */}
      <div className="glass-card rounded-xl border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border">
          <h4 className="font-bold text-sm text-brand-text uppercase tracking-wide">High-Value Segment Contribution</h4>
          <span className="text-xs text-brand-muted">Detailed review of consumer segment stats and values</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 text-brand-dim border-b border-brand-border font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Customer Segment</th>
                <th className="py-4 px-6">Buyer Count</th>
                <th className="py-4 px-6">Base Share</th>
                <th className="py-4 px-6 text-right">Revenue Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {customersData.map((cust) => (
                <tr key={cust.segment} className="hover:bg-zinc-900/25 transition-colors">
                  <td className="py-4 px-6 font-semibold text-brand-text">{cust.segment} Profile</td>
                  <td className="py-4 px-6 text-brand-muted">{cust.count.toLocaleString()} accounts</td>
                  <td className="py-4 px-6 text-brand-dim">{cust.percentage}% distribution</td>
                  <td className="py-4 px-6 text-right font-bold text-brand-text">${cust.revenueContribution.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
