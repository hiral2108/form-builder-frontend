export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  next_reset_date: string;
  visitors: number;
  plan_type: string;
  plan_id: number;
  created_at: string;
  shop_url: string;
  shop_owner_name: string;
  host?: string;
}

export interface EmbededStatusResponse {
    status: number
}