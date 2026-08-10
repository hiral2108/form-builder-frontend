<template>
  <div class="w-full">
    <!-- Welcome Header -->
    <div class="mb-6 flex items-center justify-between gap-4 flex-wrap">
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Welcome to {{ appName }}</h2>
      <button 
        @click="showCreateFormModal = true"
        class="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-sm shadow-teal-600/10 max-[380px]:w-full max-[380px]:justify-center"
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
        <SelectField v-model="selectedFilter" :options="filteredMenu" customClass="pl-10 !w-[200px] max-[350px]:!w-full" />
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
          class="submit-filter text-sm py-0.5 px-4 rounded-lg min-h-[38px] text-white bg-teal-600 hover:bg-teal-700 cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm shadow-teal-600/10" 
          @click="applyCustomFilter"
        >
          Apply
        </button>
      </template>
    </div>

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

      <!-- Total Clicks Card (Added between Views and Conversion Rate) -->
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

  </div>
      <!-- Performance Analytics Chart Card -->
    <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 sm:p-6 mb-6 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-x-auto max-[640px]:hidden">
      <div class="mb-4">
        <h3 class="text-base font-bold text-slate-800 tracking-tight">Performance Analytics</h3>
        <p class="text-xs text-slate-400 mt-0.5">Visual representation of views and form submissions over time.</p>
      </div>
      <div class="w-full min-w-[500px] h-56 sm:h-70 relative">
        <LineChart
          :dateList="dateData"
          :viewData="viewData"
          :clickData="clickData"
        />
      </div>
    </div>
  <CreateFormModal :isShowModal="showCreateFormModal" @closeModal="showCreateFormModal = false" />
</template>

<script setup lang="ts">

import { inject, ref, computed } from 'vue';
import CreateFormModal from "@/components/modals/CreateFormModal.vue";
import LineChart from "@/components/global/fields/LineChart.vue";
import SelectField from "@/components/global/fields/SelectField.vue";
import { ElDatePicker } from "element-plus";
import "element-plus/dist/index.css";

const appName = inject("appName");
const showCreateFormModal = ref(false);

const visitorRate = ref(35);
const formattedUserVisitors = ref("3,500");
const formattedPlanVisitors = ref("10,000");
const formattedResetDate = ref("09/09/2026");
const totalFormsCreated = ref(8);
const views = ref(24850);
const clicks = ref(7425);
const conversionRate = computed(() => {
  // Calculates conversion rate: (Total Submissions / Total Views) * 100
  const totalSubmissions = 7425; 
  return ((totalSubmissions / views.value) * 100).toFixed(1) + "%";
});

const dateData = ref(["29, Jul", "30, Jul", "31, Jul", "01, Aug", "02, Aug", "03, Aug", "04, Aug", "05, Aug"]);
const viewData = ref([1, 0, 0, 0, 0, 0, 0, 0]); // Blue starts at 1.0, drops to 0
const clickData = ref([0, 1, 0, 0, 0, 0, 0, 0]); // Pink starts at 0, goes to 1.0 on 30 Jul, then 0

// Filter States
const selectedFilter = ref("last_7_days");
const dateRange = ref<[string, string] | null>(null);
const filteredMenu = {
  today: "Today",
  yesterday: "Yesterday",
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  this_month: "This month",
  last_month: "Last month",
  custom: "Custom",
};
const applyCustomFilter = () => {
  if (!dateRange.value) return;
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