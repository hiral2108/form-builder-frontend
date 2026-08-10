<template>
  <div class="grid grid-cols-12 gap-6 h-full relative">
    <!-- Left Panel (Settings accordion list) -->
    <section class="col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      
      <!-- Basic Settings Card -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <div class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-t-xl border-b border-slate-200/60 select-none">
          <span class="text-sm font-bold text-slate-700">Basic Settings</span>
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600 ">
            <img 
              v-svg-inline 
              src="@/assets/icons/form-settings/settings-3-line.svg" 
              alt="Basic Settings" 
              class="h-5 w-5"/>
          </span>
        </div>

        <div class="p-4 space-y-4 bg-white rounded-b-xl">
          <!-- Confirmation Type using RadioTypeSelector -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Confirmation Type</label>
            <RadioTypeSelector
              v-model="submissionSetting.confirmationType"
              :options="confirmationTypeOptions"
              :columns="2"
              name="confirmation-type-selector"
              class="flex-1"
            />
          </div>

          <!-- Message to Show (Quill Rich Text Editor) -->
          <div v-if="submissionSetting.confirmationType === 'same_page'" class="flex flex-col sm:flex-row sm:items-start gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0 pt-1.5">Message to Show</label>
            <div class="flex-1 w-full">
              <div class="quill-editor-wrapper">
                <QuillEditor
                  v-model:content="submissionSetting.messageToShow"
                  contentType="html"
                  theme="snow"
                  placeholder="Enter confirmation message..."
                  :toolbar="editorToolbar"
                />
              </div>
            </div>
          </div>

          <!-- Custom URL using InputField -->
          <div v-if="submissionSetting.confirmationType === 'custom_url'" class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Custom URL</label>
            <InputField
              v-model="submissionSetting.customUrl"
              type="text"
              focusColor="teal"
              placeholder="https://example.com/thank-you"
              class="flex-1"
            />
          </div>

          <!-- After Submission using RadioTypeSelector -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">After Submission</label>
            <RadioTypeSelector
              v-model="submissionSetting.afterSubmission"
              :options="afterSubmissionOptions"
              :columns="2"
              name="after-submission-selector"
              class="flex-1"
            />
          </div>
        </div>
      </div>

      <!-- Notification Settings Card -->
      <div class="border border-slate-200 rounded-xl bg-white relative">
        <div class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-t-xl border-b border-slate-200/60 select-none">
          <span class="text-sm font-bold text-slate-700">Notification Settings</span>
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600">
            <img 
              v-svg-inline 
              src="@/assets/icons/auth/email.svg" 
              alt="Notifications Settings" 
              class="h-5 w-5"/>
          </span>
        </div>

        <div class="p-4 space-y-4 bg-white rounded-b-xl">
          <!-- Save to Database Option Card -->
          <div class="border border-slate-200 rounded-xl bg-white relative">
            <div class="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <span class="text-sm font-semibold text-slate-700">Save to Database</span>
              <CheckboxToggle v-model="submissionSetting.saveToDatabase" />
            </div>
          </div>

          <!-- Send an Email Accordion -->
          <div class="border border-slate-200 rounded-xl bg-white relative">
            <div class="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <span class="text-sm font-semibold text-slate-700">Send an Email</span>
              <CheckboxToggle v-model="submissionSetting.sendEmail" />
            </div>

            <!-- Email Settings Sub-Form -->
            <div v-show="submissionSetting.sendEmail" class="p-4 space-y-4 bg-white rounded-b-xl border-t border-slate-200/60">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Name</label>
                <InputField v-model="submissionSetting.emailSettings.name" focusColor="teal" placeholder="Enter name" class="flex-1" />
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Send to Email</label>
                <InputField v-model="submissionSetting.emailSettings.sendToEmail" type="email" focusColor="teal" placeholder="Enter email" class="flex-1" />
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Subject</label>
                <InputField v-model="submissionSetting.emailSettings.subject" focusColor="teal" placeholder="Enter email subject" class="flex-1" />
              </div>
              
              <!-- Email Body (Quill Rich Text Editor) -->
              <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0 pt-1.5">Email Body</label>
                <div class="flex-1 w-full">
                  <div class="quill-editor-wrapper">
                    <QuillEditor
                      v-model:content="submissionSetting.emailSettings.emailBody"
                      contentType="html"
                      theme="snow"
                      placeholder="Enter email body..."
                      :toolbar="editorToolbar"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">Reply To</label>
                <InputField v-model="submissionSetting.emailSettings.replyTo" type="email" focusColor="teal" placeholder="Enter reply to email" class="flex-1" />
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">BCC</label>
                <InputField v-model="submissionSetting.emailSettings.bcc" focusColor="teal" placeholder="Enter BCC email(s)" class="flex-1" />
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm font-semibold text-gray-700 w-full sm:w-28 sm:flex-shrink-0">CC</label>
                <InputField v-model="submissionSetting.emailSettings.cc" focusColor="teal" placeholder="Enter CC email(s)" class="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Right Panel (Identical Preview to Step 3) -->
    <section class="lg:col-span-6 w-full flex flex-col items-center bg-transparent border-none lg:bg-slate-100/50 lg:border lg:border-slate-200/60 rounded-2xl p-0 lg:p-8 min-h-0 lg:min-h-[400px]">
      <PreviewTemplate>
        <DisplayRulePreview />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
import DisplayRulePreview from "@/views/FormSettingComponents/DisplayRulePreview.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { formSetting } from "@/composable/useFormSettings";
import { useSubmissionSettingStore } from "@/stores/submissionStore";

const submissionSettingStore = useSubmissionSettingStore();
const { submissionSetting } = formSetting();

// Options mapping for RadioTypeSelector
const confirmationTypeOptions = [
  { label: "Same Page", value: "same_page" },
  { label: "Custom URL", value: "custom_url" }
];

const afterSubmissionOptions = [
  { label: "Hide Form", value: "hide_form" },
  { label: "Reset Form", value: "reset_form" }
];

// Rich text editor toolbar configurations
const editorToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote"],
  [{ align: [] }],
  ["link", "image", "code-block"]
];

// Sync local reactive changes into the Pinia store
watch(
  submissionSetting,
  (newVal) => {
    Object.assign(submissionSettingStore.submissionSetting, newVal);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
/* Custom styled styling to match theme & screenshot */
:deep(.quill-editor-wrapper) {
  border: 1px solid #d1d5db; /* Matches border-gray-300 of input */
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}

:deep(.quill-editor-wrapper:focus-within) {
  border-color: transparent !important;
  box-shadow: 0 0 0 2px #14b8a6 !important; /* 2px teal focus outline */
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
  padding: 12px 16px !important;
}

:deep(.ql-editor.ql-blank::before) {
  left: 16px !important;
  font-style: normal;
  color: #94a3b8;
}
</style>