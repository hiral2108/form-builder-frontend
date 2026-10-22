export interface IAuth {
  access_token: string;
  message: string;
}

export interface verifyToken {
  verify_token: boolean;
  message: string;
}

export interface SessionAuth {
    status: number;
    access_token: string;
    plan_id?: number;
}

export interface ShopifyAuth {
    status: number;
    authorize_url?: string;
}