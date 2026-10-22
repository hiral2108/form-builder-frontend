import { $axios } from "@/plugins/axios";
import type { verifyToken } from "@/types/auth";
import type { UserProfileResponse, EmbededStatusResponse } from "@/types/user.ts";

export default class UserService {
    getShopToken(url: string): Promise<verifyToken> {
    return $axios.get(url);
    }

    getCurrentUser(): Promise<UserProfileResponse> {
    return $axios.get(`get_user_data`);
    }

    checkEmbededStatus(): Promise<EmbededStatusResponse> {
        return $axios.get(`check_embed_status`);
    }
}
