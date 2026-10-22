import { defineStore } from "pinia";
import type { UserProfileResponse } from "@/types/user.ts";

export const useUserStore = defineStore("user", {
  state: (): UserProfileResponse => ({
    id: 0,
    name: "",
    email: "",
    next_reset_date: "",
    visitors: 0,
    plan_type: "",
    plan_id: 0,
    created_at: "",
    shop_url: "",
    shop_owner_name: "",
    host: ""
  }),
});
