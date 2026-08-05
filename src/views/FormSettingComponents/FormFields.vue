<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <section
      class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:sticky lg:top-[80px] max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      <h3 class="font-semibold text-slate-800 text-md mb-4 tracking-tight">Field Library</h3>
      <div class="grid grid-cols-1 gap-2">
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
      <div class="border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h3 class="font-semibold text-slate-800 text-md">Form Preview</h3>
        <span v-if="formFieldSetting.fields.length > 0" class="text-xs text-slate-400 font-medium"
          >Click on a field to edit it</span
        >
      </div>

      <div class="p-8 overflow-y-auto flex-1 scrollbar-thin">
        <form @submit.prevent class="space-y-5">
          <!-- Empty State (Shows when no fields are left) -->
          <div
            v-if="formFieldSetting.fields.length === 0"
            class="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400 flex flex-col items-center">
           <img v-svg-inline src="@/assets/icons/dashboardpage/add-circle-line.svg" class="w-10 h-10 text-teal-600"/>
            <h4 class="font-semibold text-sm text-slate-700 mb-1">Your Form is Empty</h4>
            <p class="text-xs max-w-[240px]">
              Click on any field in the Field Library on the left to add it to your form.
            </p>
          </div>
          <!-- Dynamic Form Fields Loop -->
          <div
            v-for="field in formFieldSetting.fields"
            :key="field.id"
            @click.stop="selectField(field.id)"
            class="p-4 border rounded-xl relative cursor-pointer transition-all"
            :class="
              formFieldSetting.selectedFieldId === field.id
                ? 'border-teal-500 bg-teal-50/10 ring-2 ring-teal-500/20'
                : 'border-slate-100 hover:border-slate-200'
            ">
            <!-- Delete Button (Top Right) -->
            <div class="absolute right-3 top-3 flex items-center gap-1.5 z-10">
              <button
                @click.stop="removeField(field.id)"
                class="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer">
                <i class="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
            <!-- 1. Text Inputs (Text, Name, Email, Number, Phone, URL, Password) -->
            <div
              class="space-y-1.5"
              v-if="['text', 'name', 'email', 'number', 'phone', 'url', 'password'].includes(field.type)">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input
                disabled
                :type="field.type === 'phone' ? 'tel' : field.type === 'name' ? 'text' : field.type"
                :placeholder="field.placeholder"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400" />
            </div>
            <!-- 2. Textarea -->
            <div class="space-y-1.5" v-else-if="field.type === 'textarea'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <textarea
                disabled
                rows="3"
                :placeholder="field.placeholder"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400"></textarea>
            </div>
            <!-- 3. Dropdown (Select) -->
            <div class="space-y-1.5" v-else-if="field.type === 'dropdown'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  disabled
                  class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 appearance-none">
                  <option value="">{{ field.placeholder || "Select..." }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <i class="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </div>
            <!-- 4. Radio Buttons -->
            <div class="space-y-2" v-else-if="field.type === 'radio'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="flex flex-col gap-2">
                <label
                  v-for="opt in field.options"
                  :key="opt"
                  class="flex items-center gap-2 text-sm text-slate-500 cursor-not-allowed">
                  <input disabled type="radio" :name="field.id" class="text-teal-600 border-slate-300" />
                  {{ opt }}
                </label>
              </div>
            </div>
            <!-- 5. Checkboxes -->
            <div class="space-y-2" v-else-if="field.type === 'checkboxes'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="flex flex-col gap-2">
                <label
                  v-for="opt in field.options"
                  :key="opt"
                  class="flex items-center gap-2 text-sm text-slate-500 cursor-not-allowed">
                  <input disabled type="checkbox" class="rounded text-teal-600 border-slate-300" />
                  {{ opt }}
                </label>
              </div>
            </div>
            <!-- 6. Date Picker -->
            <div class="space-y-1.5" v-else-if="field.type === 'datepicker'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input
                disabled
                type="date"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400" />
            </div>
            <!-- 7. Time Picker -->
            <div class="space-y-1.5" v-else-if="field.type === 'timepicker'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input
                disabled
                type="time"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400" />
            </div>
            <!-- 8. File Upload -->
            <div class="space-y-1.5" v-else-if="field.type === 'fileupload'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div
                class="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50">
                <i class="ri-upload-2-line text-slate-400 text-lg mb-1"></i>
                <span class="text-xs text-slate-500">Click or Drag files to upload</span>
              </div>
            </div>
            <!-- 9. Multiselect -->
            <div class="space-y-1.5" v-else-if="field.type === 'multiselect'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div
                class="flex flex-wrap gap-1.5 p-2 rounded-lg border border-slate-200 bg-slate-50/30 min-h-10 items-center">
                <span
                  v-for="opt in field.options"
                  :key="opt"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100">
                  {{ opt }}
                </span>
              </div>
            </div>
            <!-- 10. Hidden Field -->
            <div
              class="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-100/50 flex items-center justify-between text-slate-500"
              v-else-if="field.type === 'hidden'">
              <div class="flex items-center gap-2">
                <i class="ri-eye-off-line text-sm"></i>
                <span class="text-xs font-semibold uppercase tracking-wider">Hidden Field</span>
              </div>
              <span class="text-xs font-medium">{{ field.label }}</span>
            </div>
          </div>
          <!-- Dummy submit button -->
          <button
            disabled
            type="button"
            v-if="formFieldSetting.fields.length > 0"
            class="w-full py-3 bg-teal-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center">
            Submit
          </button>
        </form>
      </div>
    </section>

    <!-- <section class="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <h3 class="font-semibold text-slate-800 text-sm mb-4 tracking-tight">Field Settings</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Field Label</label>
          <input type="text" value="Text Input" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Placeholder</label>
          <input type="text" value="Enter text" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Required Field</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" />
            <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <button class="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg text-xs transition-colors mt-6">
          Delete Field
        </button>
      </div>
    </section> -->
  </div>
</template>

<script setup lang="ts">
  import { watch, computed } from "vue";

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

  const selectField = (id: string) => {
    formFieldSetting.value.selectedFieldId = id;
  };

  const removeField = (id: string) => {
    formFieldSetting.value.fields = formFieldSetting.value.fields.filter((f) => f.id !== id);
    if (formFieldSetting.value.selectedFieldId === id) {
      formFieldSetting.value.selectedFieldId =
        formFieldSetting.value.fields.length > 0 ? formFieldSetting.value.fields[0].id : null;
    }
  };
  // Action to update properties dynamically
  const updateField = (id: string, updates: Partial<FormFieldType>) => {
    const idx = formFieldSetting.value.fields.findIndex((f) => f.id === id);
    if (idx !== -1) {
      formFieldSetting.value.fields[idx] = {
        ...formFieldSetting.value.fields[idx],
        ...updates,
      };
    }
  };

  const addField = (type: string) => {
    const id = Date.now().toString();
    let label = "";
    let placeholder = "";
    let options: string[] | undefined = undefined;
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
        placeholder = "Select Date";
        break;
      case "timepicker":
        label = "Time Picker";
        placeholder = "Select Time";
        break;
      case "fileupload":
        label = "File Upload";
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
    };
    formFieldSetting.value.fields.push(newField);
    formFieldSetting.value.selectedFieldId = id; // Set active selection
  };

  watch(
    formFieldSetting,
    (newVal) => {
      Object.assign(FormFieldSettingStore.formFieldSetting, newVal);
    },
    { deep: true, immediate: true }
  );
</script>
