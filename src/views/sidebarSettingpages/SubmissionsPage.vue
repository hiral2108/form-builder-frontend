<template>
  <div class="w-full">
    <!-- Submissions Page Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Form Submissions</h2>
      <p class="text-xs text-slate-400 mt-0.5">Track, export, and manage all your form submissions in one place.</p>
    </div>

    <!-- Filter Inputs -->
    <div class="flex items-center gap-3 flex-wrap mb-6 dashboard-filter">
      <!-- Calendar Select Filter -->
      <div class="relative flex-shrink-0 select-box-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <path d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
        </svg>
        <SelectField v-model="selectedFilter" :options="filteredMenu" customClass="pl-10 !w-[200px]" />
      </div>

      <!-- Custom Element Plus Date Range Picker -->
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
              popper-class="filter-date-range-popper"
            />
          </div>
        </div>
      </template>

      <!-- Search Input -->
      <div class="block">
        <div class="form-input">
          <input 
            v-model="searchQuery" 
            type="text"
            class="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 h-[38px] w-60"
            placeholder="Search forms..." 
          />
        </div>
      </div>

      <!-- Apply Button -->
      <button 
        type="button" 
        class="submit-filter text-sm py-0.5 px-4 rounded-lg min-h-[38px] text-white bg-teal-600 hover:bg-teal-700 cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm h-[38px]" 
        @click="applyCustomFilter"
      >
        Apply
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- 1. EMPTY STATE -->
      <div v-if="filteredSubmissions.length === 0 && !isLoading" class="py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 text-slate-300 mx-auto mb-4">
          <path d="M22 12.999V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7.001A5 5 0 0 1 6.999 8H17a5 5 0 0 1 5 4.999ZM19 13H5v6h14v-6Zm-6.5-6h-1c-.552 0-1-.448-1-1V2h3v4c0 .552-.448 1-1 1Z"></path>
        </svg>
        <p class="text-base font-bold text-slate-700">No submissions found</p>
      </div>

      <!-- 2. SKELETON LOADER -->
      <div v-else-if="isLoading" class="overflow-x-auto animate-pulse">
        <table class="w-full">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="py-4 px-6 w-[8%]"></th>
              <th class="py-4 px-6 w-[28%]"><div class="h-4 w-24 bg-slate-200 rounded mx-auto"></div></th>
              <th class="py-4 px-6 w-[20%]"><div class="h-4 w-20 bg-slate-200 rounded mx-auto"></div></th>
              <th class="py-4 px-6 w-[28%]"><div class="h-4 w-24 bg-slate-200 rounded mx-auto"></div></th>
              <th class="py-4 px-6 w-[16%]"><div class="h-4 w-16 bg-slate-200 rounded mx-auto"></div></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="i in 3" :key="i">
              <td class="py-4 px-6"><div class="h-5 w-5 bg-slate-200 rounded mx-auto"></div></td>
              <td class="py-4 px-6"><div class="h-4 w-32 bg-slate-200 rounded mx-auto"></div></td>
              <td class="py-4 px-6"><div class="h-4 w-24 bg-slate-200 rounded mx-auto"></div></td>
              <td class="py-4 px-6"><div class="h-4 w-40 bg-slate-200 rounded mx-auto"></div></td>
              <td class="py-4 px-6"><div class="h-8 w-16 bg-slate-200 rounded-lg mx-auto"></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3. SUBMISSIONS TABLE -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="py-4 px-6 w-[8%] text-center">
              </th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[28%]">Form Name</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[20%]">Created At</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[28%]">Page URL</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[16%]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center">
                  <CustomDefaultCheckbox 
                    :modelValue="selectedSubmissionIds.includes(submission.id)" 
                    label="" 
                    @update:modelValue="toggleSelectRow($event, submission.id)"
                  />
                </div>
              </td>
              
              <td class="py-4 px-6 text-center text-sm font-medium text-slate-800">
                {{ submission.formName }}
              </td>

              <td class="py-4 px-6 text-center text-sm text-slate-500">
                {{ submission.createdAt }}
              </td>

              <td class="py-4 px-6 text-center text-sm text-slate-500">
                <a 
                  :href="submission.pageUrl" 
                  target="_blank" 
                  class="w-9 h-9 bg-slate-50 hover:bg-teal-50 hover:text-teal-600 border border-slate-100 rounded-xl relative transition-colors flex items-center justify-center cursor-pointer my-0 mx-auto"
                >
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path>
                  </svg>
                </a>
              </td>

              <!-- Actions (With Eye/Details View and Delete) -->
              <td class="py-4 px-6">
                <div class="flex items-center justify-center gap-2.5">
                  <!-- Eye View Details Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button 
                      @click="openDetailsDrawer(submission)" 
                      class="w-9 h-9 bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700 transition-colors rounded-xl flex items-center justify-center cursor-pointer"
                    >
                      <i class="ri-eye-line text-lg"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      View
                      <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>

                  <!-- Delete Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button 
                      @click="openDeleteModal(submission.id)"
                      class="w-9 h-9 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors rounded-xl flex items-center justify-center cursor-pointer"
                    >
                      <i class="ri-delete-bin-line text-lg"></i>
                    </button>
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
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

      <!-- Action Button Row -->
      <div v-if="filteredSubmissions.length > 0 && !isLoading" class="border-t border-solid border-slate-100 p-4 flex items-center gap-2.5 flex-wrap">
        <button
          @click="downloadCSV"
          class="text-sm py-2 px-4 rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer font-semibold shadow-sm animate-none"
        >
          Download CSV
        </button>
        <button
          @click="isDeleteBulkModalOpen = true"
          :disabled="selectedSubmissionIds.length === 0"
          class="text-sm py-2 px-4 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed font-semibold animate-none"
        >
          Remove Selected
        </button>
        <button
          @click="isDeleteAllModalOpen = true"
          class="text-sm py-2 px-4 rounded-lg text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer font-semibold animate-none"
        >
          Remove All Records
        </button>
      </div>
    </div>

    <!-- 4. SLIDING DETAILS DRAWER PANEL (Exact HTML structure wired with Vue bindings) -->
    <div v-if="selectedSubmission" class="fixed inset-0 z-50 flex justify-end animate-fade-in">
      <!-- Backdrop -->
      <div @click="closeDetailsDrawer" class="absolute inset-0 bg-black/30"></div>
      
      <!-- Drawer Panel -->
      <div class="relative w-full max-w-md bg-white shadow-xl animate-slide-in-right overflow-y-auto z-10">
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">Submission Detail</h3>
          <button @click="closeDetailsDrawer" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <i class="ri-close-line text-lg"></i>
          </button>
        </div>
        
        <!-- Content Body -->
        <div class="p-5 space-y-4">
          <!-- Submission Sub-Header -->
          <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <i class="ri-file-list-3-line text-teal-700"></i>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">sub-{{ selectedSubmission.id }}</p>
              <p class="text-xs text-slate-500">{{ selectedSubmission.formName }} · {{ selectedSubmission.createdAt }}</p>
            </div>
          </div>
          
          <!-- Data Fields List -->
          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Submitted Data</h4>
            <div class="space-y-2.5">
              <div v-for="(val, label) in selectedSubmission.submittedData" :key="label" class="bg-slate-50 rounded-lg p-3">
                <label class="block text-xs font-medium text-slate-500 uppercase mb-1">{{ label }}</label>
                <p class="text-sm text-slate-800">{{ val }}</p>
              </div>
            </div>
          </div>
          
          <!-- Close Button -->
          <button @click="closeDetailsDrawer" class="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer mt-4">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  
      <!-- DELETE MODALS -->
    <DeleteFormLead 
      :isDeleteModalOpen="isDeleteModalOpen" 
      :deleteLeadId="deleteLeadId" 
      :selectedLeadIds="selectedSubmissionIds" 
      :isDeleting="isDeleting" 
      @close="isDeleteModalOpen = false" 
      @confirm="confirmDeleteLead" 
    />
    <DeleteBulkFormLead 
      :isDeleteBulkModalOpen="isDeleteBulkModalOpen" 
      :selectedLeadIds="selectedSubmissionIds" 
      :isDeleting="isDeleting" 
      @close="isDeleteBulkModalOpen = false" 
      @confirm="confirmDeleteBulkLead"
    />
    <DeleteAllFormLead 
      :isDeleteAllModalOpen="isDeleteAllModalOpen" 
      :isDeleting="isDeleting" 
      @close="isDeleteAllModalOpen = false" 
      @confirm="confirmDeleteAllLeads"
    />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SelectField from "@/components/global/fields/SelectField.vue";
