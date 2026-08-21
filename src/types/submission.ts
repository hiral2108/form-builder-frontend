export interface LeadField {
  field_name: string;
  value: string | number | boolean;
}

export interface LeadItem {
  id: number;
  widget_id: number;
  widget_title: string;
  widget_unique_id: string;
  ip_address: string;
  is_from_mobile: boolean;
  page_url: string;
  created_at: string;
  updated_at: string;
  fields: LeadField[];
}

export interface PaginatedLeadList {
  current_page: number;
  data: LeadItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface LeadListResponse {
  status: number;
  message: string;
  data: PaginatedLeadList;
}

export interface RemoveLeadResponse {
  status: number;
  message: string;
}

export interface LeadFilterPayload {
  time: string;
  start_date: string;
  end_date: string;
  search?: string;
}
