import UserService from "@/services/api/user-services";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export function useShopUser() {
  const userStore = useUserStore();

  const { id, name, email, next_reset_date, visitors, plan_id, created_at } = storeToRefs(userStore);

  async function getCurrentUser(): Promise<void> {
    try {
      const data = await new UserService().getCurrentUser();

      id.value = data.id;
      name.value = data.name;
      email.value = data.email;
      next_reset_date.value = data.next_reset_date;
      visitors.value = data.visitors;
      plan_id.value = data.plan_id;
      created_at.value = data.created_at;
    } catch (err) {
      console.log("getCurrentUser error", err);
    }
  }

  return {
    //state
    id,
    name,
    email,
    next_reset_date,
    visitors,
    plan_id,
    created_at,

    //actions
    getCurrentUser,
  };
}
