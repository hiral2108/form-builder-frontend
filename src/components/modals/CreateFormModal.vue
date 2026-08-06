<template>
  <ModalComponent
    :isShowModal="isShowModal"
    :closeModal="true"
    headerIcon='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"></path></svg>'
    headerIconClasses="bg-teal-50 text-teal-600"
    headerIconAlt="Create Icon"
    headerTitle="Create Form"
    headerSubTitle="Add your form name"
    :isLoading="isLoading"
    :isShowLoader="true"
    actionButtonTypeOneText="Cancel"
    actionButtonTypeTwoText="Create Form"
    actionButtonTypeTwoClasses="bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-600/10 cursor-pointer"
    :backdropClickClose="true"
    @closeModal="closeModalWidget"
    @ButtonOneAction="closeModalWidget"
    @ButtonTwoAction="createWidget"
  >
    <div>
      <InputField
        ref="inputRef"
        label="Form Name"
        type="text"
        v-model="formTitle"
        focusColor="teal"
        placeholder="Enter your form name"
        :hasError="$v.formTitle.$dirty && $v.formTitle.$error"
        :validationMessage="$v.formTitle.$errors"
        :value="formTitle"
        @input="formTitle = $event"
        @blur="$v.formTitle.$touch()"
      />
      <p class="text-xs! text-slate-400 mt-2! mb-0!">This name will be displayed in your dashboard</p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'

const props = defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(['closeModal']);
const isLoading = ref(false);
const formTitle = ref("");
const inputRef = ref<any>(null);
const router = useRouter()
const toast = useToast()

const closeModalWidget = () => {
  emit('closeModal');
}

// Reset values and Vuelidate validation state when modal opens
watch(() => props.isShowModal, (newVal) => {
  if (newVal) {
    formTitle.value = "";
    $v.value.$reset();
  }
});

watch(() => props.isShowModal, (newVal) => {
  if (newVal) {
    formTitle.value = "";
    $v.value.$reset();
    
    // Auto-focus when opened
    setTimeout(() => {
      inputRef.value?.focus();
    }, 50);
  }
});

// Configure Vuelidate rules
const rules = computed(() => {
  return {
    formTitle: {
      required: helpers.withMessage('Form name is required', required),
      minLength: helpers.withMessage('Please enter a minimum of 3 characters.', minLength(3))
    }
  }
})
const $v = useVuelidate(rules, { formTitle });

const createWidget = async () => {
  $v.value.$touch()
  if ($v.value.$pending || $v.value.$error) {
    return false
  }

  await submitWidget()
}

const submitWidget = async () => {
  isLoading.value = true;
  try {
    // Simulate UI API load delay for 800ms
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Generate static mock unique ID
    const mockId = Math.random().toString(36).substring(2, 9);
    
    toast.success("Form created successfully!");
    closeModalWidget();
    
    // Redirect to form settings page
    router.push(`/form-settings/${mockId}`);
  } catch (error) {
    toast.error("Failed to create form.");
  } finally {
    isLoading.value = false;
  }
}
</script>