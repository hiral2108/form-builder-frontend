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
import { useFormStyle } from "@/composable/useFormStyle";

export function useFormFieldsBuilder() {
  const FormFieldSettingStore = useFormFieldSettingStore();
  const { formFieldSetting, formStyleSetting } = formSetting();
  const { cssVars } = useFormStyle();

  const isAdvanceSettingsOpen = ref(false);

  const fieldLibrary = [
    { type: "text", label: "Text Input", icon: TextIcon },
    { type: "name", label: "Name", icon: NameIcon },
    { type: "email", label: "Email", icon: EmailIcon },
    { type: "number", label: "Number", icon: NumberIcon },
    { type: "phone", label: "Phone Number", icon: PhoneIcon },
    { type: "textarea", label: "Textarea", icon: TextAreaIcon },
    { type: "dropdown", label: "Dropdown", icon: DropDownIcon },
    { type: "radio", label: "Radio Button", icon: RadionButtonIcon },
    { type: "checkboxes", label: "Checkbox", icon: CheckBoxIcon },
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

  const toggleAdvanceSettings = () => {
    isAdvanceSettingsOpen.value = !isAdvanceSettingsOpen.value;
  };

  const removeField = (id: string) => {
    formFieldSetting.value.fields = formFieldSetting.value.fields.filter((f) => f.id !== id);
    if (formFieldSetting.value.selectedFieldId === id) {
      formFieldSetting.value.selectedFieldId = null;
    }
  };

  const isDeleteModalOpen = ref(false);
  const fieldToDeleteId = ref<string | null>(null);
  const fieldToDeleteLabel = ref("");

  const triggerDeleteConfirm = (id: string, label: string) => {
    fieldToDeleteId.value = id;
    fieldToDeleteLabel.value = label;
    isDeleteModalOpen.value = true;
  };

  const confirmDelete = () => {
    if (fieldToDeleteId.value) {
      removeField(fieldToDeleteId.value);
    }
    isDeleteModalOpen.value = false;
    fieldToDeleteId.value = null;
  };

  const addField = (type: string) => {
    const id = Date.now().toString();
    let label = "";
    let placeholder = "";
    let options: string[] | undefined = undefined;

    let labelPlacement = "left";
    let nameFormat: "single" | "split" | undefined = undefined;
    let firstNameLabel: string | undefined = undefined;
    let firstNamePlaceholder: string | undefined = undefined;
    let lastNameLabel: string | undefined = undefined;
    let lastNamePlaceholder: string | undefined = undefined;
    let requiredMessage = "This field is required";
    let rows: number | undefined = undefined;
    let validateEmail: number | undefined = undefined;
    let emailErrorMessage: string | undefined = undefined;
    let uniqueEmail: number | undefined = undefined;
    let uniqueEmailErrorMessage: string | undefined = undefined;
    let timeFormat: "12h" | "24h" | undefined = undefined;
    let showPasswordIcon: number | undefined = undefined;

    if (type === "textarea") {
      rows = 3;
    } else if (type === "email") {
      validateEmail = 0;
      emailErrorMessage = "This field must contain a valid email";
      uniqueEmail = 0;
      uniqueEmailErrorMessage = "This email address is already registered";
    } else if (type === "name") {
      nameFormat = "single";
      firstNameLabel = "First Name";
      firstNamePlaceholder = "Enter first name";
      lastNameLabel = "Last Name";
      lastNamePlaceholder = "Enter last name";
    } else if (type === "timepicker") {
      timeFormat = "12h";
    } else if (type === "password") {
      showPasswordIcon = 0;
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
      required: 0,
      options,
      labelPlacement: labelPlacement as any,
      nameFormat,
      firstNameLabel,
      firstNamePlaceholder,
      lastNameLabel,
      lastNamePlaceholder,
      requiredMessage,
      rows,
      validateEmail,
      emailErrorMessage,
      uniqueEmail,
      uniqueEmailErrorMessage,
      timeFormat,
      showPasswordIcon,
    };
    formFieldSetting.value.fields.push(newField);
  };

  const labelPositionClass = (placement?: string) => {
    switch (placement) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
    }
  };

  const duplicateField = (id: string) => {
    const index = formFieldSetting.value.fields.findIndex((f) => f.id === id);
    if (index !== -1) {
      const fieldToCopy = formFieldSetting.value.fields[index];

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

  const addOption = (field: FormFieldType | null) => {
    if (!field) return;
    if (!field.options) field.options = [];
    let maxNum = 0;
    field.options.forEach((opt) => {
      const match = opt.match(/Option\s+(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });
    const nextNum = maxNum > 0 ? maxNum + 1 : field.options.length + 1;
    field.options.push(`Option ${nextNum}`);
  };

  const updateOption = (field: FormFieldType | null, index: number, value: string) => {
    if (!field || !field.options) return;
    const updated = [...field.options];
    updated[index] = value;
    field.options = updated;
  };

  const removeOption = (field: FormFieldType | null, index: number) => {
    if (!field || !field.options) return;
    const updated = [...field.options];
    updated.splice(index, 1);
    field.options = updated;
  };

  const typeableFieldTypes = ["text", "name", "email", "number", "phone", "url", "password", "textarea"];

  const canHaveDefaultValue = (field: FormFieldType | null) => {
    if (!field) return false;
    return typeableFieldTypes.includes(field.type) || field.type === "hidden";
  };

  const canHaveMaxLength = (field: FormFieldType | null) => {
    if (!field) return false;
    return typeableFieldTypes.includes(field.type);
  };

  //------------------------------------------------------drag & drop for fields----------------------
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

  //-------------------------------------------------- drag & drop for options ----------------------------------

  const draggedOptionIndex = ref<number | null>(null);
  const dragOverOptionIndex = ref<number | null>(null);
  const isOptionDraggable = ref(false);

  const onOptionDragStart = (index: number, event: DragEvent) => {
    draggedOptionIndex.value = index;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", index.toString());
    }
  };

  const onOptionDragOver = (index: number, event: DragEvent) => {
    event.preventDefault();
    if (draggedOptionIndex.value !== null && draggedOptionIndex.value !== index) {
      dragOverOptionIndex.value = index;
    }
  };

  const onOptionDragLeave = () => {
    dragOverOptionIndex.value = null;
  };

  const onOptionDrop = (field: FormFieldType | null, targetIndex: number) => {
    dragOverOptionIndex.value = null;
    isOptionDraggable.value = false;
    if (!field || !field.options) return;

    if (draggedOptionIndex.value !== null && draggedOptionIndex.value !== targetIndex) {
      const options = [...field.options];
      const draggedOption = options[draggedOptionIndex.value];

      options.splice(draggedOptionIndex.value, 1);
      options.splice(targetIndex, 0, draggedOption);

      field.options = options;
    }
    draggedOptionIndex.value = null;
  };

  const onOptionDragEnd = () => {
    draggedOptionIndex.value = null;
    dragOverOptionIndex.value = null;
    isOptionDraggable.value = false;
  };

  //-----------------------------------------------------------------------------style-------------------------------------------------

  // Dynamic classes for the Submit Button container (alignment & selection styling)
  const submitButtonContainerClass = computed(() => {
    const isSelected = formFieldSetting.value.selectedFieldId === "submit-button";
    const placement = formFieldSetting.value.submitButtonPlacement || "center";

    const baseClasses = "p-1.5 rounded-2xl border border-dashed transition-all duration-200 cursor-pointer flex";

    const selectionClass = isSelected
      ? "border-teal-600 bg-slate-50 shadow-sm"
      : "border-transparent hover:border-teal-500 hover:bg-teal-100/5";

    const alignmentClass =
      placement === "left" ? "justify-start" : placement === "right" ? "justify-end" : "justify-center";

    return `${baseClasses} ${selectionClass} ${alignmentClass}`;
  });

  // Dynamic classes for the Submit Button itself (sizes)
  const submitButtonClass = computed(() => {
    const size = formFieldSetting.value.submitButtonSize || "lg";
    const baseClasses =
      "bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl flex items-center justify-center shadow-lg shadow-teal-100/30 pointer-events-none transition-all";

    if (size === "sm") {
      return `${baseClasses} px-10 py-2.5 text-sm`;
    }
    if (size === "md") {
      return `${baseClasses} w-1/2 py-3 text-sm`;
    }
    return `${baseClasses} w-full py-3 text-sm`;
  });

  const labelStyleObject = computed(() => {
    const style = formStyleSetting.value.labelStyle;
    return {
      display: style.showLabel === "hide" ? "none" : "",
    };
  });

  watch(
    formFieldSetting,
    (newVal) => {
      Object.assign(FormFieldSettingStore.formFieldSetting, newVal);
    },
    { deep: true, immediate: true }
  );

  watch(selectedField, () => {
    isAdvanceSettingsOpen.value = false;
  });

  return {
    fieldLibrary,
    FormFieldSettingStore,
    formFieldSetting,
    selectedField,
    selectField,
    isDeleteModalOpen,
    fieldToDeleteLabel,
    triggerDeleteConfirm,
    confirmDelete,
    addField,
    labelPositionClass,
    duplicateField,
    addOption,
    updateOption,
    removeOption,
    draggedIndex,
    dragOverIndex,
    isDraggable,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    draggedOptionIndex,
    dragOverOptionIndex,
    isOptionDraggable,
    onOptionDragStart,
    onOptionDragOver,
    onOptionDragLeave,
    onOptionDrop,
    onOptionDragEnd,
    submitButtonContainerClass,
    submitButtonClass,
    isAdvanceSettingsOpen,
    toggleAdvanceSettings,
    canHaveDefaultValue,
    canHaveMaxLength,
    labelStyleObject,
    cssVars,
  };
}
