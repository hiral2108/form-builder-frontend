import { $axios } from "@/plugins/axios";
import type { PlanList } from "@/types/plan";

export default class PlanService {
  getPlanList(): Promise<PlanList> {
    return $axios.get(`get_plan_list`);
  }
}
