<template>
  <div class="flex flex-col items-center justify-center h-[60vh] gap-4">
    <div class="loader-spinner"></div>
    <p class="text-sm text-slate-500">Finalizing your plan...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PlanService from "@/services/api/plan-services";
import { showErrorMessage } from "@/utils";
import { useShopUser } from "@/composable/useShopUser";
import confetti from "canvas-confetti";

const route = useRoute();
const router = useRouter();
const { getCurrentUser } = useShopUser();

const triggerFireworks = () => {
  confetti({ particleCount: 250, spread: 360, zIndex: 111111 });
};

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const planSecretKey = (route.query.plan_secret_key as string) || params.get("plan_secret_key") || "";
  const chargeId = (route.query.charge_id as string) || params.get("charge_id") || "";
  const isAnnual = route.path.includes("/plan/annual");
  const checkoutAttempt = sessionStorage.getItem("checkoutInProgress");
  sessionStorage.removeItem("checkoutInProgress");

  try {
    const service = new PlanService();
    const res = isAnnual
      ? await service.annual({ planSecretKey, chargeId })
      : await service.month({ planSecretKey, chargeId });

    if (res?.status === 1) {
      await getCurrentUser();
      sessionStorage.setItem("planModalPending", checkoutAttempt === "pro" ? "pro" : "upgrade");
      triggerFireworks();
      // showSuccessMessage("Your plan has been updated successfully!");
    } else {
      // Charge was declined or cancelled — show Cancel modal on PlanPage
      sessionStorage.setItem("planModalPending", "cancel");
      showErrorMessage(res?.message || "Plan update was cancelled or declined.");
    }
  } catch (e) {
    sessionStorage.setItem("planModalPending", "cancel");
    showErrorMessage(e);
  } finally {
    router.replace("/plan");
  }
});
</script>

<style scoped>
.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #bbb;
  border-top-color: #0d9488;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
