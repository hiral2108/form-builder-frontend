import { defineStore } from "pinia";
import type { UserProfileResponse } from "@/types/user.ts";

export const useUserStore = defineStore("user", {
  state: (): UserProfileResponse => ({
    id: 0,
    name: "",
    email: "",
    next_reset_date: "",
    visitors: 0,
    plan_id: 0,
    created_at: "",
  }),
});
