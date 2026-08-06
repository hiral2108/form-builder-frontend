<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <section
      class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm lg:sticky lg:top-[80px] max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 data-v-971cfb3b="" class="font-semibold text-slate-800 text-md">Field Library</h3>
      </div>
      <div class="grid grid-cols-1 gap-2 p-5">
        <button
          v-for="item in fieldLibrary"
          :key="item.type"
          @click="addField(item.type)"
          class="w-full flex items-center gap-3 px-4 py-3 border border-slate-100 hover:ring-2 hover:ring-teal-500 hover:bg-teal-50/10 rounded-xl text-left text-sm text-slate-700 font-medium transition-all cursor-pointer group">
          <div
            class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-teal-100/60 flex items-center justify-center text-slate-500 group-hover:text-teal-700 transition-colors">
            <img
              v-svg-inline
              :src="item.icon"
              :alt="item.label"
              class="w-4 h-4 text-slate-500 group-hover:text-teal-600 transition-colors fill-current" />
          </div>
          {{ item.label }}
        </button>
      </div>
    </section>

    <section
      class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Form Preview</h3>
        <span v-if="formFieldSetting.fields.length > 0" class="text-xs text-slate-400 font-medium"
          >Click on a field to edit it</span
        >
      </div>

      <div class="p-5 overflow-y-auto flex-1 scrollbar-thin">
        <form @submit.prevent class="space-y-5">
          <div
            v-if="formFieldSetting.fields.length === 0"
            class="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400 flex flex-col items-center">
            <img v-svg-inline src="@/assets/icons/dashboardpage/add-circle-line.svg" class="w-10 h-10 text-teal-600" />
            <h4 class="font-semibold text-sm text-slate-700 mb-1">Your Form is Empty</h4>
            <p class="text-xs max-w-[240px]">
              Click on any field in the Field Library on the left to add it to your form.
            </p>
          </div>
          <div
            v-for="(field, index) in formFieldSetting.fields"
            :key="field.id"
            @click.stop="selectField(field.id)"
            draggable="true"
            @dragstart="onDragStart(index, $event)"
            @dragover="onDragOver(index, $event)"
            @dragleave="onDragLeave"
            @drop="onDrop(index)"
            @dragend="onDragEnd"
            class="p-4 border rounded-xl relative cursor-pointer transition-all duration-200"
            :class="[
              formFieldSetting.selectedFieldId === field.id
                ? 'border-l-[3px] border-teal-600 border-t-slate-200 border-r-slate-200 border-b-slate-200 bg-slate-50 shadow-sm rounded-l-none'
                : 'border-slate-100 hover:border-slate-200 hover:bg-teal-100/10',
              dragOverIndex === index ? 'border-t-2 border-t-teal-600 scale-[0.98]' : '',
              draggedIndex === index
                ? 'bg-teal-50/40 opacity-75 border-2 border-dashed border-teal-500 shadow-inner'
                : '',
            ]">
            <div
              v-if="formFieldSetting.selectedFieldId === field.id"
              class="flex items-center justify-end gap-1.5 mb-1">
              <button
                type="button"
                @mousedown="
                  isDraggable = true;
                  selectField(field.id);
                "
                @mouseup="isDraggable = false"
                @mouseleave="isDraggable = false"
                class="drag-handle w-7 h-7 rounded bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors text-amber-400"
                :class="isDraggable ? 'cursor-grabbing' : 'cursor-grab'"
                title="Drag to reorder">
                <img
                  v-svg-inline
                  src="@/assets/icons/form-settings/drag-drop.svg"
                  class="w-4 h-4 text-teal-600 pointer-events-none"
                  draggable="false" />
              </button>

              <button
                type="button"
                @click.stop="duplicateField(field.id)"
                class="w-7 h-7 rounded bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors text-blue-400 cursor-pointer"
                title="Duplicate Field">
                <img v-svg-inline src="@/assets/icons/form-list/clone.svg" class="w-4! h-4!" />
              </button>

              <button
                type="button"
                @click.stop="removeField(field.id)"
                class="w-7 h-7 rounded bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors text-red-500 hover:text-red-400 cursor-pointer"
                title="Delete Field">
                <img v-svg-inline src="@/assets/icons/form-list/delete.svg" class="w-4 h-4" />
              </button>
            </div>

            <div
              class="space-y-1.5"
              v-if="['text', 'name', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)">
              <InputField
                disable
                :required="field.required"
                :label="field.label"
                :type="field.type === 'name' ? 'text' : field.type"
                :placeholder="field.placeholder"
                class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'textarea'">
              <TextareaField
                :required="field.required"
                :label="field.label"
                :placeholder="field.placeholder"
                :rows="field.rows"
                textareaClass="h-auto"
                class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="['dropdown', 'multiselect'].includes(field.type)">
              <label class="block text-sm font-semibold text-gray-700 pointer-events-none select-none">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <SelectField
                :modelValue="field.placeholder || ' '"
                :options="{ [field.placeholder || ' ']: field.placeholder || ' ' }"
                class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'radio'">
              <label class="block text-sm font-semibold text-slate-700 pointer-events-none select-none">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="flex flex-col gap-1">
                <CustomDefaultRadio
                  v-for="(opt, idx) in field.options"
                  :key="opt"
                  :id="field.id + '-' + idx"
                  :name="field.id"
                  :value="opt"
                  :label="opt"
                  :modelValue="null"
                  class="pointer-events-none" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'checkboxes'">
              <label class="block text-sm font-semibold text-slate-700 pointer-events-none select-none">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>

              <div class="flex flex-col gap-1 px-3">
                <CustomDefaultCheckbox
                  v-for="opt in field.options"
                  :key="opt"
                  :label="opt"
                  :modelValue="false"
                  class="pointer-events-none"
                  size="sm"
                  labelClass="text-sm text-gray-700 py-0.5" />
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'datepicker'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="relative w-full">
                <input
                  disabled
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10">
                  {{ field.placeholder }}
                </span>
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'timepicker'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="relative w-full">
                <input
                  disabled
                  type="time"
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 bg-transparent pointer-events-none pr-10">
                  {{ field.placeholder || "Select Time" }}
                </span>
              </div>
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'fileupload'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div
                class="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50">
                <img v-svg-inline src="@/assets/icons/FormFields/Upload.svg" class="w-4 h-4 text-slate-600" />
                <span class="text-xs text-slate-500">{{ field.placeholder }}</span>
              </div>
            </div>

            <div
              class="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-100/50 flex items-center justify-between text-slate-500"
              v-else-if="field.type === 'hidden'">
              <div class="flex items-center gap-2">
                <img v-svg-inline src="@/assets/icons/FormFields/EyesOff.svg" class="w-4 h-4 text-slate-600" />
                <span class="text-xs font-semibold uppercase tracking-wider">Hidden Field</span>
              </div>
              <span class="text-xs font-medium">{{ field.label }}</span>
            </div>
          </div>

          <button
            disabled
            type="button"
            v-if="formFieldSetting.fields.length > 0"
            class="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center shadow-lg shadow-teal-100/30 hover:shadow-xl hover:shadow-teal-200/20">
            Submit
          </button>
        </form>
      </div>
    </section>

    <section
      class="settings-panel lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden lg:sticky lg:top-[80px] max-h-[calc(100vh-160px)]">
      <div class="border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Field Settings</h3>
      </div>

      <div class="px-5 overflow-y-auto flex-1 scrollbar-thin">
        <div v-if="selectedField" class="space-y-4 mt-5">
          <div>
            <InputField type="text" v-model="selectedField.label" label="Field Label" focusColor="teal" />
          </div>
          <div v-if="!['hidden', 'checkboxes', 'radio'].includes(selectedField.type)">
            <InputField type="text" v-model="selectedField.placeholder" label="Placeholder" focusColor="teal" />
          </div>
          <div v-if="selectedField.type === 'textarea'">
            <InputField type="number" v-model.number="selectedField.rows" label="Rows" focusColor="teal" :min="1" />
          </div>

          <div>
            <RadioTypeSelector
              v-model="selectedField.labelPlacement"
              label="Label Placement"
              name="labelPlacement"
              :columns="3"
              :options="[
                { label: 'Right', value: 'right' },
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ]" />
          </div>

          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Required</label>
            <div class="flex">
              <CustomDefaultRadio
                id="required-yes"
                name="required"
                :value="true"
                label="Yes"
                v-model="selectedField.required" />
              <CustomDefaultRadio
                id="required-no"
                name="required"
                :value="false"
                label="No"
                v-model="selectedField.required" />
            </div>
          </div>

          <div v-if="selectedField.required">
            <InputField
              type="text"
              v-model="selectedField.requiredMessage"
              label="Required message"
              focusColor="teal" />
          </div>

          <template v-if="selectedField.type === 'email'">
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Validate Email</label>
              <div class="flex">
                <CustomDefaultRadio
                  id="validate-email-yes"
                  name="validateEmail"
                  :value="true"
                  label="Yes"
                  v-model="selectedField.validateEmail"
                />
                <CustomDefaultRadio
                  id="validate-email-no"
                  name="validateEmail"
                  :value="false"
                  label="No"
                  v-model="selectedField.validateEmail"
                />
              </div>
            </div>

            <!-- Email Validation Error Message -->
            <div v-if="selectedField.validateEmail">
              <InputField 
                type="text" 
                v-model="selectedField.emailErrorMessage" 
                label="Error message"
                focusColor="teal"
              />
            </div>
          </template>

          <!-- Validation Settings for Phone Number -->
          <template v-if="selectedField.type === 'phone'">
            <div class="space-y-1.5 border-t border-slate-100 pt-3">
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Validate Phone Number</label
              >
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    :value="true"
                    v-model="selectedField.validatePhone"
                    class="w-4 h-4 accent-teal-600 focus:ring-teal-500" />
                  Yes
                </label>
                <label class="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    :value="false"
                    v-model="selectedField.validatePhone"
                    class="w-4 h-4 accent-teal-600 focus:ring-teal-500" />
                  No
                </label>
              </div>
            </div>

            <!-- Phone Validation Error Message -->
            <div v-if="selectedField.validatePhone">
              <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider"
                >Error message</label
              >
              <input
                type="text"
                v-model="selectedField.phoneErrorMessage"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors" />
            </div>
          </template>
        </div>

        <div v-else class="flex flex-col items-center justify-center text-center py-16">
          <div class="w-14 h-14 rounded-full bg-slate-100/80 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 text-slate-500">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3.5l7.5 4.3v8.6L12 20.7l-7.5-4.3V7.8L12 3.5z" />
              <circle cx="12" cy="12" r="2.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p class="text-sm text-slate-500 font-medium max-w-[240px] leading-relaxed">
            Select a field to configure its settings
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from "vue";

  import TextIcon from "@/assets/icons/FormFields/TextIcon.svg";
  import NameIcon from "@/assets/icons/auth/username.svg";
  import EmailIcon from "@/assets/icons/auth/email.svg";
  import NumberIcon from "@/assets/icons/FormFields/hashTag.svg";
  import PhoneIcon from "@/assets/icons/FormFields/PhoneIcon.svg";
  import TextAreaIcon from "@/assets/icons/FormFields/TextBlock.svg";
  import DropDownIcon from "@/assets/icons/form-settings/arrow-down-s-line.svg";
  import RadionButtonIcon from "@/assets/icons/FormFields/RadioButton.svg";
  import CheckBoxIcon from "@/assets/icons/FormFields/CheckBox.svg";
  import DatePickerIcon from "@/assets/icons/FormFields/Calender.svg";
  import TimePickerIcon from "@/assets/icons/FormFields/Timer.svg";
  import FileUploadIcon from "@/assets/icons/FormFields/Upload.svg";
  import UrlIcon from "@/assets/icons/FormFields/link.svg";
  import PasswordIcon from "@/assets/icons/auth/password.svg";
  import MultiSelectIcon from "@/assets/icons/FormFields/MultiSelect.svg";
  import HiddenIcon from "@/assets/icons/FormFields/EyesOff.svg";

  import { formSetting } from "@/composable/useFormSettings";
  import { useFormFieldSettingStore, type FormFieldType } from "@/stores/formFieldStore";

  const FormFieldSettingStore = useFormFieldSettingStore();
  const { formFieldSetting } = formSetting();

  const fieldLibrary = [
    { type: "text", label: "Text Input", icon: TextIcon },
    { type: "name", label: "Name", icon: NameIcon },
    { type: "email", label: "Email", icon: EmailIcon },
    { type: "number", label: "Number", icon: NumberIcon },
    { type: "phone", label: "Phone Number", icon: PhoneIcon },
    { type: "textarea", label: "Textarea", icon: TextAreaIcon },
    { type: "dropdown", label: "Dropdown", icon: DropDownIcon },
    { type: "radio", label: "Radio Buttons", icon: RadionButtonIcon },
    { type: "checkboxes", label: "Checkboxes", icon: CheckBoxIcon },
    { type: "datepicker", label: "Date Picker", icon: DatePickerIcon },
    { type: "timepicker", label: "Time Picker", icon: TimePickerIcon },
    { type: "fileupload", label: "File Upload", icon: FileUploadIcon },
    { type: "url", label: "URL", icon: UrlIcon },
    { type: "password", label: "Password", icon: PasswordIcon },
    { type: "multiselect", label: "Multiselect", icon: MultiSelectIcon },
    { type: "hidden", label: "Hidden Field", icon: HiddenIcon },
  ];

  const selectedField = computed(() => {
    return formFieldSetting.value.fields.find((f) => f.id === formFieldSetting.value.selectedFieldId) || null;
  });

  const selectField = (id: string | null) => {
    formFieldSetting.value.selectedFieldId = id;
  };

  const removeField = (id: string) => {
    formFieldSetting.value.fields = formFieldSetting.value.fields.filter((f) => f.id !== id);
    if (formFieldSetting.value.selectedFieldId === id) {
      formFieldSetting.value.selectedFieldId = null;
    }
  };

  const addField = (type: string) => {
    const id = Date.now().toString();
    let label = "";
    let placeholder = "";
    let options: string[] | undefined = undefined;

    // Define field default settings
    let labelPlacement = "default";
    let requiredMessage = "This field is required";
    let rows: number | undefined = undefined;
    let validateEmail: number | undefined = undefined;
    let emailErrorMessage: string | undefined = undefined;
    let validatePhone: number | undefined = undefined;
    let phoneErrorMessage: string | undefined = undefined;

    if (type === "textarea") {
      rows = 3;
    } else if (type === "email") {
      validateEmail = 1;
      emailErrorMessage = "This field must contain a valid email";
    } else if (type === "phone") {
      validatePhone = 1;
      phoneErrorMessage = "This field must contain a valid phone number";
    }

    switch (type) {
      case "text":
        label = "Text Input";
        placeholder = "Enter text";
        break;
      case "name":
        label = "Name";
        placeholder = "Enter full name";
        break;
      case "email":
        label = "Email";
        placeholder = "Email Address";
        break;
      case "number":
        label = "Number";
        placeholder = "Enter number";
        break;
      case "phone":
        label = "Phone Number";
        placeholder = "Enter phone number";
        break;
      case "textarea":
        label = "Textarea";
        placeholder = "Enter text...";
        break;
      case "dropdown":
        label = "Dropdown Options";
        placeholder = "Select option";
        options = ["Option 1", "Option 2", "Option 3"];
        break;
      case "radio":
        label = "Radio Selection";
        options = ["Option 1", "Option 2"];
        break;
      case "checkboxes":
        label = "Checkboxes";
        options = ["Option 1", "Option 2"];
        break;
      case "datepicker":
        label = "Date Picker";
        placeholder = "dd-mm-yyyy";
        break;
      case "timepicker":
        label = "Time Picker";
        placeholder = "Select Time";
        break;
      case "fileupload":
        label = "File Upload";
        placeholder = "Click or Drag files to upload";
        break;
      case "url":
        label = "URL";
        placeholder = "https://example.com";
        break;
      case "password":
        label = "Password";
        placeholder = "Enter password";
        break;
      case "multiselect":
        label = "Multiselect Options";
        placeholder = "Select options...";
        options = ["Option A", "Option B", "Option C"];
        break;
      case "hidden":
        label = "Hidden Field";
        break;
      default:
        label = "New Field";
    }

    const newField: FormFieldType = {
      id,
      type,
      label,
      placeholder,
      required: false,
      options,
      labelPlacement: labelPlacement as any,
      requiredMessage,
      rows,
      validateEmail,
      emailErrorMessage,
      validatePhone,
      phoneErrorMessage,
    };
    formFieldSetting.value.fields.push(newField);
  };

  const duplicateField = (id: string) => {
    const index = formFieldSetting.value.fields.findIndex((f) => f.id === id);
    if (index !== -1) {
      const fieldToCopy = formFieldSetting.value.fields[index];

      // Safely clone the reactive proxy object using JSON
      const copiedField = JSON.parse(JSON.stringify(fieldToCopy));

      const newField: FormFieldType = {
        ...copiedField,
        id: Date.now().toString(),
        label: `${copiedField.label} (Copy)`,
      };

      formFieldSetting.value.fields.splice(index + 1, 0, newField);
      formFieldSetting.value.selectedFieldId = newField.id;
    }
  };

  const draggedIndex = ref<number | null>(null);
  const dragOverIndex = ref<number | null>(null);
  const isDraggable = ref(false);

  const onDragStart = (index: number, event: DragEvent) => {
    draggedIndex.value = index;

    const cardElement = event.currentTarget as HTMLElement;
    if (cardElement) {
      cardElement.classList.add("drag-snapshot-dark");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", index.toString());

        const rect = cardElement.getBoundingClientRect();
        const xOffset = event.clientX - rect.left;
        const yOffset = event.clientY - rect.top;
        event.dataTransfer.setDragImage(cardElement, xOffset, yOffset);
      }

      setTimeout(() => {
        cardElement.classList.remove("drag-snapshot-dark");
      }, 0);
    }
  };

  const onDragOver = (index: number, event: DragEvent) => {
    event.preventDefault();
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
      dragOverIndex.value = index;
    }
  };

  const onDragLeave = () => {
    dragOverIndex.value = null;
  };

  const onDrop = (targetIndex: number) => {
    dragOverIndex.value = null;
    isDraggable.value = false;

    if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
      const fields = [...formFieldSetting.value.fields];
      const draggedField = fields[draggedIndex.value];

      fields.splice(draggedIndex.value, 1);
      fields.splice(targetIndex, 0, draggedField);

      formFieldSetting.value.fields = fields;
    }
    draggedIndex.value = null;
  };

  const onDragEnd = () => {
    draggedIndex.value = null;
    dragOverIndex.value = null;
    isDraggable.value = false;
  };

  watch(
    formFieldSetting,
    (newVal) => {
      Object.assign(FormFieldSettingStore.formFieldSetting, newVal);
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped>
  .drag-snapshot-dark {
    background-color: #f1f5f9 !important;
    color: #0f172a !important;
    border-color: #475569 !important;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  }

  .drag-snapshot-dark input,
  .drag-snapshot-dark textarea,
  .drag-snapshot-dark select {
    background-color: #e2e8f0 !important;
    color: #0f172a !important;
    border-color: #cbd5e1 !important;
  }

  .drag-snapshot-dark input::placeholder,
  .drag-snapshot-dark textarea::placeholder {
    color: #334155 !important;
    opacity: 1 !important;
  }

  input[type="date"]::-webkit-datetime-edit,
  input[type="time"]::-webkit-datetime-edit {
    color: transparent !important;
  }

  .settings-panel :deep(.discount-type-radio-toggle label) {
    padding-left: 0 !important;
  }
</style>
