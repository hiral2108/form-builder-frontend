<template>
  <div class="w-full">
    <!-- Welcome Header -->
    <div class="mb-6 flex items-center justify-between gap-4 flex-wrap">
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Welcome to {{ appName }}</h2>
      <button 
        @click="handleCreateClick"
        class="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-sm shadow-teal-600/10 max-[380px]:w-full max-[380px]:justify-center"
      >
        <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" class="w-5 h-5"/>
        <span>Create Form</span>
      </button>
    </div>
    <!-- Dashboard Filter Bar -->
    <div class="flex items-end gap-3 flex-wrap mb-6 dashboard-filter">
      <!-- Filter Select with Calendar Icon -->
      <div class="relative flex-shrink-0 select-box-container w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <path d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
        </svg>
        <SelectField v-model="selectedFilter" :options="filteredMenu" customClass="pl-10 !w-[200px] max-[350px]:!w-full h-10" />
      </div>

      <template v-if="selectedFilter === 'custom'">
        <div class="flex flex-col gap-1.5 w-auto">
          <div class="calender-input relative inline-grid w-[280px] max-[350px]:w-full filter-date-range-picker">
            <ElDatePicker
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
              :editable="true"
              :clearable="false"
              style="width: 100%"
              popper-class="filter-date-range-popper"
            />
          </div>
        </div>
        <button 
          type="button" 
          class="submit-filter text-sm py-0.5 px-4 rounded-xl min-h-10 text-white bg-teal-600 hover:bg-teal-700 cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm shadow-teal-600/10" 
          @click="applyCustomFilter"
        >
          Apply
        </button>
      </template>
    </div>

        <!-- Template switch: Show Skeleton Loader when loading, otherwise show content -->
    <template v-if="isLoading">
      <!-- Visitors block container Skeleton -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 mb-6 animate-pulse">
        <div class="grid grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-3 gap-6 max-[1230px]:gap-4">
          <!-- Column 1: Visitors This Cycle Skeleton -->
          <div class="flex items-center gap-4 max-[960px]:border-b max-[960px]:border-slate-200/60 max-[960px]:pb-4">
            <div class="w-[50px] h-[50px] rounded-full bg-slate-200 flex-shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-3 bg-slate-200 rounded w-32"></div>
              <div class="h-6 bg-slate-200 rounded w-20"></div>
            </div>
          </div>
          <!-- Column 2: Next Reset Date Skeleton -->
          <div class="flex items-center gap-4 border-l border-r border-slate-200/60 px-8 min-[960px]:max-[1100px]:px-4 min-[960px]:max-[1100px]:gap-3 max-[960px]:border-l-transparent max-[960px]:border-r-transparent max-[960px]:px-0 max-[960px]:border-b max-[960px]:pb-4 max-[600px]:border-b max-[600px]:pb-4 min-[600px]:max-[960px]:border-b min-[600px]:max-[960px]:pb-4">
            <div class="w-12 h-12 bg-slate-200 rounded-xl flex-shrink-0"></div>
            <div class="space-y-2">
              <div class="h-3 bg-slate-200 rounded w-28"></div>
              <div class="h-6 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
          <!-- Column 3: Forms Created Skeleton -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-200 rounded-xl flex-shrink-0"></div>
            <div class="space-y-2">
              <div class="h-3 bg-slate-200 rounded w-28"></div>
              <div class="h-6 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Views / Clicks / Conversion Rate Cards Skeleton -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 animate-pulse flex items-center gap-4">
          <div class="w-12 h-12 bg-slate-200 rounded-xl flex-shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-8 bg-slate-200 rounded w-24"></div>
            <div class="h-3 bg-slate-200 rounded w-16"></div>
          </div>
        </div>
      </div>

      <!-- Performance Analytics Chart Skeleton -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 sm:p-6 mb-6 max-[600px]:hidden animate-pulse">
        <!-- Title -->
        <div class="h-5 bg-slate-200 rounded w-48 mb-5"></div>
        <!-- Legend row -->
        <div class="flex items-center justify-center gap-6 mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-3 bg-blue-100 rounded"></div>
            <div class="h-3 w-16 bg-slate-200 rounded"></div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-3 bg-pink-100 rounded"></div>
            <div class="h-3 w-16 bg-slate-200 rounded"></div>
          </div>
        </div>
        <!-- Chart body -->
        <div class="flex gap-2" style="height: 250px">
          <!-- Y-axis labels -->
          <div class="flex flex-col justify-between items-end pr-2 py-1 flex-shrink-0 w-7">
            <div v-for="j in 7" :key="j" class="h-2.5 bg-slate-200 rounded w-5"></div>
          </div>
          <!-- Grid area -->
          <div class="flex-1 relative">
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div v-for="j in 7" :key="j" class="w-full h-px bg-slate-100"></div>
            </div>
            <div class="absolute inset-0 flex justify-between pointer-events-none">
              <div v-for="j in 8" :key="j" class="h-full w-px bg-slate-100"></div>
            </div>
          </div>
        </div>
        <!-- X-axis date labels -->
        <div class="flex justify-between pl-9 mt-2">
          <div v-for="j in 8" :key="j" class="h-2.5 bg-slate-200 rounded w-10"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- Visitors block container -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 mb-6">
        <div class="grid grid-cols-1 min-[600px]:grid-cols-2 min-[960px]:grid-cols-3 gap-6 max-[1230px]:gap-4">
          
          <!-- Column 1: Visitors This Cycle -->
          <div class="flex items-center gap-4 max-[960px]:border-b max-[960px]:border-slate-200/60 max-[960px]:pb-4">
            <div :style="{'--value': visitorRate + '%'}" :class="['chart x-60', {'disable': visitorRate >= 90 && visitorRate <= 100}]">
              <p>{{ visitorRate }}%</p>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-500 mb-1">Visitors This Cycle</p>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-bold text-slate-800 mb-1">
                  {{ formattedUserVisitors }} 
                  <span class="text-slate-400 font-normal">/</span> 
                  <span class="text-slate-500">{{ formattedPlanVisitors }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Column 2: Next Reset Date -->
          <div class="flex items-center gap-4 border-l border-r border-slate-200/60 px-8 min-[960px]:max-[1100px]:px-4 min-[960px]:max-[1100px]:gap-3 max-[960px]:border-l-transparent max-[960px]:border-r-transparent max-[960px]:px-0 max-[960px]:border-b max-[960px]:pb-4 max-[600px]:border-b max-[600px]:pb-4 min-[600px]:max-[960px]:border-b min-[600px]:max-[960px]:pb-4">
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <img v-svg-inline src="@/assets/icons/dashboardpage/reset_date.svg" class="w-6 h-6"/>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-slate-500 mb-1 whitespace-nowrap">Next Reset Date</p>
              <p class="text-2xl font-bold text-slate-800 whitespace-nowrap min-[960px]:max-[1100px]:text-xl">{{ formattedResetDate }}</p>
            </div>
          </div>

          <!-- Column 3: Forms Created -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <img v-svg-inline src="@/assets/icons/dashboardpage/widgets_created.svg" class="w-6 h-6"/>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 mb-1">Forms Created</p>
              <p class="text-2xl font-bold text-slate-800">{{ totalFormsCreated }} <span class="text-slate-400 font-normal">/</span> <span class="text-slate-500">∞</span></p>
            </div>
          </div>

        </div>
      </div>

      <!-- New Stats Card Grid (Visitors, Views, Conversion Rate) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

        <!-- Total Views Card -->
        <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/dashboardpage/views.svg" class="w-6 h-6"/>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800 tracking-tight">{{ views.toLocaleString() }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Views</p>
          </div>
        </div>

        <!-- Total Clicks Card -->
        <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/dashboardpage/unique_clicks.svg" class="w-6 h-6"/>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800 tracking-tight">{{ clicks.toLocaleString() }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Clicks</p>
          </div>
        </div>

        <!-- Conversion Rate Card -->
        <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-rose-50 text-rose-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/dashboardpage/conversion_rate.svg" class="w-6 h-6"/>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800 tracking-tight">{{ conversionRate }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Conversion Rate</p>
          </div>
        </div>
      </div>

      <!-- Performance Analytics Chart Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 sm:p-6 mb-6 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-x-auto max-[600px]:hidden">
        <div class="mb-4">
          <h3 class="text-base font-bold text-slate-800 tracking-tight">Performance Analytics</h3>
          <p class="text-xs text-slate-400 mt-0.5">Visual representation of views and form submissions over time.</p>
        </div>
        <div class="w-full min-w-[500px] h-70 relative">
          <LineChart
            :dateList="dateData"
            :viewData="viewData"
            :clickData="clickData"
          />
        </div>
      </div>
    </template>
    </div>

    <CreateFormModal :isShowModal="showCreateFormModal" @closeModal="showCreateFormModal = false" />
    <UpdatePlanModal :isShowModal="showUpdatePlanModal" @closeModal="showUpdatePlanModal = false" />
</template>

<script setup lang="ts">

import { inject, ref, computed, onMounted, watch } from 'vue';
import CreateFormModal from "@/components/modals/CreateFormModal.vue";
import LineChart from "@/components/global/fields/LineChart.vue";
import SelectField from "@/components/global/fields/SelectField.vue";
import { ElDatePicker } from "element-plus";
import UpdatePlanModal from "@/components/modals/UpdatePlanModal.vue"; 
import FormService from "@/services/api/form-services"; 
import { useUserStore } from "@/stores/user.ts";

const appName = inject("appName");
const showCreateFormModal = ref(false);
const showUpdatePlanModal = ref(false);
const totalForms = ref(0);
const userStore = useUserStore();
const isLoading = ref(true);

// Top Cards computed properties
const planLimitMap: Record<number, number> = {
  1: 1000,      // Free
  2: 10000,     // Basic
  3: 50000,     // Pro
  4: 99999999,  // Custom/Unlimited
};

const planVisitorsLimit = computed(() => {
  return planLimitMap[userStore.plan_id] || 10000;
});

const visitorRate = computed(() => {
  const current = userStore.visitors || 0;
  const limit = planVisitorsLimit.value;
  if (limit <= 0) return 0;
  
  const pct = (current / limit) * 100;
  // If it's a small decimal (like 0.02%), show 2 decimal places. Otherwise show a clean rounded number.
  return pct > 0 && pct < 1 ? Number(pct.toFixed(2)) : Math.round(pct);
});

const formattedUserVisitors = computed(() => {
  return (userStore.visitors || 0).toLocaleString();
});

const formattedPlanVisitors = computed(() => {
  const limit = planVisitorsLimit.value;
  return limit === 99999999 ? '∞' : limit.toLocaleString();
});

const formattedResetDate = computed(() => {
  if (!userStore.next_reset_date) return "—";
  const dateObj = new Date(userStore.next_reset_date);
  if (!isNaN(dateObj.getTime())) {
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  return userStore.next_reset_date;
});

const totalFormsCreated = ref(0);

// Performance Cards Refs
const views = ref(0);
const clicks = ref(0);
const conversionRate = computed(() => {
  if (views.value === 0) return "0.0%";
  return ((clicks.value / views.value) * 100).toFixed(1) + "%";
});

// Chart Refs
const dateData = ref<string[]>([]);
const viewData = ref<number[]>([]);
const clickData = ref<number[]>([]);

// Filter States
const selectedFilter = ref("last_7_days");
const dateRange = ref<[string, string] | null>(null);
const filteredMenu = {
  today: "Today",
  yesterday: "Yesterday",
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  this_month: "This month",
  this_year: "This year",
  custom: "Custom",
};

const handleCreateClick = () => {
  if (totalForms.value >= 1 && userStore.plan_id === 1) {
    showUpdatePlanModal.value = true;
  } else {
    showCreateFormModal.value = true;
  }
};

// Fetch Stats from Backend
const fetchDashboardStats = async () => {
  try {
    isLoading.value = true; // <-- Turn loader ON
    const payload: any = { filter: selectedFilter.value };
    if (selectedFilter.value === 'custom' && dateRange.value) {
      payload.start_date = dateRange.value[0];
      payload.end_date = dateRange.value[1];
    }

  const response = await new FormService().getDashboardData(payload);
    if (response && response.status === 1) {
      views.value = response.totalViews || 0;
      clicks.value = response.totalClicks || 0;

      dateData.value = response.dateList || [];
      viewData.value = response.viewData || [];
      clickData.value = response.clickData || [];
      
      totalFormsCreated.value = response.total_forms || 0;
      totalForms.value = response.total_forms || 0;
    }
  } catch (error) {
    console.error("Failed to fetch stats for dashboard:", error);
  } finally {
    isLoading.value = false; // <-- Turn loader OFF when done (success or fail)
  }
};

onMounted(async () => {
  try {
    const response = await new FormService().getFormsFilter({ time: "all_time", start_date: "", end_date: "" }, 1);
    totalForms.value = response.totalWidget || 0;
  } catch (error) {
    console.error("Failed to fetch forms for dashboard:", error);
  }
  
  await fetchDashboardStats();
});

// Watch standard filter selector changes
watch(selectedFilter, async (newVal) => {
  if (newVal !== 'custom') {
    await fetchDashboardStats();
  }
});

// Watch date picker changes
const applyCustomFilter = async () => {
  if (!dateRange.value) return;
  await fetchDashboardStats();
};
</script>

<style scoped>
/* Circle ratio progress chart styled as per theme */
.chart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: conic-gradient(#0d9488 var(--value), #e2e8f0 var(--value)); /* Uses Teal theme */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: white;
  border-radius: inherit;
}
.chart p {
  position: relative;
  z-index: 1;
  font-size: 11px;
  color: #64748b;
  font-weight: bold;
}
.chart.disable {
  background-image: conic-gradient(#ef4444 var(--value), #e2e8f0 var(--value));
}
.chart.disable p {
  color: #ef4444;
}
</style>