import { $axios } from "@/plugins/axios";
import type { verifyToken } from "@/types/auth";
import type { UserProfileResponse } from "@/types/user.ts";

export default class UserService {
  getShopToken(url: string): Promise<verifyToken> {
    return $axios.get(url);
  }

  getCurrentUser(): Promise<UserProfileResponse> {
    return $axios.get(`get_user_data`);
  }
}
