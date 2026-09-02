import { $axios } from "@/plugins/axios";
import type { IAuth } from "@/types/auth.ts";
import type { SessionAuth, ShopifyAuth } from "@/types/auth.ts";

export default class AuthService {
  register(payload: { name: string; email: string; password: string; src: string }): Promise<IAuth> {
    return $axios.post(`register`, payload);
  }

  login({ email, password, remember_me }: { email: string; password: string; remember_me: number }): Promise<IAuth> {
    return $axios.post(`login`, {
      email,
      password,
      remember_me,
    });
  }

  shopifyAuthLogin(payload: {shop: string}): Promise<ShopifyAuth> {
    return $axios.post(`/shopify/auth`, payload)
  }

  shopifyAddData(payload: {code: string; shop: string; host?: string;}): Promise<SessionAuth> {
    return $axios.post(`/shopify/addUser`, payload)
  }
}
