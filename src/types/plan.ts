export interface PlanItem {
  id: number;
  name: string;
  month_price: number | string;
  year_price: number | string;
  created_at?: string;
  updated_at?: string;
}

export interface PlanList {
  planData: PlanItem[];
}
