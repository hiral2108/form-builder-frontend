<template>
  <div class="w-full">
        <!-- Forms List filter bar -->
    <div class="flex items-center gap-3 flex-wrap mb-6">
      <div class="relative flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <path d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
        </svg>
        
        <SelectField v-model="selectedFilter" :options="filteredMenu" />
      </div>

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
            class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer h-[38px] flex items-center justify-center shadow-sm"
          >
            Apply
          </button>
        </div>
      </template>
    </div>
    <!-- Stats Card Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <!-- Total Forms -->
      <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 flex-shrink-0 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/survey-line.svg" class="w-6 h-6"/>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">8</p>
          <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Forms</p>
        </div>
      </div>

      <!-- Total Submissions -->
      <div class="bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600 flex-shrink-0 text-xl">
          <img v-svg-inline src="@/assets/icons/dashboardpage/checkbox-circle-line.svg" class="w-6 h-6"/>
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-800 tracking-tight">7,425</p>
          <p class="text-sm font-semibold text-slate-500 tracking-wider">Total Submissions</p>
        </div>
      </div>

      <!-- Active Forms -->
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

    <!-- Forms List Table Card -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
              <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submissions</th>
              <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">View</th>
              <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Click</th>
              <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Click Rate</th>
              <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
              <th class="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="form in formsList" :key="form.id" class="hover:bg-slate-50/50 transition-colors group">
              <!-- Status Toggle -->
              <td class="px-5 py-3.5">
                <div class="flex items-center">
                  <button 
                    @click="toggleStatus(form)"
                    :class="[form.status === 'active' ? 'bg-teal-700' : 'bg-slate-300']"
                    class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <span 
                      :class="[form.status === 'active' ? 'translate-x-[18px]' : 'translate-x-[2px]']"
                      class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200"
                    ></span>
                  </button>
                </div>
              </td>
              
              <!-- Title -->
              <td class="px-5 py-3.5 w-[28%]">
                <div class="flex items-center gap-2">
                  <button class="text-sm font-medium text-slate-800 hover:text-teal-700 transition-colors cursor-pointer text-left">
                    {{ form.title }}
                  </button>
                  
                  <!-- Wrapped rename button in a tooltip container -->
                  <div class="relative group/tooltip">
                    <button @click="openRenameModal(form)" class="text-slate-400 hover:text-slate-600 transition-opacity cursor-pointer text-sm flex items-center">
                      <img v-svg-inline src="@/assets/icons/form-list/rename.svg" class="w-5 h-5"/>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      Rename
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>
                </div>
              </td>

              <!-- Submissions -->
              <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                {{ form.submissions.toLocaleString() }}
              </td>

              <!-- View -->
              <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                {{ form.views.toLocaleString() }}
              </td>

              <!-- Click -->
              <td class="px-5 py-3.5 text-sm text-slate-600 text-center">
                {{ form.clicks.toLocaleString() }}
              </td>

              <!-- Click Rate -->
              <td class="px-5 py-3.5 text-sm font-medium text-slate-600 text-center">
                {{ form.clickRate }}
              </td>

              <!-- Created -->
              <td class="px-5 py-3.5 text-sm text-slate-500">
                {{ form.created }}
              </td>

              <!-- Actions -->
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-center gap-2.5">
                  <!-- Edit Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button @click="router.push('/form-settings/' + form.id)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer text-lg">
                      <img v-svg-inline src="@/assets/icons/form-list/edit.svg" class="w-5 h-5"/>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      Edit
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div> 

                  <!-- Duplicate Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button @click="openCloneModal(form)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer text-lg">
                      <img v-svg-inline src="@/assets/icons/form-list/clone.svg" class="w-5 h-5"/>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      Clone
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>

                  <!-- Delete Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button @click="openDeleteModal(form)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer text-lg">
                      <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-5 h-5"/>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      Delete
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

    <!-- Modals -->
    <RenameFormModal 
      :isShowModal="showRenameModal" 
      :formId="selectedForm?.id"
      :formTitle="selectedForm?.title"
      @closeModal="showRenameModal = false"
      @confirmRename="handleRename"
    />

    <CloneFormModal 
      :isShowModal="showCloneModal" 
      :formId="selectedForm?.id"
      :formTitle="selectedForm?.title"
      @closeModal="showCloneModal = false"
      @confirmClone="handleClone"
    />

    <DeleteFormModal 
      :isShowModal="showDeleteModal" 
      :formId="selectedForm?.id"
      @closeModal="showDeleteModal = false"
      @confirmDelete="handleDelete"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RenameFormModal from '@/components/modals/RenameFormModal.vue';
import CloneFormModal from '@/components/modals/CloneFormModal.vue';
import DeleteFormModal from '@/components/modals/DeleteFormModal.vue';
import SelectField from "@/components/global/fields/SelectField.vue"; 
import { useToast } from "vue-toastification"; 

const router = useRouter();

// Modal triggers and tracking state
const showRenameModal = ref(false);
const showCloneModal = ref(false);
const showDeleteModal = ref(false);
const selectedForm = ref<any>(null);

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

const formsList = ref([
  { id: 1, title: 'Contact Us Form', status: 'active', submissions: 847, views: 2500, clicks: 920, clickRate: '36.8%', created: '15 Jan, 2026' },
  { id: 2, title: 'Newsletter Signup', status: 'active', submissions: 3201, views: 12000, clicks: 3450, clickRate: '28.8%', created: '02 Nov, 2025' },
  { id: 3, title: 'Job Application', status: 'active', submissions: 156, views: 850, clicks: 180, clickRate: '21.2%', created: '20 Mar, 2026' },
]);

const toggleStatus = (form: any) => {
  form.status = form.status === 'active' ? 'draft' : 'active';
};

// Open Modals
const openRenameModal = (form: any) => {
  selectedForm.value = form;
  showRenameModal.value = true;
};

const openCloneModal = (form: any) => {
  selectedForm.value = form;
  showCloneModal.value = true;
};

const openDeleteModal = (form: any) => {
  selectedForm.value = form;
  showDeleteModal.value = true;
};

// Local data manipulation handlers (demonstrating dynamic CRUD)
const handleRename = (id: number, newTitle: string) => {
  const form = formsList.value.find(f => f.id === id);
  if (form) {
    form.title = newTitle;
  }
};

const handleClone = (id: number, cloneTitle: string) => {
  const original = formsList.value.find(f => f.id === id);
  if (original) {
    formsList.value.push({
      ...original,
      id: Math.max(...formsList.value.map(f => f.id)) + 1,
      title: cloneTitle,
      submissions: 0,
      views: 0,
      clicks: 0,
      clickRate: '0.0%',
      created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
  }
};

const handleDelete = (id: number) => {
  formsList.value = formsList.value.filter(f => f.id !== id);
};
</script>

<style scoped>
/* Scoped overrides if needed */
</style>