import CustomDefaultCheckbox from "@/components/global/fields/CustomDefaultCheckbox.vue";
import { ElDatePicker } from "element-plus";
import "element-plus/dist/index.css";
import { useToast } from 'vue-toastification';
import DeleteFormLead from '@/components/modals/DeleteFormLead.vue';
import DeleteBulkFormLead from '@/components/modals/DeleteBulkFormLead.vue';
import DeleteAllFormLead from '@/components/modals/DeleteAllFormLead.vue';

const toast = useToast();

// Loading & Filter States
const isLoading = ref(true);
const searchQuery = ref("");
const selectedFilter = ref("all_time");
const dateRange = ref<[string, string] | null>(null);

const activeSearchQuery = ref("");
const activeFilter = ref("all_time");
const activeDateRange = ref<[string, string] | null>(null);

// Details Drawer State
const selectedSubmission = ref<any>(null);

    // Modal toggle states
const isDeleteModalOpen = ref(false);
const isDeleteBulkModalOpen = ref(false);
const isDeleteAllModalOpen = ref(false);
const deleteLeadId = ref<any>(null);
const isDeleting = ref(false);

// Trigger Modals
const openDeleteModal = (id: number) => {
  deleteLeadId.value = id;
  isDeleteModalOpen.value = true;
};

