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
                ? 'border-l-[3px] border-teal-700 border-t-slate-200 border-r-slate-200 border-b-slate-200 bg-slate-50 shadow-sm rounded-l-none'
                : 'border-slate-100 hover:border-slate-200 hover:bg-teal-100/10',
              
              /* Indicator line for the landing spot */
              dragOverIndex === index ? 'border-t-2 border-t-teal-600 scale-[0.98]' : '',
              
              /* Makes the card you are dragging look like a darker, semi-transparent dashed placeholder */
              draggedIndex === index ? 'bg-slate-100 opacity-40 border-dashed border-slate-300' : ''
            ]"
          >
            <div
              v-if="formFieldSetting.selectedFieldId === field.id"
              class="flex items-center justify-end gap-1.5 mb-1">
             <button
                type="button"
                @mousedown="isDraggable = true; selectField(field.id)" 
                @mouseup="isDraggable = false"
                @mouseleave="isDraggable = false"
                class="drag-handle w-7 h-7 rounded bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors text-amber-400 cursor-move"
                title="Drag to reorder"
              >
                <img 
                  v-svg-inline 
                  src="@/assets/icons/form-settings/drag-drop.svg" 
                  class="w-4 h-4 text-teal-600 pointer-events-none" 
                  draggable="false" 
                />
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
                :rows="3"
                textareaClass="h-auto"
                class="pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="['dropdown', 'multiselect'].includes(field.type)">
              <label class="block text-sm font-semibold text-gray-700 pointer-events-none select-none">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <SelectField
                :modelValue="field.placeholder || (field.type === 'multiselect' ? 'Select options...' : 'Select...')"
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
              <input
                disabled
                type="date"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'timepicker'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input
                disabled
                type="time"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50/30 text-slate-400 pointer-events-none" />
            </div>

            <div class="space-y-1.5" v-else-if="field.type === 'fileupload'">
              <label class="block text-sm font-semibold text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div
                class="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50">
                <img v-svg-inline src="@/assets/icons/FormFields/Upload.svg" class="w-4 h-4 text-slate-600" />
                <span class="text-xs text-slate-500">Click or Drag files to upload</span>
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
  import { ref, watch } from "vue";

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
  };

  const duplicateField = (id: string) => {
    const index = formFieldSetting.value.fields.findIndex((f) => f.id === id);
    if (index !== -1) {
      const fieldToCopy = formFieldSetting.value.fields[index];
      const newField: FormFieldType = {
        ...structuredClone(fieldToCopy),
        id: Date.now().toString(), 
        label: `${fieldToCopy.label} (Copy)`,
      };

      formFieldSetting.value.fields.splice(index + 1, 0, newField);
      formFieldSetting.value.selectedFieldId = newField.id; 
    }
  };

     // Changed draggedIndex to a reactive ref
  const draggedIndex = ref<number | null>(null); 
  const dragOverIndex = ref<number | null>(null);
  const isDraggable = ref(false); // Controls when the card is allowed to be dragged
  
    const onDragStart = (index: number, event: DragEvent) => {
    draggedIndex.value = index;
    
    const cardElement = event.currentTarget as HTMLElement;
    if (cardElement) {
      // 1. Temporarily add the visible style class before the browser takes the drag snapshot
      cardElement.classList.add('drag-snapshot-dark');
      
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", index.toString());
        
        const rect = cardElement.getBoundingClientRect();
        event.dataTransfer.setDragImage(cardElement, rect.width / 2, rect.height / 2);
      }
      
      // 2. Remove the class in the next event loop tick so the card instantly returns to normal on the screen
      setTimeout(() => {
        cardElement.classList.remove('drag-snapshot-dark');
      }, 0);
    }
  };

 const onDragOver = (index: number, event: DragEvent) => {
    event.preventDefault();
    if (draggedIndex.value !== null && draggedIndex.value !== index) { // Changed to single .value
      dragOverIndex.value = index; 
    }
  };

  const onDragLeave = () => {
    dragOverIndex.value = null;
  };

     const onDrop = (targetIndex: number) => {
    dragOverIndex.value = null;
    isDraggable.value = false; // Reset drag state
    
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
    isDraggable.value = false; // Reset drag state
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
/* Custom styling captured in the browser drag snapshot to make it highly visible */
.drag-snapshot-dark {
  background-color: #f1f5f9 !important; /* Solid light-grey card background */
  color: #0f172a !important;             /* Dark text color */
  border-color: #475569 !important;      /* Darker slate border */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important; /* Prominent shadow */
}

/* Make inputs inside the dragged card solid and visible */
.drag-snapshot-dark input,
.drag-snapshot-dark textarea,
.drag-snapshot-dark select {
  background-color: #e2e8f0 !important; /* Solid background for inputs */
  color: #0f172a !important;             /* Dark text inside inputs */
  border-color: #cbd5e1 !important;
}

/* Force placeholders inside the dragged card to be dark and readable */
.drag-snapshot-dark input::placeholder,
.drag-snapshot-dark textarea::placeholder {
  color: #334155 !important;            /* Dark grey placeholder text */
  opacity: 1 !important;
}
</style>