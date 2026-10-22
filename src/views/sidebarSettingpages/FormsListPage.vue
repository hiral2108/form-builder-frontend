<template>
  <div class="w-full">

    <InstallationNotice :host="userStore.host" :appName="appName" :extensionId="extensionId" />

    <!-- Forms List Filter Bar & Stats Grid (Only visible when forms exist or loading) -->
    <template v-if="isLoading || formsList.length > 0">
      <div class="flex items-center justify-between gap-3 flex-wrap mb-6">
        <div class="flex items-center gap-3 flex-wrap">
          <div class="relative flex-shrink-0 select-box-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <path
                d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
            </svg>
            <SelectField v-model="selectedFilter" :options="filteredMenu" customClass="pl-10 !w-[200px] h-10" />
          </div>

          <template v-if="selectedFilter === 'custom'">
            <div class="flex flex-col gap-1.5">
              <div class="calender-input relative inline-grid w-[280px] filter-date-range-picker">
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
                  popper-class="filter-date-range-popper" />
              </div>
            </div>
            <button
              type="button"
              class="submit-filter text-sm py-0.5 px-4 rounded-xl min-h-10 text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm shadow-teal-600/10 animate-none"
              @click="applyCustomFilter">
              Apply
            </button>
          </template>
        </div>

        <button
          @click="handleCreateClick"
          class="px-4 py-2 min-h-10 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-sm shadow-teal-600/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
          <span>Create Form</span>
        </button>
      </div>

      <!-- Stats Card Grid (Counter values skeletonized when loading) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div
          class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/dashboardpage/survey-line.svg" class="w-6 h-6" />
          </div>
          <div>
            <!-- Pulse skeleton for database totalForms value -->
            <div
              v-if="isLoading || isMetricLoading"
              class="h-6 w-15 bg-slate-200 rounded animate-pulse mt-0.5 mb-1.5"></div>
            <p v-else class="text-2xl font-bold text-slate-800 tracking-tight">{{ totalForms }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Forms</p>
          </div>
        </div>

        <div
          class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/dashboardpage/checkbox-circle-line.svg" class="w-6 h-6" />
          </div>
          <div>
            <!-- Pulse skeleton for database inactiveForms value -->
            <div
              v-if="isLoading || isMetricLoading"
              class="h-6 w-15 bg-slate-200 rounded animate-pulse mt-0.5 mb-1.5"></div>
            <p v-else class="text-2xl font-bold text-slate-800 tracking-tight">{{ inactiveForms }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Inactive Forms</p>
          </div>
        </div>

        <div
          class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center bg-teal-50 text-teal-600 flex-shrink-0 text-xl">
            <img v-svg-inline src="@/assets/icons/settingpage/inbox-archive-line.svg" class="w-6 h-6" />
          </div>
          <div>
            <!-- Pulse skeleton for database activeForms value -->
            <div
              v-if="isLoading || isMetricLoading"
              class="h-6 w-15 bg-slate-200 rounded animate-pulse mt-0.5 mb-1.5"></div>
            <p v-else class="text-2xl font-bold text-slate-800 tracking-tight">{{ activeForms }}</p>
            <p class="text-sm font-semibold text-slate-500 tracking-wider">Active Forms</p>
          </div>
        </div>
      </div>
    </template>

    <div
      v-if="!isLoading && formsList.length === 0"
      class="flex flex-col items-center justify-center relative select-none pt-10">
      <!-- Animated Form Visualizer Graphics Area -->
      <div class="relative w-full max-w-md mx-auto h-64 md:h-80 mb-10">
        <!-- Central glowing teal mesh -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-teal-100/50 blur-3xl"></div>

        <!-- Dot Grid Pattern -->
        <div class="absolute inset-0 bg-dot-grid opacity-40"></div>

        <!-- Central Form Preview Card -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 md:w-48 bg-white rounded-xl shadow-md border border-slate-200/70 p-4 -rotate-1 z-10">
          <div class="flex items-center gap-1.5 mb-3.5">
            <div class="w-2 h-2 rounded-full bg-red-400/70"></div>
            <div class="w-2 h-2 rounded-full bg-amber-400/70"></div>
            <div class="w-2 h-2 rounded-full bg-emerald-400/70"></div>
          </div>
          <div class="h-1.5 w-14 bg-slate-300 rounded-full mb-3"></div>
          <div class="space-y-2">
            <div class="h-4 w-full bg-slate-100 rounded border border-slate-200/50"></div>
            <div class="h-4 w-full bg-slate-100 rounded border border-slate-200/50"></div>
            <div class="h-12 w-full bg-slate-100 rounded border border-slate-200/50"></div>
          </div>
          <div class="h-5 w-14 bg-teal-600/70 rounded-md mt-3 ml-auto"></div>
        </div>

        <!-- Floating Element 1 (Input Card) -->
        <div class="absolute top-4 left-1 md:left-3 animate-float z-20" style="animation-delay: 0s">
          <div class="w-20 md:w-24 bg-white rounded-lg shadow-sm border border-slate-200/70 p-2.5 -rotate-6">
            <div class="flex items-center gap-1.5 mb-1">
              <div class="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
              <div class="h-1 w-8 bg-slate-300 rounded-full"></div>
            </div>
            <div class="h-3 w-full bg-slate-100 rounded border border-slate-200/50"></div>
            <div class="h-0.5 w-1 bg-teal-600 mt-1 ml-0.5 animate-pulse"></div>
          </div>
        </div>

        <!-- Floating Element 2 (Check Card) -->
        <div class="absolute top-6 right-1 md:right-3 animate-float-reverse z-20" style="animation-delay: 0.4s">
          <div class="w-20 md:w-24 bg-white rounded-lg shadow-sm border border-slate-200/70 p-2.5 rotate-3">
            <div class="flex items-center gap-1.5 mb-1">
              <div class="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
              <div class="h-1 w-10 bg-slate-300 rounded-full"></div>
            </div>
            <div class="h-3 w-full bg-slate-100 rounded border border-slate-200/50 flex items-center justify-end pr-1">
              <div class="w-2 h-1 border-l-2 border-b-2 border-slate-400 rotate-[-45deg] translate-y-[-1px]"></div>
            </div>
          </div>
        </div>

        <!-- Floating Element 3 (Checkbox Option) -->
        <div class="absolute bottom-12 left-3 md:left-5 animate-float z-20" style="animation-delay: 0.8s">
          <div class="w-18 md:w-20 bg-white rounded-lg shadow-sm border border-slate-200/70 p-2 rotate-2">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded border-2 border-teal-500 bg-teal-50 flex items-center justify-center">
                <div class="w-2 h-1 border-l-2 border-b-2 border-teal-600 rotate-[-45deg] translate-y-[-0.5px]"></div>
              </div>
              <div class="h-1 w-8 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Floating Element 4 (Toggle Switch Card) -->
        <div class="absolute bottom-8 right-2 md:right-4 animate-float-reverse z-20" style="animation-delay: 0.6s">
          <div class="w-24 md:w-26 bg-white rounded-lg shadow-sm border border-slate-200/70 p-2.5 -rotate-2">
            <div class="flex items-center justify-between">
              <div class="h-1 w-10 bg-slate-300 rounded-full"></div>
              <div class="relative inline-flex h-4 w-8 items-center rounded-full bg-teal-500">
                <span class="absolute right-0.5 h-3 w-3 rounded-full bg-white shadow-sm"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Headline & Description -->
      <h2
        class="text-3xl md:text-4xl font-bold text-slate-800 mb-3 text-center animate-fade-in-up"
        style="animation-delay: 0.1s">
        Let's build your first form
      </h2>
      <p class="text-base text-slate-500 mb-10 text-center max-w-md animate-fade-in-up" style="animation-delay: 0.2s">
        Create beautiful, conversion-optimized forms in minutes — no code required.
      </p>

      <!-- Features Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl mb-10 animate-fade-in-up"
        style="animation-delay: 0.3s">
        <!-- Card 1 -->
        <div
          class="bg-white rounded-xl border border-slate-200/70 p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default group">
          <div
            class="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300 text-teal-700">
            <img v-svg-inline src="@/assets/icons/form-list/layout-4-line.svg" class="w-6 h-6" />
          </div>
          <h4 class="text-sm font-semibold text-slate-800 mb-1">Custom Fields</h4>
          <p class="text-xs text-slate-500 leading-relaxed">
            20+ field types from text inputs to file uploads and signature capture.
          </p>
        </div>
        <!-- Card 2 -->
        <div
          class="bg-white rounded-xl border border-slate-200/70 p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default group">
          <div
            class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300 text-emerald-600">
            <img v-svg-inline src="@/assets/icons/form-list/bar-chart-2-line.svg" class="w-6 h-6" />
          </div>
          <h4 class="text-sm font-semibold text-slate-800 mb-1">Analytics Tracking</h4>
          <p class="text-xs text-slate-500 leading-relaxed">
            Track views, submissions, and conversion rates with real-time dashboards.
          </p>
        </div>
        <!-- Card 3 -->
        <div
          class="bg-white rounded-xl border border-slate-200/70 p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default group">
          <div
            class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300 text-amber-600">
            <img v-svg-inline src="@/assets/icons/form-list/paint-brush-line.svg" class="w-6 h-6" />
          </div>
          <h4 class="text-sm font-semibold text-slate-800 mb-1">Style Customization</h4>
          <p class="text-xs text-slate-500 leading-relaxed">
            Full control over colors, fonts, spacing, and layout to match your brand.
          </p>
        </div>
      </div>

      <!-- Buttons Container (With Create Trigger) -->
      <div class="flex flex-col items-center gap-3 animate-fade-in-up" style="animation-delay: 0.4s">
        <button
          @click="handleCreateClick"
          class="group relative px-7 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer hover:scale-[1.03] shadow-sm shadow-teal-600/10 animate-pulse-glow">
          <img v-svg-inline src="@/assets/icons/dashboardpage/add-line.svg" class="w-5 h-5" />
          Create Your First Form
        </button>
      </div>
    </div>

    <!-- 2. TABLE STATE (Shows if loading or if forms exist) -->
    <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[8%]">
                Status
              </th>
              <th class="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[28%]">
                Title
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
                Submissions
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
                View
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
                Click
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]">
                Click Rate
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[11%]">
                Created
              </th>
              <th class="text-center px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[13%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <!-- Loading Row Skeleton Templates -->
            <template v-if="isLoading">
              <tr v-for="i in 5" :key="i" class="animate-pulse">
                <td class="px-5 py-4 w-[8%]">
                  <div class="h-6 w-10 bg-slate-200 rounded-full"></div>
                </td>
                <td class="px-5 py-4 w-[28%]">
                  <div class="h-4 w-40 bg-slate-200 rounded"></div>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="h-4 w-12 bg-slate-200 rounded mx-auto"></div>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="h-4 w-12 bg-slate-200 rounded mx-auto"></div>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="h-4 w-12 bg-slate-200 rounded mx-auto"></div>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="h-4 w-16 bg-slate-200 rounded mx-auto"></div>
                </td>
                <td class="px-5 py-4 text-center">
                  <div class="h-4 w-24 bg-slate-200 rounded mx-auto"></div>
                </td>
                <td class="px-5 py-4">
                  <div class="flex gap-2.5 justify-center">
                    <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
                    <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
                    <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
                  </div>
                </td>
              </tr>
            </template>

            <!-- Real Loaded Data Table Rows -->
            <template v-else>
              <tr v-for="form in formsList" :key="form.id" class="hover:bg-slate-50/50 transition-colors group">
                <td class="px-5 py-3.5 w-[8%]">
                  <div class="flex items-center">
                    <CheckboxToggle
                      :modelValue="form.status"
                      trueValue="active"
                      falseValue="draft"
                      @update:modelValue="handleStatusChange(form, String($event))" />
                  </div>
                </td>

                <td class="px-5 py-3.5 w-[28%]">
                  <div class="flex items-center gap-2">
                    <button
                      class="text-sm font-medium text-slate-800 hover:text-teal-700 transition-colors cursor-pointer text-left">
                      {{ form.title }}
                    </button>

                    <div class="relative group/tooltip">
                      <button
                        @click="openRenameModal(form)"
                        class="text-slate-400 hover:text-slate-600 transition-opacity cursor-pointer text-sm flex items-center">
                        <img v-svg-inline src="@/assets/icons/form-list/rename.svg" class="w-5 h-5" />
                      </button>
                      <span
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                        Rename
                        <span
                          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                      </span>
                    </div>
                  </div>
                </td>

                <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                  {{ (form.submissions || 0).toLocaleString() }}
                </td>
                <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                  {{ (form.views || 0).toLocaleString() }}
                </td>
                <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                  {{ (form.clicks || 0).toLocaleString() }}
                </td>

                <td class="px-5 py-3.5 text-sm font-medium text-slate-600 text-center">
                  {{ form.clickRate }}
                </td>

                <td class="px-5 py-3.5 text-sm text-slate-500 text-center">
                  {{ form.created }}
                </td>

                <td class="px-5 py-3.5">
                  <div class="flex items-center justify-center gap-2.5">
                    <div class="relative group/tooltip">
                      <router-link
                        :to="{ name: 'FormSettingsPage', params: { uniqueId: form.id } }"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer text-lg">
                        <img
                          v-svg-inline
                          src="@/assets/icons/form-list/edit.svg"
                          class="w-5 h-5 transition-transform hover:scale-110" />
                      </router-link>
                      <span
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                        Edit
                        <span
                          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                      </span>
                    </div>

                    <div class="relative group/tooltip">
                      <button
                        @click="openCloneModal(form)"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer text-lg">
                        <img v-svg-inline src="@/assets/icons/form-list/clone.svg" class="w-5 h-5" />
                      </button>
                      <span
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                        Clone
                        <span
                          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                      </span>
                    </div>

                    <div class="relative group/tooltip">
                      <button
                        @click="openDeleteModal(form)"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer text-lg">
                        <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-5 h-5" />
                      </button>
                      <span
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                        Delete
                        <span
                          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPage > 1 && !isLoading"
        class="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            Previous
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPage"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
          <div>
            <nav class="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
              <!-- Previous Page -->
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-[38px] w-9 justify-center">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <!-- Dynamic Pages -->
              <button
                v-for="page in totalPage"
                :key="page"
                @click="changePage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-teal-50 border-teal-500 text-teal-600 font-semibold'
                    : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer h-[38px]',
                ]">
                {{ page }}
              </button>
              <!-- Next Page -->
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPage"
                class="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-[38px] w-9 justify-center">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RenameFormModal
    :isShowModal="showRenameModal"
    :formId="selectedForm?.id"
    :formTitle="selectedForm?.title"
    @closeModal="showRenameModal = false"
    @confirmRename="handleRename" />
  <CloneFormModal
    :isShowModal="showCloneModal"
    :formId="selectedForm?.id"
    :formTitle="selectedForm?.title"
    @closeModal="showCloneModal = false"
    @confirmClone="handleClone" />
  <DeleteFormModal
    :isShowModal="showDeleteModal"
    :formId="selectedForm?.id"
    @closeModal="showDeleteModal = false"
    @confirmDelete="handleDelete" />
  <CreateFormModal
    :isShowModal="showCreateFormModal"
    @closeModal="showCreateFormModal = false"
    @confirmCreate="handleCreateForm" />
  <UpdatePlanModal :isShowModal="showUpdatePlanModal" @closeModal="showUpdatePlanModal = false" />
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, inject } from "vue";
  import FormService from "@/services/api/form-services";
  import SelectField from "@/components/global/fields/SelectField.vue";
  import CheckboxToggle from "@/components/global/fields/CheckboxToggle.vue";
  import { ElDatePicker } from "element-plus";
  import RenameFormModal from "@/components/modals/RenameFormModal.vue";
  import CloneFormModal from "@/components/modals/CloneFormModal.vue";
  import DeleteFormModal from "@/components/modals/DeleteFormModal.vue";
  import CreateFormModal from "@/components/modals/CreateFormModal.vue";
  import UpdatePlanModal from "@/components/modals/UpdatePlanModal.vue";
  import { useUserStore } from "@/stores/user.ts";
  import { showErrorMessage } from "@/utils";
  import InstallationNotice from "@/components/global/InstallationNotice.vue";

  // Modal triggers and tracking state
  const showRenameModal = ref(false);
  const showCloneModal = ref(false);
  const showDeleteModal = ref(false);
  const showCreateFormModal = ref(false);
  const showUpdatePlanModal = ref(false);
  const selectedForm = ref<any>(null);

  const userStore = useUserStore();
  const extensionId = inject<string>("extensionId", "");
  const appName = inject<string>("appName", "");

  // Filter States
  const selectedFilter = ref("last_7_days");
  const dateRange = ref<[string, string] | null>(null);
  const startDate = ref<string>("");
  const endDate = ref<string>("");
  const currentPage = ref(1);
  const totalPage = ref(1);

  const filteredMenu = {
    today: "Today",
    yesterday: "Yesterday",
    last_7_days: "Last 7 days",
    last_30_days: "Last 30 days",
    this_month: "This month",
    this_year: "This year",
    custom: "Custom",
  };

  const formsList = ref<any[]>([]);
  const isLoading = ref(true);
  const isMetricLoading = ref(false);
  const totalForms = ref(0);
  const activeForms = ref(0);
  const inactiveForms = ref(0);

  // Triggers either Creation modal or Upgrade Plan modal
  const handleCreateClick = () => {
    if (totalForms.value >= 1 && userStore.plan_id === 1) {
      showUpdatePlanModal.value = true;
    } else {
      showCreateFormModal.value = true;
    }
  };
  // Appends a new form dynamically after creating it via API
  const handleCreateForm = async (newFormTitle: string) => {
    try {
      const response = await new FormService().createForm({ title: newFormTitle });
      formsList.value.push({
        id: Number(response.form_id),
        title: newFormTitle,
        status: "active",
        submissions: 0,
        views: 0,
        clicks: 0,
        clickRate: "0.0%",
        created: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      });
      // Recalculate stats counters
      totalForms.value = formsList.value.length;
      activeForms.value = formsList.value.filter((f) => f.status === "active").length;
      inactiveForms.value = formsList.value.filter((f) => f.status === "draft").length;
    } catch (error) {
      console.error("Failed to create form:", error);
    }
  };

  // Open Modals
  const openRenameModal = (form: any) => {
    selectedForm.value = form;
    showRenameModal.value = true;
  };

  const openCloneModal = (form: any) => {
    if (userStore.plan_id === 1) {
      showUpdatePlanModal.value = true;
    } else {
      selectedForm.value = form;
      showCloneModal.value = true;
    }
  };

  const openDeleteModal = (form: any) => {
    selectedForm.value = form;
    showDeleteModal.value = true;
  };

  // Local data manipulation handlers (demonstrating dynamic CRUD)
  const handleRename = (id: number, newTitle: string) => {
    const form = formsList.value.find((f) => f.id === id);
    if (form) {
      form.title = newTitle;
    }
  };

  // Refetches list when modal completes cloning
  const handleClone = async () => {
    await fetchFilteredForms(currentPage.value);
  };

  const handleDelete = async () => {
    // 👈 Added async
    // 1. Call the API to fetch the updated list (this automatically sets isLoading = true and shows the skeleton)
    await fetchFilteredForms(currentPage.value);
  };

  // Fetch filtered list of forms from the API and map to frontend keys
  const fetchFilteredForms = async (page: number = 1) => {
    isLoading.value = true;
    try {
      const payload = {
        time: selectedFilter.value,
        start_date: selectedFilter.value === "custom" ? startDate.value : "",
        end_date: selectedFilter.value === "custom" ? endDate.value : "",
      };

      // Ensure dates exist for custom date ranges
      if (selectedFilter.value === "custom") {
        if (!startDate.value || !endDate.value) return;
        payload.start_date = startDate.value;
        payload.end_date = endDate.value;
      }

      const response = await new FormService().getFormsFilter(payload, page);

      let rawList: any[] = [];
      let lastPage = 1;
      if (Array.isArray(response.widgetList)) {
        rawList = response.widgetList;
        totalPage.value = 1;
        currentPage.value = 1;
      } else if (response.widgetList) {
        rawList = (response.widgetList as any).data || [];
        lastPage = (response.widgetList as any).last_page || 1;
        totalPage.value = lastPage;
        currentPage.value = (response.widgetList as any).current_page || 1;
      }

       if (page > lastPage && lastPage >= 1) {
        await fetchFilteredForms(lastPage);
        return;
      }

      // Map backend model properties to the property names expected by the template
      formsList.value = rawList.map((item: any) => {
        const views = Number(item.mobile_view || 0) + Number(item.desktop_view || 0);
        const clicks = Number(item.mobile_click || 0) + Number(item.desktop_click || 0);
        const clickRate = views > 0 ? ((clicks / views) * 100).toFixed(1) + "%" : "0.0%";
        const createdDate = item.created_at
          ? new Date(item.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
          : "";

        return {
          id: item.unique_id || item.id, // Maps to form.id used in the editor link
          title: item.title,
          status: item.widget_status === 1 ? "active" : "draft", // Maps to CheckboxToggle values
          submissions: Number(item.total_submissions || 0),
          views: views,
          clicks: clicks,
          clickRate: clickRate,
          created: createdDate,
        };
      });

      // Update counters directly from backend API response keys
      totalForms.value = response.totalWidget || 0;
      activeForms.value = response.activeWidget || 0;
      inactiveForms.value = response.inActiveWidget || 0;
    } catch (error) {
      console.error("Failed to fetch filtered forms list:", error);
    } finally {
      isLoading.value = false;
    }
  };

  // Click handler for Custom date range apply button
  const applyCustomFilter = async () => {
    if (!dateRange.value) return;
    startDate.value = dateRange.value[0];
    endDate.value = dateRange.value[1];
    await fetchFilteredForms(1);
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPage.value) {
      fetchFilteredForms(page); // 👈 Always show skeleton loader
    }
  };

  // Toggle status instantly in UI and call status API in the background
  const handleStatusChange = async (form: any, newStatus: string) => {
    // 1. Store the previous status so we can revert if the API call fails
    const oldStatus = form.status;

    // 2. Instantly flip the switch in the UI (optimistic update)
    form.status = newStatus;

    const payload = {
      widget_id: form.id,
      widget_status: newStatus === "active" ? 1 : 0,
    };

    isMetricLoading.value = true; // Turn on metric loading placeholders
    try {
      const response = await new FormService().changeFormStatus(payload);

      if (response.status === 1) {
        // Update stats counters directly from the API response
        totalForms.value = response.totalWidget ?? totalForms.value;
        activeForms.value = response.activeWidget ?? activeForms.value;
        inactiveForms.value = response.inActiveWidget ?? inactiveForms.value;
      } else {
        // API responded with an error status (revert the toggle)
        form.status = oldStatus;
        showErrorMessage(response.message || "Failed to update form status.");
      }
    } catch (error) {
      // Network error or server crash (revert the toggle)
      form.status = oldStatus;
      console.error("Failed to change form status:", error);
      showErrorMessage(error);
    } finally {
      isMetricLoading.value = false; // Turn off metric placeholders
    }
  };

  // Watch for dropdown selection change to load data immediately (except for custom ranges)
  watch(selectedFilter, async (newVal: string) => {
    if (newVal !== "custom") {
      await fetchFilteredForms(1);
    }
  });

  onMounted(() => {
    fetchFilteredForms(1);
  });
</script>

<style scoped>
  /* Dot Grid Background Pattern */
  .bg-dot-grid {
    background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
    background-size: 24px 24px;
  }

  /* Floating Animations */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  @keyframes floatReverse {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(8px);
    }
  }

  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-reverse {
    animation: floatReverse 4.5s ease-in-out infinite;
  }

  /* Entrance Fade-In-Up Animation */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Button Glow Pulse */
  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(13, 148, 136, 0);
    }
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s infinite;
  }
</style>
