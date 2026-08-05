<template>
  <div class="w-full">
    <!-- Welcome Header -->
    <div class="mb-6 flex items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Welcome to {{ appName }}</h2>
      <button 
        @click="showCreateFormModal = true"
        class="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-sm shadow-teal-600/10"
      >
        <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" class="w-5 h-5"/>
        <span>Create Form</span>
      </button>
    </div>
        <!-- Dashboard filter bar -->
    <div class="flex items-center gap-3 flex-wrap mb-6">
      <!-- Filter Dropdown wrapper -->
      <div class="relative flex-shrink-0">
        <!-- Calendar SVG icon positioned absolute inside input -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <path d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
        </svg>
        
        <SelectField v-model="selectedFilter" :options="filteredMenu" />
      </div>

      <!-- Custom Date Inputs (shows only if 'custom' is selected) -->
      <template v-if="selectedFilter === 'custom'">
        <div class="flex items-center gap-2">
          <input
            type="date"
            v-model="startDate"
            class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 h-[38px]"
          />
          <span class="text-slate-400 text-sm">—</span>
          <input
            type="date"
            v-model="endDate"
            class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 h-[38px]"
          />
          <button
            type="button"
            @click="applyCustomFilter"
            class="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer h-[38px] flex items-center justify-center shadow-sm shadow-teal-500/30 hover:shadow-md"
          >
            Apply
          </button>
        </div>
      </template>
    </div>

    <!-- Visitors block container -->
    <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 mb-6">
      <div class="grid grid-cols-1 min-[960px]:grid-cols-3 gap-8 max-[1230px]:gap-4">
        
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
        <div class="flex items-center gap-4 border-l border-r border-slate-200/60 px-8 max-[960px]:border-l-transparent max-[960px]:border-r-transparent max-[960px]:px-0 max-[960px]:border-b max-[960px]:pb-4">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <img v-svg-inline src="@/assets/icons/dashboardpage/reset_date.svg" class="w-6 h-6"/>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Next Reset Date</p>
            <p class="text-2xl font-bold text-slate-800">{{ formattedResetDate }}</p>
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
    <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 mb-6 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div class="mb-4">
        <h3 class="text-base font-bold text-slate-800 tracking-tight">Performance Analytics</h3>
        <p class="text-xs text-slate-400 mt-0.5">Visual representation of views and form submissions over time.</p>
      </div>
      <div class="w-full h-70 relative">
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
import { useToast } from "vue-toastification"; 

const appName = inject("appName");
const showCreateFormModal = ref(false);

// Stats for the Visitors block (no database/plan checks)
const visitorRate = ref(35); // 35% circle progress
const formattedUserVisitors = ref("3,500");
const formattedPlanVisitors = ref("10,000");
const formattedResetDate = ref("Sep 04, 2026");
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

const toast = useToast();

// Filter States
const selectedFilter = ref("last_7_days");
const startDate = ref("");
const endDate = ref("");
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
  if (startDate.value && endDate.value) {
    toast.success(`Filter applied: ${startDate.value} to ${endDate.value}`);
  } else {
    toast.error("Please select both start and end dates");
  }
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