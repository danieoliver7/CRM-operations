export interface DateRange {
  from: Date;
  to: Date;
}

export interface KpiStats {
  openRate: number;
  ctr: number;
  bounceRate: number;
  conversionRate: number;
  revenue: number;
  deliveryRate: number;
}

export interface ChartDatum {
  name: string;
  value: number;
}
