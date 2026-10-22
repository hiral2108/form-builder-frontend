import { $axios } from "@/plugins/axios";
import type { PlanList } from "@/types/plan";

interface ChangePlanResponse {
  status: number;
  message: string;
  confirmationUrl?: string;
}

interface PlanCallbackResponse {
  status: number;
  message: string;
}

export default class PlanService {
  getPlanList(): Promise<PlanList> {
    return $axios.get(`get_plan_list`);
  }

  changePlan(payload: { plan_id: number; plan_type: string; plan_name: string }): Promise<ChangePlanResponse> {
    return $axios.post(`change_plan`, payload);
  }

  annual(payload: { planSecretKey: string; chargeId: string }): Promise<PlanCallbackResponse> {
    return $axios.post(`plan/annual`, payload);
  }

  month(payload: { planSecretKey: string; chargeId: string }): Promise<PlanCallbackResponse> {
    return $axios.post(`plan/month`, payload);
  }
}