// Confirm delete single submission with simulated delay
const confirmDeleteLead = async () => {
  isDeleting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated loading spinner
  submissions.value = submissions.value.filter(sub => sub.id !== deleteLeadId.value);
  selectedSubmissionIds.value = selectedSubmissionIds.value.filter(id => id !== deleteLeadId.value);
  isDeleting.value = false;
  isDeleteModalOpen.value = false;
  toast.success("Submission deleted successfully");
};

// Confirm bulk delete selected submissions with simulated delay
const confirmDeleteBulkLead = async () => {
  isDeleting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated loading spinner
  submissions.value = submissions.value.filter(sub => !selectedSubmissionIds.value.includes(sub.id));
  selectedSubmissionIds.value = [];
  isDeleting.value = false;
  isDeleteBulkModalOpen.value = false;
  toast.success("Selected submissions deleted successfully");
};

// Confirm delete all submissions with simulated delay
const confirmDeleteAllLeads = async () => {
  isDeleting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated loading spinner
  submissions.value = [];
  selectedSubmissionIds.value = [];
  isDeleting.value = false;
  isDeleteAllModalOpen.value = false;
  toast.success("All submissions cleared successfully");
};

const filteredMenu = {
  all_time: "All Time",
  today: "Today",
  yesterday: "Yesterday",
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  this_month: "This month",
  last_month: "Last month",
  custom: "Custom",
};

