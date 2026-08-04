<template>
  <div class="w-full">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Welcome to FormFlow</h2>
      <p class="text-slate-500 mt-1 text-sm">Build, manage, and track all your forms from one place.</p>
    </div>

    <!-- Stats Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-teal-50 text-teal-600 flex-shrink-0 text-xl">
          <i class="ri-file-list-3-line"></i>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">8</p>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Forms</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600 flex-shrink-0 text-xl">
          <i class="ri-inbox-archive-line"></i>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">7,425</p>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Submissions</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 flex-shrink-0 text-xl">
          <i class="ri-checkbox-circle-line"></i>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">6</p>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Forms</p>
        </div>
      </div>
    </div>

    <!-- Action Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <!-- Create Form Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 text-xl">
          <i class="ri-add-circle-line"></i>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">Create New Form</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Build a custom form with the drag-and-drop builder. Choose from 20+ field types.</p>
        <button class="self-start px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer">
          Create Form
        </button>
      </div>

      <!-- View Submissions Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 text-xl">
          <i class="ri-inbox-archive-line"></i>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">View Submissions</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Review and manage all form submissions. Filter, search, and export your data.</p>
        <button class="self-start px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer">
          View All
        </button>
      </div>

      <!-- View Forms Card -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300">
        <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center mb-4 text-xl">
          <i class="ri-file-list-3-line"></i>
        </div>
        <h3 class="text-base font-semibold text-slate-800 mb-1.5">View Forms</h3>
        <p class="text-sm text-slate-500 mb-5 flex-1 leading-relaxed">Manage all your forms in one place. Toggle status, edit titles, and organize.</p>
        <button class="self-start px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer">
          View All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page logic
</script>