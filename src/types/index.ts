export interface SaleData {
  month: string;
  revenue: number;
  orders: number;
  aov: number;
}

export interface CustomerSegment {
  segment: string;
  count: number;
  revenueContribution: number;
  percentage: number;
}

export interface ProductData {
  category: string;
  sales: number;
  unitsSold: number;
  averagePrice: number;
}

export interface OrderData {
  orderId: string;
  customerId: string;
  amount: number;
  category: string;
  city: string;
  date: string;
}

export interface KPIMetric {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  type: 'currency' | 'number' | 'percentage';
  description: string;
}
