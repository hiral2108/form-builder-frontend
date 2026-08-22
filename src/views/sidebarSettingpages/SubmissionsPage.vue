<template>
  <div class="w-full">
    <!-- Filter Inputs -->
    <div class="flex items-center gap-3 flex-wrap mb-6 dashboard-filter">
      <!-- Calendar Select Filter -->
      <div class="relative flex-shrink-0 select-box-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <path
            d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2Zm11 7H4v12h16V8Zm-9 3v4H8v-4h3Zm5 0v4h-3v-4h3Z"></path>
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
              popper-class="filter-date-range-popper" />
          </div>
        </div>
      </template>

      <!-- Search Input -->
      <div class="block">
        <div class="form-input">
          <input
            v-model="searchQuery"
            type="text"
            class="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 h-[38px] w-60"
            placeholder="Search forms..." />
        </div>
      </div>

      <!-- Apply Button -->
      <button
        type="button"
        class="submit-filter text-sm py-0.5 px-4 rounded-xl min-h-[38px] text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-800 cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm shadow-teal-600/10 h-[38px]"
        @click="applyCustomFilter">
        Apply
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- 1. EMPTY STATE -->
      <div v-if="filteredSubmissions.length === 0 && !isLoading">
        <EmptySubmissions
          title="No submissions found"
          description="Your form hasn't received any responses yet. Share your form to start collecting data!" />
      </div>

      <!-- 2. SKELETON LOADER -->
      <div v-else-if="isLoading" class="overflow-x-auto animate-pulse">
        <table class="w-full">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="py-4 px-6 w-[8%] text-center">
                <div class="h-5 w-5 bg-slate-100 rounded-md mx-auto"></div>
              </th>
              <th class="py-4 px-6 w-[28%] text-center">
                <div class="h-4 w-24 bg-slate-200 rounded-lg mx-auto"></div>
              </th>
              <th class="py-4 px-6 w-[20%] text-center">
                <div class="h-4 w-20 bg-slate-200 rounded-lg mx-auto"></div>
              </th>
              <th class="py-4 px-6 w-[28%] text-center">
                <div class="h-4 w-20 bg-slate-200 rounded-lg mx-auto"></div>
              </th>
              <th class="py-4 px-6 w-[16%] text-center">
                <div class="h-4 w-16 bg-slate-200 rounded-lg mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="i in 10" :key="i">
              <!-- 👈 Loops 10 times to match your actual table rows -->
              <!-- Checkbox -->
              <td class="py-4 px-6 text-center">
                <div class="h-5 w-5 bg-slate-200 rounded-md mx-auto"></div>
              </td>

              <!-- Form Name -->
              <td class="py-4 px-6 text-center">
                <div class="h-4 w-24 bg-slate-200 rounded-lg mx-auto"></div>
              </td>

              <!-- Created At -->
              <td class="py-4 px-6 text-center">
                <div class="h-4 w-36 bg-slate-200 rounded-lg mx-auto"></div>
              </td>

              <!-- Page URL Button -->
              <td class="py-4 px-6 text-center">
                <div class="w-9 h-9 bg-slate-200 rounded-xl mx-auto"></div>
              </td>

              <!-- Twin Actions Buttons -->
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center gap-2.5">
                  <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
                  <div class="w-9 h-9 bg-slate-200 rounded-xl"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3. SUBMISSIONS TABLE -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="py-4 px-6 w-[8%] text-center"></th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[28%]">Form Name</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[20%]">Created At</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[28%]">Page URL</th>
              <th class="text-center py-4 px-6 font-semibold text-slate-700 text-sm w-[16%]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="submission in filteredSubmissions"
              :key="submission.id"
              class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center">
                  <CustomDefaultCheckbox
                    :modelValue="selectedSubmissionIds.includes(submission.id)"
                    label=""
                    @update:modelValue="toggleSelectRow($event, submission.id)" />
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
                  class="w-9 h-9 bg-slate-50 hover:bg-teal-50 hover:text-teal-600 border border-slate-100 rounded-xl relative transition-colors flex items-center justify-center cursor-pointer my-0 mx-auto">
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path>
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
                      class="w-9 h-9 bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700 transition-colors rounded-xl flex items-center justify-center cursor-pointer">
                      <img v-svg-inline src="@/assets/icons/submission-page/eye-line.svg" class="w-5 h-5" />
                    </button>
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      View
                      <span
                        class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>

                  <!-- Delete Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button
                      @click="openDeleteModal(submission.id)"
                      class="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors rounded-xl flex items-center justify-center cursor-pointer">
                      <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-5 h-5" />
                    </button>
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-10">
                      Delete
                      <span
                        class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Button Row -->
      <div
        v-if="filteredSubmissions.length > 0 && !isLoading"
        class="border-t border-solid border-slate-100 p-4 flex items-center justify-between gap-2.5 flex-wrap">
        <div class="flex items-center gap-2.5 flex-wrap">
          <button
            @click="downloadCSV"
            :disabled="isDownloadingCsv"
            class="text-sm py-2 px-4 rounded-lg text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-800 transition-colors cursor-pointer font-semibold shadow-sm shadow-teal-600/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <!-- Spinner SVG -->
            <svg
              v-if="isDownloadingCsv"
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isDownloadingCsv ? "Downloading..." : "Download CSV" }}
          </button>
          <button
            @click="isDeleteBulkModalOpen = true"
            :disabled="selectedSubmissionIds.length === 0"
            class="text-sm py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed font-semibold animate-none">
            Remove Selected
          </button>
          <button
            @click="isDeleteAllModalOpen = true"
            class="text-sm py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer font-semibold animate-none">
            Remove All Records
          </button>
        </div>
        <div v-if="totalPage > 1" class="flex items-center">
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

    <!-- 4. SLIDING DETAILS DRAWER PANEL (Exact HTML structure wired with Vue bindings) -->
    <div v-if="selectedSubmission" class="fixed inset-0 z-50 flex justify-end animate-fade-in">
      <!-- Backdrop -->
      <div @click="closeDetailsDrawer" class="absolute inset-0 bg-black/30"></div>

      <!-- Drawer Panel -->
      <div class="relative w-full max-w-md bg-white shadow-xl animate-slide-in-right overflow-y-auto z-10">
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">Submission Detail</h3>
          <button
            @click="closeDetailsDrawer"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <img v-svg-inline src="@/assets/icons/submission-page/close-line.svg" class="w-6 h-6" />
          </button>
        </div>

        <!-- Content Body -->
        <div class="p-5 space-y-4">
          <!-- Submission Sub-Header -->
          <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
              <img v-svg-inline src="@/assets/icons/settingpage/file-list-3-line.svg" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">sub-{{ selectedSubmission.id }}</p>
              <p class="text-xs text-slate-500">
                {{ selectedSubmission.formName }} · {{ selectedSubmission.createdAt }}
              </p>
            </div>
          </div>

          <!-- Data Fields List -->
          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Submitted Data</h4>
            <div class="space-y-2.5">
              <div
                v-for="(val, label) in selectedSubmission.submittedData"
                :key="label"
                class="bg-slate-50 rounded-lg p-3">
                <label class="block text-xs font-medium text-slate-500 uppercase mb-1">{{ label }}</label>
                <p class="text-sm text-slate-800">{{ val }}</p>
              </div>
            </div>
          </div>
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
    @confirm="confirmDeleteLead" />
  <DeleteBulkFormLead
    :isDeleteBulkModalOpen="isDeleteBulkModalOpen"
    :selectedLeadIds="selectedSubmissionIds"
    :isDeleting="isDeleting"
    @close="isDeleteBulkModalOpen = false"
    @confirm="confirmDeleteBulkLead" />
  <DeleteAllFormLead
    :isDeleteAllModalOpen="isDeleteAllModalOpen"
    :isDeleting="isDeleting"
    @close="isDeleteAllModalOpen = false"
    @confirm="confirmDeleteAllLeads" />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import SelectField from "@/components/global/fields/SelectField.vue";
  import CustomDefaultCheckbox from "@/components/global/fields/CustomDefaultCheckbox.vue";
  import { ElDatePicker } from "element-plus";
  import { useToast } from "vue-toastification";
  import DeleteFormLead from "@/components/modals/DeleteFormLead.vue";
  import DeleteBulkFormLead from "@/components/modals/DeleteBulkFormLead.vue";
  import DeleteAllFormLead from "@/components/modals/DeleteAllFormLead.vue";
  import SubmissionService from "@/services/submission-services";
  import EmptySubmissions from "@/components/global/EmptySubmissions.vue";
  import type { LeadItem, LeadFilterPayload } from "@/types/submission";

  const toast = useToast();

  export interface SubmissionLocal {
    id: number;
    formName: string;
    createdAt: string;
    pageUrl: string;
    submittedData: Record<string, string | number | boolean>;
  }

  // Loading & Filter States
  const isLoading = ref(true);
  const searchQuery = ref("");
  const selectedFilter = ref("all_time");
  const dateRange = ref<[string, string] | null>(null);

  const activeSearchQuery = ref("");
  const activeFilter = ref("all_time");
  const activeDateRange = ref<[string, string] | null>(null);

  const currentPage = ref(1);
  const totalPage = ref(1);

  const submissions = ref<SubmissionLocal[]>([]); // 👈 Strong Typed
  const selectedSubmissionIds = ref<number[]>([]);

  // Details Drawer State
  const selectedSubmission = ref<SubmissionLocal | null>(null);

  // Modal toggle states
  const isDeleteModalOpen = ref(false);
  const isDeleteBulkModalOpen = ref(false);
  const isDeleteAllModalOpen = ref(false);
  const deleteLeadId = ref<number | null>(null);
  const isDeleting = ref(false);
  const isDownloadingCsv = ref(false);

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

  // 1. Fetch Submissions from API
  const fetchSubmissions = async (page: number = 1) => {
    try {
      isLoading.value = true;

      const startDateVal = dateRange.value && dateRange.value[0] ? dateRange.value[0] : "";
      const endDateVal = dateRange.value && dateRange.value[1] ? dateRange.value[1] : "";

      const payload: LeadFilterPayload = {
        time: selectedFilter.value,
        start_date: selectedFilter.value === "custom" ? startDateVal : "",
        end_date: selectedFilter.value === "custom" ? endDateVal : "",
        search: searchQuery.value,
      };

      const response = await new SubmissionService().getLeadsFilter(payload, page);

      let rawList: LeadItem[] = [];
      let lastPage = 1;
      let currPage = 1;
      if (response && response.data) {
        rawList = response.data.data || []; 
        lastPage = response.data.last_page || 1;
        currPage = response.data.current_page || 1;
        totalPage.value = lastPage;
        currentPage.value = currPage;
      }

       if (page > lastPage && lastPage >= 1) {
        await fetchSubmissions(lastPage);
        return;
      }

      // Map backend response properties safely into component state
      submissions.value = rawList.map((item: LeadItem) => {
        // Transform the backend fields array into key-value pairs for the Details Drawer
        const submittedData: Record<string, string | number | boolean> = {};
        if (Array.isArray(item.fields)) {
          item.fields.forEach((f) => {
            if (f.field_name) {
              submittedData[f.field_name] = f.value;
            }
          });
        }

        return {
          id: item.id,
          formName: item.widget_title || "", // 👈 Map widget_title to Form Name
          createdAt: formatCreatedAt(item.created_at), // 👈 Formatted Date
          pageUrl: item.page_url || "",
          submittedData: submittedData,
        };
      });

      activeSearchQuery.value = searchQuery.value;
      activeFilter.value = selectedFilter.value;
      activeDateRange.value = dateRange.value ? [...dateRange.value] : null;
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      isLoading.value = false;
    }
  };

  // Filtered list returns the API results directly since filtering is done on the backend
  const filteredSubmissions = computed(() => {
    return submissions.value;
  });

  const applyCustomFilter = async () => {
    await fetchSubmissions(1);
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPage.value) {
      fetchSubmissions(page);
    }
  };

  const formatCreatedAt = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  // Trigger Modals
  const openDeleteModal = (id: number) => {
    deleteLeadId.value = id;
    isDeleteModalOpen.value = true;
  };
  // Confirm delete single submission with simulated delay
  const confirmDeleteLead = async () => {
  if (deleteLeadId.value === null) return;
  try {
    isDeleting.value = true;
    const response = await new SubmissionService().removeLeads({ id: [deleteLeadId.value] });
    selectedSubmissionIds.value = selectedSubmissionIds.value.filter((id) => id !== deleteLeadId.value);
    
    // 👈 Refetch submissions (this will recalculate total page counts and show the skeleton loader)
    await fetchSubmissions(currentPage.value);
    
    toast.success(response.message || "Submission deleted successfully");
  } catch (error) {
      console.error(error);
      toast.error("Failed to delete submission");
    } finally {
      isDeleting.value = false;
      isDeleteModalOpen.value = false;
    }
  };

  // Confirm bulk delete selected submissions with simulated delay
  const confirmDeleteBulkLead = async () => {
  try {
    isDeleting.value = true;
    const response = await new SubmissionService().removeLeads({ id: selectedSubmissionIds.value });
    selectedSubmissionIds.value = [];
    
    // 👈 Refetch submissions
    await fetchSubmissions(currentPage.value);
    
    toast.success(response.message || "Selected submissions deleted successfully");
  } catch (error) {
      console.error(error);
      toast.error("Failed to delete selected submissions");
    } finally {
      isDeleting.value = false;
      isDeleteBulkModalOpen.value = false;
    }
  };

  // Confirm delete all submissions with simulated delay
  const confirmDeleteAllLeads = async () => {
    try {
      isDeleting.value = true;
      const response = await new SubmissionService().removeAllLead();
      submissions.value = [];
      selectedSubmissionIds.value = [];
      
      // 👈 Add these two lines to hide pagination layout when list is cleared
      totalPage.value = 1;
      currentPage.value = 1;
      
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear submissions");
    } finally {
      isDeleting.value = false;
      isDeleteAllModalOpen.value = false;
    }
  };

  // Checkbox individual select
  const toggleSelectRow = (checked: any, id: number) => {
    // 👈 Strong Typed checkbox param
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
  const openDetailsDrawer = (submission: SubmissionLocal) => {
    selectedSubmission.value = submission;
  };

  const closeDetailsDrawer = () => {
    selectedSubmission.value = null;
  };

  const downloadCSV = async () => {
    try {
      isDownloadingCsv.value = true;
      const startDateVal = dateRange.value && dateRange.value[0] ? dateRange.value[0] : "";
      const endDateVal = dateRange.value && dateRange.value[1] ? dateRange.value[1] : "";
      const payload = {
        time: selectedFilter.value,
        start_date: selectedFilter.value === "custom" ? startDateVal : "",
        end_date: selectedFilter.value === "custom" ? endDateVal : "",
        search: searchQuery.value,
      };
      const responseBlob = await new SubmissionService().exportLeadsCsv(payload);
      const url = window.URL.createObjectURL(new Blob([responseBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `submissions_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV file downloaded successfully");
    } catch (error) {
      console.error("Failed to export CSV:", error);
      toast.error("Failed to export CSV");
    } finally {
      isDownloadingCsv.value = false;
    }
  };

  // Load initial submissions data on mount
  onMounted(() => {
    fetchSubmissions(1);
  });
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