// Mock Submissions List with detailed key-value form records matching QDP styling
const submissions = ref([
  { 
    id: 1, 
    formName: 'Contact Us Form', 
    createdAt: '2026-08-02 14:32', 
    pageUrl: 'https://example.com/contact',
    submittedData: {
      'Full Name': 'Sarah Johnson',
      'Email': 'sarah.j@example.com',
      'Message': 'Hi, I am interested in your enterprise plan. Can someone reach out?'
    }
  },
  { 
    id: 2, 
    formName: 'Contact Us Form', 
    createdAt: '2026-08-02 11:15', 
    pageUrl: 'https://example.com/contact',
    submittedData: {
      'Full Name': 'Michael Chen',
      'Email': 'm.chen@techcorp.io',
      'Message': 'Requesting quotes for bulk licenses.'
    }
  },
  { 
    id: 3, 
    formName: 'Support Ticket', 
    createdAt: '2026-08-02 09:47', 
    pageUrl: 'https://example.com/help',
    submittedData: {
      'Subject': 'Login issue on mobile',
      'Priority': 'High',
      'Description': 'Cannot authenticate using the iOS app, keeps showing network error.'
    }
  },
  { 
    id: 4, 
    formName: 'Event Registration', 
    createdAt: '2026-08-01 16:20', 
    pageUrl: 'https://example.com/events',
    submittedData: {
      'Name': 'Emily Davis',
      'Email': 'emily.d@example.com',
      'Ticket Type': 'VIP Access'
    }
  },
  { 
    id: 5, 
    formName: 'Newsletter Signup', 
    createdAt: '2026-08-01 13:05', 
    pageUrl: 'https://example.com/blog',
    submittedData: {
      'First Name': 'James',
      'Last Name': 'Wilson',
      'Email': 'james.wilson@example.com'
    }
  }
]);

const selectedSubmissionIds = ref<number[]>([]);

// Convert submission date strings to Date objects for filtering
const parseDateString = (dateStr: string) => {
  return new Date(dateStr.split(' ')[0]);
};

// Filtered list based only on active filter state
const filteredSubmissions = computed(() => {
  let result = submissions.value;

  if (activeSearchQuery.value) {
    result = result.filter(sub => 
      sub.formName.toLowerCase().includes(activeSearchQuery.value.toLowerCase())
    );
  }

  if (activeFilter.value === 'custom' && activeDateRange.value) {
    const start = new Date(activeDateRange.value[0]);
    const end = new Date(activeDateRange.value[1]);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    result = result.filter(sub => {
      const subDate = parseDateString(sub.createdAt);
      return subDate >= start && subDate <= end;
    });
  } else if (activeFilter.value !== 'all_time') {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    
    if (activeFilter.value === 'yesterday') {
      start.setDate(start.getDate() - 1);
      now.setDate(now.getDate() - 1);
    } else if (activeFilter.value === 'last_7_days') {
      start.setDate(start.getDate() - 7);
    } else if (activeFilter.value === 'last_30_days') {
      start.setDate(start.getDate() - 30);
    } else if (activeFilter.value === 'this_month') {
      start.setDate(1);
    } else if (activeFilter.value === 'last_month') {
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      now.setMonth(now.getMonth() - 1);
      now.setDate(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
    }

    result = result.filter(sub => {
      const subDate = parseDateString(sub.createdAt);
      return subDate >= start && subDate <= now;
    });
  }

  return result;
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 850);
});

const applyCustomFilter = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  activeSearchQuery.value = searchQuery.value;
  activeFilter.value = selectedFilter.value;
  activeDateRange.value = dateRange.value ? [...dateRange.value] : null;
  
  isLoading.value = false;
};

// Checkbox individual select
const toggleSelectRow = (checked: any, id: number) => {
  if (checked) {
    selectedSubmissionIds.value.push(id);
  } else {
    const index = selectedSubmissionIds.value.indexOf(id);
    if (index > -1) {
      selectedSubmissionIds.value.splice(index, 1);
    }
  }
};

// Open and Close Details Drawer
const openDetailsDrawer = (submission: any) => {
  selectedSubmission.value = submission;
};

const closeDetailsDrawer = () => {
  selectedSubmission.value = null;
};

const downloadCSV = () => {
  toast.success("Exporting submissions to CSV...");
};
</script>

<style scoped>
/* Inline styling overrides for daterange popper alignment */
:deep(.calender-input .el-date-editor) {
  height: 38px !important;
}

/* Drawer Backdrop Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Drawer Panel Slide In From Right */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>