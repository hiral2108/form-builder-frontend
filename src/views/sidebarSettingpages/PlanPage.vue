<template>
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <header class="text-center pt-6 pb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Flexible Plans for Growing Businesses</h2>
      <p class="text-base text-slate-500 max-w-lg mx-auto mb-8">
        Start for free and upgrade as your audience grows. No hidden fees.
      </p>

      <!-- Monthly / Yearly Toggle Skeleton (While Loading) -->
      <div
        v-if="isPlanLoading"
        class="inline-flex items-center gap-2 bg-white rounded-full border border-slate-200 p-1 shadow-sm animate-pulse">
        <div class="h-9 w-24 bg-slate-200 rounded-full"></div>
        <div class="h-9 w-28 bg-slate-100 rounded-full"></div>
      </div>

      <!-- Actual Monthly / Yearly Toggle (When Loaded) -->
      <div v-else class="inline-flex items-center gap-1 bg-white rounded-full border border-slate-200 p-1 shadow-sm">
        <button
          type="button"
          @click="togglePlanType('monthly')"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer"
          :class="
            selectedPlanType === 'monthly' ? 'bg-teal-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
          ">
          Monthly
        </button>
        <button
          type="button"
          @click="togglePlanType('yearly')"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2"
          :class="
            selectedPlanType === 'yearly' ? 'bg-teal-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'
          ">
          Yearly
          <span
            class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
            Save 20%
          </span>
        </button>
      </div>
    </header>

    <!-- 1. Skeleton Cards (While Loading) -->
    <!-- 1. Skeleton Cards (Exact 1:1 Height & Spacing) -->
    <div v-if="isPlanLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
      <div
        v-for="n in 2"
        :key="'skeleton-' + n"
        class="bg-white rounded-2xl p-6 flex flex-col border border-slate-200 shadow-sm animate-pulse">
        <!-- Top Pill Badge Skeleton -->
        <div class="mb-1">
          <div class="h-6 w-16 bg-slate-200 rounded-full"></div>
        </div>

        <!-- Title Skeleton -->
        <div class="h-7 w-28 bg-slate-200 rounded mt-3"></div>

        <!-- Description Skeleton (Exact min-h-[40px]) -->
        <div class="space-y-1.5 mt-1 min-h-[40px] flex flex-col justify-center">
          <div class="h-3.5 w-4/5 bg-slate-100 rounded"></div>
          <div class="h-3.5 w-3/5 bg-slate-100 rounded"></div>
        </div>

        <!-- Price Skeleton -->
        <div class="mt-4 mb-1">
          <div class="h-10 w-32 bg-slate-200 rounded"></div>
        </div>

        <!-- Subtext Skeleton (Exact min-h-[38px] mb-6) -->
        <div class="min-h-[38px] mb-6 flex flex-col justify-center">
          <div class="h-3 w-44 bg-slate-100 rounded"></div>
        </div>

        <!-- Button Skeleton (Exact 48px height mb-8) -->
        <div class="h-11 w-full bg-slate-200 rounded-xl mb-8"></div>

        <!-- Features Section Skeleton -->
        <div class="space-y-3.5">
          <div class="h-3 w-28 bg-slate-200 rounded mb-3"></div>
          <ul class="space-y-3">
            <li v-for="i in 7" :key="i" class="flex items-center gap-3">
              <div class="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div>
              <div class="h-4 w-44 bg-slate-100 rounded"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Actual Unified Pricing Cards (Free & Pro from API) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="relative bg-white rounded-2xl p-6 flex flex-col transition-all duration-300"
        :class="
          isRecommended(plan.name)
            ? 'ring-2 ring-teal-500 shadow-xl shadow-teal-500/10'
            : 'border border-slate-200 shadow-sm'
        ">
        <!-- Most Popular Floating Badge -->
        <div v-if="isRecommended(plan.name)" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            class="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold shadow-md shadow-teal-500/30 whitespace-nowrap">
            <img v-svg-inline src="@/assets/icons/submission-page/star-fill.svg" alt="star" class="h-3.5 w-3.5" />Most
            Popular
          </span>
        </div>

        <!-- Top Pill Tag -->
        <div class="mb-1">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            {{ plan.name === "Free" ? "Starter" : "Pro" }}
          </span>
        </div>

        <!-- Plan Name & Description -->
        <h3 class="text-xl font-bold text-slate-800 mt-3">{{ plan.name === "Free" ? "Free" : "Professional" }}</h3>
        <p class="text-sm text-slate-500 mt-1 min-h-[40px]" v-html="getPlanLabel(plan.name)"></p>

        <!-- Price Section -->
        <div class="mt-4 mb-1 flex items-baseline gap-1">
          <span class="text-4xl md:text-5xl font-extrabold text-slate-800">${{ getPrice(plan) }}</span>
          <span class="text-sm text-slate-500">/ {{ getDurationLabel(plan) }}</span>
        </div>

        <!-- Subtext & Yearly Savings -->
        <div class="min-h-[38px] mb-4 flex flex-col justify-center">
          <template v-if="selectedPlanType === 'yearly' && plan.name !== 'Free' && plan.avg_price">
            <p class="text-xs text-emerald-600 font-semibold">Save with yearly billing</p>
            <p class="text-xs text-slate-400 mt-0.5">${{ plan.avg_price }} / month</p>
          </template>
          <template v-else>
            <p class="text-xs text-slate-400">
              {{ getPlanSubtext(plan) }}
            </p>
          </template>
        </div>

        <!-- Action Button -->
        <button
          type="button"
          :disabled="isPlanDisabled(plan)"
          @click="handlePlanClick(plan)"
          class="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap mb-5 flex items-center justify-center gap-2"
          :class="getPlanButtonClass(plan)">
          {{ getPlanButtonText(plan) }}
        </button>

        <!-- Features Section -->
        <div class="space-y-3.5">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">WHAT'S INCLUDED</p>

          <ul class="space-y-3">
            <li v-for="(feature, i) in getPlanFeatures(plan.name)" :key="i" class="flex items-center gap-3">
              <!-- Green Checkmark for included / Gray Close for pro-only -->
              <span
                class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                :class="feature.is_pro ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-600'">
                <img
                  v-if="!feature.is_pro"
                  v-svg-inline
                  src="@/assets/icons/trigger-targeting/checkMark.svg"
                  class="w-3.5 h-3.5"
                  alt="Check" />
                <img
                  v-else
                  v-svg-inline
                  src="@/assets/icons/submission-page/close-line.svg"
                  class="w-3 h-3 text-gray-400"
                  alt="Close" />
              </span>

              <span
                class="text-sm leading-relaxed"
                :class="feature.is_pro ? 'text-slate-400' : 'text-slate-700 font-medium'">
                {{ feature.feature }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Frequently Asked Questions Section (Open Cards) -->
    <section class="mt-16 mb-6 max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Frequently Asked Questions</h2>
        <p class="text-sm text-slate-500">Everything you need to know about our plans and features.</p>
      </div>

      <div class="space-y-4">
        <div
          v-for="faq in planFaqs"
          :key="faq.id"
          class="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm flex items-start gap-4">
          <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
            <img v-svg-inline src="@/assets/icons/form-settings/question.svg" class="w-4 h-4" />
          </div>
          <div class="flex-1">
            <h4 class="text-base font-semibold text-slate-800 mb-2">{{ faq.question }}</h4>
            <p class="text-sm text-slate-600 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Footer -->
    <section class="text-center">
      <p class="text-sm text-slate-600">
        Still have questions?
        <a href="javascript:void(0)" @click.prevent="openChatBox" class="text-teal-600 hover:text-teal-700 font-semibold ml-1">
          Contact our support team
        </a>
      </p>
    </section>
  </div>
   <FreePlanModal
     :isShowModal="isShowFreePlanModal"
     @closeModal="isShowFreePlanModal = false"
   />
  <ProPlanModal
    :isShowModal="isShowProPlanModal"
    @closeModal="isShowProPlanModal = false"
  />
  <DowngradePlanModal
    :isShowModal="isShowDowngradeModal"
    @confirmSelection="confirmDowngradePlan"
    @closeModal="isShowDowngradeModal = false"
  />
  <UpgradePlanModal
    :isShowModal="isShowUpgradeModal"
    planName="Pro"
    @closeModal="isShowUpgradeModal = false"
  />
    <CancelPlanModal
      :isShowModal="isShowCancelPlanModal"
      @closeModal="isShowCancelPlanModal = false"
    />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import confetti from "canvas-confetti";
  import PlanService from "@/services/api/plan-services";
  import planFeaturesData from "@/data/planFeatures.json";
  import planFaqs from "@/data/planFaqs.json";
  import FreePlanModal from "@/components/modals/FreePlanModal.vue";
  import ProPlanModal from "@/components/modals/ProPlanModal.vue";
  import DowngradePlanModal from "@/components/modals/DowngradePlanModal.vue";
  import UpgradePlanModal from "@/components/modals/UpgradePlanModal.vue";
  import CancelPlanModal from "@/components/modals/CancelPlanModal.vue";
  import { useUserStore } from "@/stores/user";
  import { showErrorMessage } from "@/utils";

  type PlanKey = "free" | "pro";

  const userStore = useUserStore();
  const isPlanLoading = ref(true);
  const selectedPlanType = ref<"monthly" | "yearly">(
    userStore.plan_type?.toLowerCase() === "yearly" ? "yearly" : "monthly"
  );
  const plans = ref<any[]>([]);

  watch(
    () => userStore.plan_type,
    (newPlanType) => {
      if (newPlanType) {
        selectedPlanType.value = newPlanType.toLowerCase() === "yearly" ? "yearly" : "monthly";
      }
    }
  );

  const isShowFreePlanModal = ref(false);
  const isShowProPlanModal = ref(false);
  const isShowDowngradeModal = ref(false);
  const isShowUpgradeModal = ref(false);
  const isShowCancelPlanModal = ref(false);

  // The plan a confirmation modal is currently open for
  const pendingPlan = ref<any>(null);
  // The plan_id currently being submitted (drives per-button "Processing..." state)
  const submittingPlanId = ref<number | null>(null);

  // 1. Fetch Plans from API
  const fetchPlans = async () => {
    try {
      isPlanLoading.value = true;
      const response = await new PlanService().getPlanList();
      if (response?.planData) {
        plans.value = response.planData;
      }
    } catch (error) {
      console.error("Failed to fetch plan list:", error);
    } finally {
      isPlanLoading.value = false;
    }
  };

  // 2. Helper functions
  const togglePlanType = (type: "monthly" | "yearly") => {
    selectedPlanType.value = type;
  };

  const getPrice = (plan: any) => {
    if (plan.name?.toLowerCase() === "free") return 0;
    return selectedPlanType.value === "monthly" ? plan.month_price : plan.year_price;
  };

  const getDurationLabel = (plan: any) => {
    if (plan.name?.toLowerCase() === "free") return "month";
    return selectedPlanType.value === "monthly" ? "month" : "year";
  };

  const getPlanSubtext = (plan: any) => {
    if (plan.name?.toLowerCase() === "free") return "Forever free. No credit card needed.";
    return selectedPlanType.value === "monthly" ? "Billed monthly. Cancel anytime." : "Billed yearly. Cancel anytime.";
  };

  const isRecommended = (name: string) => name?.toLowerCase() === "pro";

  const getPlanLabel = (name: string) => {
    if (name?.toLowerCase() === "free") {
      return "Ideal for individuals and small businesses<br>just getting started.";
    }
    return "Full power of FormFlow with advanced targeting<br>and unlimited growth.";
  };

  // Resolve a plan's id dynamically from the fetched plan list instead of hardcoding 1/2
  const getPlanIdByName = (name: string): number | undefined => {
    return plans.value.find((p) => p.name?.toLowerCase() === name?.toLowerCase())?.id;
  };

  // "monthly"/"Monthly" and "yearly"/"Yearly" should compare equal regardless of case
  const isSameBillingCycle = (a?: string | null, b?: string | null) => {
    return (a || "").toLowerCase() === (b || "").toLowerCase();
  };

  const isCurrentPlan = (plan: any): boolean => {
    const targetPlanId = getPlanIdByName(plan.name);
    if (targetPlanId !== userStore.plan_id) return false;
    // Free plan has no billing cycle to switch between
    if (plan.name?.toLowerCase() === "free") return true;
    return isSameBillingCycle(selectedPlanType.value, userStore.plan_type);
  };

  const isPlanDisabled = (plan: any) => {
    if (submittingPlanId.value !== null) return true; // Block clicks while a change is in flight
    if (isCurrentPlan(plan)) return true; // Disable if it's the current plan + cycle
    return plan.name?.toLowerCase() === "free" && selectedPlanType.value === "yearly";
  };

  const getPlanButtonText = (plan: any) => {
    const targetPlanId = getPlanIdByName(plan.name);

    if (submittingPlanId.value === targetPlanId) return "Processing...";
    if (isCurrentPlan(plan)) return "Current Plan";
    if (plan.name?.toLowerCase() === "free" && selectedPlanType.value === "yearly") {
      return "Not Available";
    }

    const currentPlanId = userStore.plan_id;
    if (currentPlanId && targetPlanId === currentPlanId) {
      // Same tier, different billing cycle
      return "Change Your Plan";
    }
    if (plan.name?.toLowerCase() === "free") return "Get Started Free";
    if (currentPlanId && targetPlanId !== undefined && targetPlanId < currentPlanId) {
      return `Downgrade to ${plan.name}`;
    }
    return `Upgrade to ${plan.name}`;
  };

  const getPlanButtonClass = (plan: any) => {
    if (isCurrentPlan(plan)) {
      return "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-75"; // Disabled styling for current plan
    }
    if (plan.name?.toLowerCase() === "free" && selectedPlanType.value === "yearly") {
      return "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-70";
    }
    if (plan.name?.toLowerCase() === "free") {
      return "border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer";
    }
    return "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 hover:shadow-lg cursor-pointer";
  };

  const getPlanFeatures = (name: string) => {
    const key = (name?.toLowerCase() || "free") as PlanKey;
    return (planFeaturesData.PlanFeature as any)?.[key] || [];
  };

  const triggerFireworks = () => {
    confetti({ particleCount: 250, spread: 360, zIndex: 111111 });
  };

  // Selecting a plan applies it immediately — no "are you sure?" gate.
  // Modals (except downgrade) are shown afterward as a success/welcome message.
  const handlePlanClick = (plan: any) => {
    if (isPlanDisabled(plan)) return;

    pendingPlan.value = plan;
    const targetPlanId = getPlanIdByName(plan.name);
    const currentPlanId = userStore.plan_id;
    const isFirstPlan = currentPlanId === 0;

    // When downgrading from Pro/paid plan (plan_id > 1) to Free (targetPlanId === 1), show confirmation modal
    if (currentPlanId > 1 && targetPlanId === 1) {
      isShowDowngradeModal.value = true;
      return;
    }

    if (targetPlanId === 1) {
      addFreePlan(isFirstPlan);
      return;
    }

    // Paid tier (Pro): kicks off Shopify checkout immediately.
    // The modal is shown after a successful return from checkout.
    submitPlanCheckout(plan, isFirstPlan);
  };

  const confirmDowngradePlan = () => {
    addFreePlan(false);
  };

  // Applies immediately (no Shopify checkout redirect needed for the free tier)
  const addFreePlan = async (showModalAfter: boolean) => {
    const plan = pendingPlan.value;
    if (!plan) return;

    try {
      submittingPlanId.value = 1;
      const res = await new PlanService().changePlan({
        plan_id: 1,
        plan_type: selectedPlanType.value,
        plan_name: plan.name,
      });

      if (res?.status !== 1) {
        showErrorMessage(res?.message || "Unable to switch to the Free plan.");
        return;
      }

      await fetchPlans();
      userStore.plan_id = 1;
      userStore.plan_type = selectedPlanType.value === "yearly" ? "Yearly" : "Monthly";
      // triggerFireworks();
      // showSuccessMessage("You're now on the Free plan!");
      if (showModalAfter) {
        isShowFreePlanModal.value = true;
        triggerFireworks();
      }
    } catch (e) {
      showErrorMessage(e);
    } finally {
      submittingPlanId.value = null;
      pendingPlan.value = null;
    }
  };

  // Kicks off a Shopify recurring charge and redirects to the confirmation page.
  // Completion (activation) happens on return, via /plan/annual or /plan/month —
  // isFirstPlan is stashed in sessionStorage so PlanPage knows which modal to
  // show once it lands back here.
  const submitPlanCheckout = async (plan: any, isFirstPlan: boolean) => {
    const targetPlanId = getPlanIdByName(plan.name);
    if (!targetPlanId) return;

    try {
      submittingPlanId.value = targetPlanId;

      const res = await new PlanService().changePlan({
        plan_id: targetPlanId,
        plan_type: selectedPlanType.value,
        plan_name: plan.name,
      });

      if (res?.confirmationUrl) {
        sessionStorage.setItem("checkoutInProgress", isFirstPlan ? "pro" : "upgrade");
        sessionStorage.removeItem("planModalPending");
        const redirectTo = res.confirmationUrl;
        window.top ? (window.top.location.href = redirectTo) : (window.location.href = redirectTo);
      } else {
        showErrorMessage(res?.message || "Unable to start checkout for this plan.");
        submittingPlanId.value = null;
      }
    } catch (e) {
      showErrorMessage(e);
      submittingPlanId.value = null;
    } finally {
      pendingPlan.value = null;
    }
  };

  const openChatBox = () => {
    if (window.$crisp) {
      window.$crisp.push(["set", "message:text", [""]]);
      window.$crisp.push(["do", "chat:open"]);
    }
  };

  onMounted(() => {
    fetchPlans();

    // If user hit browser back arrow from Shopify charge screen without completing
    const inProgress = sessionStorage.getItem("checkoutInProgress");
    if (inProgress) {
      sessionStorage.removeItem("checkoutInProgress");
      sessionStorage.removeItem("planModalPending");
      isShowCancelPlanModal.value = true;
      return;
    }

    // Landed back here after a successful or cancelled Shopify checkout
    const pendingModal = sessionStorage.getItem("planModalPending");
    if (pendingModal === "pro") {
      isShowProPlanModal.value = true;
      // triggerFireworks();
    } else if (pendingModal === "upgrade") {
      isShowUpgradeModal.value = true;
      // triggerFireworks();
    } else if (pendingModal === "cancel") {
      isShowCancelPlanModal.value = true;
    }
    if (pendingModal) {
      sessionStorage.removeItem("planModalPending");
    }
  });
</script>
