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

export function useFormFieldsBuilder() {
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
        label = "Full Name";
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

  return {
    fieldLibrary,
    FormFieldSettingStore,
    formFieldSetting,
    selectedField,
    selectField,
    removeField,
    addField,
    labelPositionClass,
    duplicateField,
    draggedIndex,
    dragOverIndex,
    isDraggable,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
  };
}
