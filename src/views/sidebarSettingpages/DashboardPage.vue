<template>
  <div class="w-full">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Welcome to {{ appName }}</h2>
    </div>

        <!-- Visitors block container (matching the reference styling) -->
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
                {{ formattedUserVisitors }} <span class="text-slate-400 font-normal">/</span> <span class="text-slate-500">{{ formattedPlanVisitors }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Column 2: Next Reset Date -->
        <div class="flex items-center gap-4 border-l border-r border-slate-200/60 px-8 max-[960px]:border-l-transparent max-[960px]:border-r-transparent max-[960px]:px-0 max-[960px]:border-b max-[960px]:pb-4">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-purple-600">
              <path d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Next Reset Date</p>
            <p class="text-2xl font-bold text-slate-800">{{ formattedResetDate }}</p>
          </div>
        </div>

        <!-- Column 3: Forms Created -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-emerald-600">
              <path d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14l4 4v13a3 3 0 0 1-3 3ZM18 6h-6V4H4v14h16V6h-2ZM7 9h10v2H7V9Zm0 4h7v2H7v-2Z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Forms Created</p>
            <p class="text-2xl font-bold text-slate-800">{{ totalFormsCreated }} <span class="text-slate-400 font-normal">/</span> <span class="text-slate-500">∞</span></p>
          </div>
        </div>

      </div>
    </div>

    <!-- New Stats Card Grid (Visitors, Views, Conversion Rate) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

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

    <!-- Stats Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 flex-shrink-0 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/survey-line.svg" class="w-6 h-6"/>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">8</p>
          <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Forms</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600 flex-shrink-0 text-xl">
          
          <img v-svg-inline src="@/assets/icons/dashboardpage/checkbox-circle-line.svg" class="w-6 h-6"/>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">7,425</p>
          <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Submissions</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-teal-50 text-teal-600 flex-shrink-0 text-xl">
          <img v-svg-inline src="@/assets/icons/settingpage/inbox-archive-line.svg" class="w-6 h-6"/>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">6</p>
          <p class="text-sm font-semibold text-slate-500 tracking-wider">Active Forms</p>
        </div>
      </div>
    </div>

    <!-- Action Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <!-- Create Form Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/add-circle-line.svg" class="w-5 h-5"/>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">Create New Form</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Build a custom form with the drag-and-drop builder. Choose from 20+ field types.</p>
        <button 
          @click="showCreateFormModal = true"
          class="self-start px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
        >
          Create Form
        </button>
      </div>

      <!-- View Submissions Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/chat-check-line.svg" class="w-5 h-5"/>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">View Submissions</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Review and manage all form submissions. Filter, search, and export your data.</p>
        <button 
          @click="router.push('/submissions')"
          class="self-start px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
        >
          View All
        </button>
      </div>

      <!-- View Forms Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/file-chart-line.svg" class="w-5 h-5"/>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">View Forms</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Manage all your forms in one place. Toggle status, edit titles, and organize.</p>
        <button 
          @click="router.push('/forms')"
          class="self-start px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
        >
          View All
        </button>
      </div>
    </div>
  </div>
  <CreateFormModal :isShowModal="showCreateFormModal" @closeModal="showCreateFormModal = false" />
</template>

<script setup lang="ts">

import { inject, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CreateFormModal from "@/components/modals/CreateFormModal.vue";

const appName = inject("appName");
const showCreateFormModal = ref(false);
const router = useRouter();

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