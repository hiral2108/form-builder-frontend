<template>
  <div class="grid grid-cols-12 gap-6 h-full relative items-start">
    <section class="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <div class="w-full flex items-center p-4 rounded-t-xl border-b border-gray-200 gap-3">
          <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex-shrink-0">
            <img
              v-svg-inline
              src="@/assets/icons/form-settings/settings-3-line.svg"
              alt="Basic Settings"
              class="h-5 w-5" />
          </span>
          <div class="flex flex-col">
            <span class="text-base font-bold text-slate-800 leading-tight">Basic Settings</span>
            <span class="text-sm text-slate-500 mt-0.5">Configure form submission and confirmation rules</span>
          </div>
        </div>

        <div class="p-4 space-y-4 bg-white rounded-b-xl">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Confirmation Type</label>
            <RadioTypeSelector
              v-model="submissionSetting.confirmationType"
              :options="confirmationTypeOptions"
              :columns="2"
              name="confirmation-type-selector"
              class="flex-1" />
          </div>

          <div
            v-if="submissionSetting.confirmationType === 'same_page'"
            class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0 pt-1.5"
              >Message to Show</label
            >
            <div class="flex-1 w-full">
              <div class="quill-editor-wrapper">
                <QuillEditor
                  v-model:content="submissionSetting.messageToShow"
                  contentType="html"
                  theme="snow"
                  placeholder="Enter confirmation message..."
                  :toolbar="editorToolbar" />
              </div>
            </div>
          </div>

          <div
            v-if="submissionSetting.confirmationType === 'custom_url'"
            class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Custom URL</label>
            <InputField
              v-model="submissionSetting.customUrl"
              type="text"
              focusColor="teal"
              placeholder="https://example.com/thank-you"
              fieldId="custom_url"
              :hasError="Boolean(validationErrors?.custom_url)"
              :validationMessage="validationErrors?.custom_url ? [{ $message: validationErrors.custom_url }] : []"
              @input="delete validationErrors.custom_url"
              class="w-full" />
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">After Submission</label>
            <RadioTypeSelector
              v-model="submissionSetting.afterSubmission"
              :options="afterSubmissionOptions"
              :columns="2"
              name="after-submission-selector"
              class="flex-1" />
          </div>
        </div>
      </div>

      <div class="border border-slate-200 rounded-xl bg-white relative">
        <div class="w-full flex items-center gap-3 p-4 rounded-t-xl border-b border-gray-200 select-none">
          <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex-shrink-0">
            <img v-svg-inline src="@/assets/icons/auth/email.svg" alt="Notifications Settings" class="h-5 w-5" />
          </span>
          <div class="flex flex-col">
            <span class="text-base font-bold text-slate-800 leading-tight">Notification Settings</span>
            <span class="text-sm text-slate-500 mt-0.5">Manage email notifications and database storage</span>
          </div>
        </div>

        <div class="p-4 space-y-4 bg-white rounded-b-xl">
          <div class="border border-slate-200 rounded-xl bg-white relative">
            <div class="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <span class="text-sm font-semibold text-slate-700">Save to Database</span>
              <CheckboxToggle v-model="submissionSetting.saveToDatabase" />
            </div>
          </div>

          <div class="border border-slate-200 rounded-xl bg-white relative">
            <div class="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
            <span class="text-sm font-semibold text-slate-700 flex items-center flex-wrap gap-1">
              <span>Send an Email</span>
              <span
                v-if="userStore.plan_id === 1"
                class="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm pointer-events-none"
                >Upgrade to Pro</span>
            </span>
            <CheckboxToggle v-model="submissionSetting.sendEmail" />
          </div>

            <div
            v-show="submissionSetting.sendEmail"
            class="relative border-t border-slate-200/60"
            :class="userStore.plan_id === 1 ? 'pro-content' : ''">
            
            <div class="p-4 space-y-4 bg-white rounded-b-xl email-settings-fields-container">
              
              <!-- Name -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Name</label>
                <InputField
                  v-model="submissionSetting.emailSettings.name"
                  type="text"
                  focusColor="teal"
                  placeholder="Enter name"
                  fieldId="email_name"
                  :hasError="Boolean(validationErrors?.email_name)"
                  :validationMessage="validationErrors?.email_name ? [{ $message: validationErrors.email_name }] : []"
                  @input="delete validationErrors.email_name"
                  class="flex-1" />
              </div>

              <!-- Send to Email -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Send to Email</label>
                <InputField
                  v-model="submissionSetting.emailSettings.sendToEmail"
                  type="email"
                  focusColor="teal"
                  placeholder="Enter email"
                  fieldId="email_send_to"
                  :hasError="Boolean(validationErrors?.email_send_to)"
                  :validationMessage="validationErrors?.email_send_to ? [{ $message: validationErrors.email_send_to }] : []"
                  @input="delete validationErrors.email_send_to"
                  class="flex-1" />
              </div>

              <!-- Subject -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Subject</label>
                <InputField
                  v-model="submissionSetting.emailSettings.subject"
                  type="text"
                  focusColor="teal"
                  placeholder="Enter email subject"
                  fieldId="email_subject"
                  :hasError="Boolean(validationErrors?.email_subject)"
                  :validationMessage="validationErrors?.email_subject ? [{ $message: validationErrors.email_subject }] : []"
                  @input="delete validationErrors.email_subject"
                  class="flex-1" />
              </div>

              <!-- Email Body -->
              <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0 pt-1.5">Email Body</label>
                <div class="flex-1 w-full">
                  <div 
                    id="email_body"
                    class="quill-editor-wrapper border rounded-lg overflow-hidden"
                    :class="validationErrors.email_body ? 'has-error' : 'border-slate-200'">
                    <QuillEditor
                      v-model:content="submissionSetting.emailSettings.emailBody"
                      contentType="html"
                      theme="snow"
                      placeholder="Enter email body..."
                      @update:content="delete validationErrors.email_body"
                      :toolbar="editorToolbar" />
                  </div>
                  <p v-if="validationErrors.email_body" class="text-xs text-red-500 mt-1">
                    {{ validationErrors.email_body }}
                  </p>
                </div>
              </div>

             <!-- Include Fields Dropdown -->
              <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0 pt-3">Include Fields</label>
                <div class="flex-1 w-full">
                  <!-- Dropdown Box -->
                  <div class="relative" ref="fieldDropdownRef">
                    <button
                      type="button"
                      class="w-full flex items-center justify-between p-3 bg-white border border-solid border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      @click.stop="toggleFieldDropdown">
                      <span class="text-sm font-medium text-slate-700">Insert Field</span>
                      <svg
                        width="22"
                        height="22"
                        class="transition-all duration-300"
                        :class="{ 'rotate-[180deg]': isFieldDropdownOpen }"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.32036 8.70667L11.6116 5.41334L12.5577 6.34667L8.32036 10.5867L4.08301 6.34667L5.02908 5.41334L8.32036 8.70667Z"
                          fill="#9CA3AF"></path>
                      </svg>
                    </button>
                    <div
                      :class="[
                        'absolute top-full left-0 right-0 mt-1 bg-white border border-solid border-slate-200 rounded-xl shadow-lg z-50 max-h-68 overflow-y-auto',
                        { hidden: !isFieldDropdownOpen },
                      ]"
                      @click.stop>
                      <div
                        class="sticky top-0 bg-slate-50 border-b border-slate-200 p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 z-10">
                        <input
                          type="text"
                          ref="fieldSearchInputRef"
                          v-model="fieldSearch"
                          placeholder="Search fields..."
                          class="w-full sm:flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 transition-all" />
                      </div>
                      <div class="divide-y divide-slate-100">
                        <div v-show="filteredFields.length === 0" class="p-4 text-center text-sm text-slate-500 bg-white">
                          No fields found
                        </div>
                        <button
                          v-for="field in filteredFields"
                          :key="field.id"
                          type="button"
                          class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer bg-white"
                          @click="addField(field.id)">
                          <span class="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">{{
                            field.type.toUpperCase()
                          }}</span>
                          <span class="flex-1 text-left text-sm text-slate-700 font-medium">{{ field.label || field.type }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reply To -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Reply To</label>
                <InputField
                  v-model="submissionSetting.emailSettings.replyTo"
                  type="email"
                  focusColor="teal"
                  placeholder="Enter reply to email"
                  fieldId="email_reply_to"
                  :hasError="Boolean(validationErrors?.email_reply_to)"
                  :validationMessage="validationErrors?.email_reply_to ? [{ $message: validationErrors.email_reply_to }] : []"
                  @input="delete validationErrors.email_reply_to"
                  class="flex-1" />
              </div>

              <!-- BCC -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">BCC</label>
                <InputField
                  v-model="submissionSetting.emailSettings.bcc"
                  type="text"
                  focusColor="teal"
                  placeholder="Enter BCC email(s)"
                  fieldId="email_bcc"
                  :hasError="Boolean(validationErrors?.email_bcc)"
                  :validationMessage="validationErrors?.email_bcc ? [{ $message: validationErrors.email_bcc }] : []"
                  @input="delete validationErrors.email_bcc"
                  class="flex-1" />
              </div>

              <!-- CC -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">CC</label>
                <InputField
                  v-model="submissionSetting.emailSettings.cc"
                  type="text"
                  focusColor="teal"
                  placeholder="Enter CC email(s)"
                  fieldId="email_cc"
                  :hasError="Boolean(validationErrors?.email_cc)"
                  :validationMessage="validationErrors?.email_cc ? [{ $message: validationErrors.email_cc }] : []"
                  @input="delete validationErrors.email_cc"
                  class="flex-1" />
              </div>

            </div>
            <div
              v-if="userStore.plan_id === 1"
              class="pro-overlay absolute hidden inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-b-xl">
              <router-link
                to="/plan"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-semibold text-sm shadow-md transition-transform hover:scale-[1.03]">
                <img v-svg-inline src="@/assets/icons/auth/password.svg" /> Upgrade to Pro
              </router-link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="lg:col-span-6 w-full flex flex-col items-center bg-transparent border-none lg:bg-slate-100/50 lg:border lg:border-slate-200/60 rounded-2xl p-0 lg:p-6 min-h-0 lg:min-h-[400px] lg:sticky lg:top-24">
      <PreviewTemplate>
        <DisplayRulePreview :allowOpen="true" />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
  import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
  import DisplayRulePreview from "@/views/FormSettingComponents/DisplayRulePreview.vue";
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";

  import { formSetting } from "@/composable/useFormSettings";
  import { useSubmissionSettingStore } from "@/stores/submissionStore";
  import { useFormFieldSettingStore } from "@/stores/formFieldStore"; 
  import { useUserStore } from "@/stores/user.ts";

  const submissionSettingStore = useSubmissionSettingStore();
  const userStore = useUserStore();
  const { submissionSetting, validationErrors } = formSetting();

 // Load Form Fields and bind Selected Fields ref
const formFieldStore = useFormFieldSettingStore();
const formFields = computed(() => formFieldStore.formFieldSetting.fields || []);

// Dropdown UI States
const isFieldDropdownOpen = ref(false);
const fieldSearch = ref("");
const fieldDropdownRef = ref<HTMLElement | null>(null);
const fieldSearchInputRef = ref<HTMLInputElement | null>(null);

const toggleFieldDropdown = () => {
  isFieldDropdownOpen.value = !isFieldDropdownOpen.value;
  if (isFieldDropdownOpen.value) {
    setTimeout(() => {
      if (fieldSearchInputRef.value) fieldSearchInputRef.value.focus();
    }, 0);
  }
};

  const getPlaceholderKey = (field: any) =>
    (field.label || field.type).toLowerCase().replace(/\s+/g, "_");

  const insertFieldLine = (body: string, key: string, label: string) => {
    const markup = `<p data-field-key="${key}">${label}: {${key}}</p>`;
    if (!body || body.endsWith("<p><br></p>") || body.endsWith("<br>")) {
      return body.replace(/<p><br><\/p>$/, "") + markup;
    }
    return body + markup;
  };

const addField = (id: string): void => {
  const field = formFields.value.find(f => f.id === id);
  if (!field) return;

  const key = getPlaceholderKey(field);
  const currentBody = submissionSetting.value.emailSettings.emailBody || "";

  submissionSetting.value.emailSettings.emailBody = insertFieldLine(
    currentBody,
    key,
    field.label || field.type
  );
};
const filteredFields = computed(() => {
  const q = fieldSearch.value.trim().toLowerCase();
  if (!q) return formFields.value;
  return formFields.value.filter(f => 
    (f.label || "").toLowerCase().includes(q) || 
    f.type.toLowerCase().includes(q)
  );
});


// Click outside listener to close dropdown
const onDocClick = (e: MouseEvent) => {
  const el = fieldDropdownRef.value;
  if (el && !el.contains(e.target as Node)) {
    isFieldDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
});

  const confirmationTypeOptions = [
    { label: "Same Page", value: "same_page" },
    { label: "Custom URL", value: "custom_url" },
  ];

  const afterSubmissionOptions = [
    { label: "Hide Form", value: "hide_form" },
    { label: "Reset Form", value: "reset_form" },
  ];

  const editorToolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    [{ align: [] }],
    ["link", "image", "code-block"],
  ];

  watch(
    submissionSetting,
    (newVal) => {
      Object.assign(submissionSettingStore.submissionSetting, newVal);
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped>
    :deep(.quill-editor-wrapper) {
    border: 1px solid #d1d5db;
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    width: 100%;
  }

  :deep(.quill-editor-wrapper.has-error:not(:focus-within)) {
    border-color: #ef4444 !important;
  }

  :deep(.quill-editor-wrapper:focus-within) {
    border-color: transparent !important;
    box-shadow: 0 0 0 2px #14b8a6 !important;
  }

  :deep(.ql-toolbar.ql-snow) {
    border: none !important;
    border-bottom: 1px solid #e2e8f0 !important;
    background-color: #f8fafc;
    padding: 8px 12px !important;
  }

  :deep(.ql-container.ql-snow) {
    border: none !important;
    min-height: 120px;
    font-size: 0.875rem;
  }

  :deep(.ql-editor) {
    min-height: 120px;
    max-height: 120px;
    overflow-y: auto;
    padding: 10px 14px !important;
  }

  :deep(.ql-editor.ql-blank::before) {
    left: 16px !important;
    font-style: normal;
    color: #94a3b8;
  }

    /* PRO Upgrade Hover Blur & Overlay Reveal */
  .pro-content:hover .pro-overlay {
    display: flex !important;
  }
  
  .pro-content:hover .email-settings-fields-container {
    filter: blur(3px);
    pointer-events: none; /* Prevents clicking fields when blurred */
    transition: filter 0.2s ease-in-out;
  }
</style>
