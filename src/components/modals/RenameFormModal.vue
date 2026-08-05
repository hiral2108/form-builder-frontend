<template>
  <ModalComponent
    :isShowModal="isShowModal"
    :closeModal="true"
    headerIcon='<svg width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.43374 9.32167L10.3466 3.40667L9.51859 2.57833L3.6057 8.505V9.32167H4.43374ZM4.9119 10.4883H2.43945V8.015L9.1104 1.34167C9.21925 1.23278 9.35532 1.17833 9.51859 1.17833C9.68187 1.17833 9.81793 1.23278 9.92678 1.34167L11.5829 2.99833C11.6995 3.10722 11.7578 3.24333 11.7578 3.40667C11.7578 3.57 11.6995 3.71 11.5829 3.82667L4.9119 10.4883ZM2.43945 11.655H12.9357V12.8217H2.43945V11.655Z" fill="#2563EB"></path> </svg>'
    headerIconClasses="bg-blue-50 text-blue-600"
    headerIconAlt="Rename Icon"
    headerTitle="Rename Form"
    headerSubTitle="Update your form name"
    :isLoading="isLoading"
    :isShowLoader="true"
    actionButtonTypeOneText="Cancel"
    actionButtonTypeTwoText="Rename Form"
    actionButtonTypeTwoClasses="bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/10 cursor-pointer"
    :backdropClickClose="true"
    @closeModal="closeModalWidget"
    @ButtonOneAction="closeModalWidget"
    @ButtonTwoAction="renameForm"
  >
    <div>
      <InputField
        label="Form Name"
        type="text"
        v-model="renameFormTitle"
        focusColor="blue"
        placeholder="Enter your form name"
        :hasError="$v.renameFormTitle.$dirty && $v.renameFormTitle.$error"
        :validationMessage="$v.renameFormTitle.$errors"
        @input="renameFormTitle = $event"
        @blur="$v.renameFormTitle.$touch()"
      />
      <p class="text-xs! text-slate-400 mt-2! mb-0!">This name will be displayed in your dashboard list</p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'

const props = defineProps({
  isShowModal: Boolean,
  formId: Number,
  formTitle: String
});

const emit = defineEmits(['closeModal', 'confirmRename']);
const isLoading = ref(false)
const renameFormTitle = ref<string>('')
const toast = useToast()

watch(
  () => props.formTitle,
  (val) => {
    if (val !== undefined) {
      renameFormTitle.value = val ?? ''
    }
  }
)

const rules = computed(() => {
  return {
    renameFormTitle: {
      required: helpers.withMessage('Form name is required', required),
      minLength: helpers.withMessage('Please enter a minimum of 3 characters.', minLength(3))
    }
  }
})
const $v = useVuelidate(rules, { renameFormTitle });

const renameForm = async () => {
  $v.value.$touch()
  if ($v.value.$pending || $v.value.$error) {
    return false
  }
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated delay
    toast.success("Form renamed successfully!");
    emit('confirmRename', props.formId, renameFormTitle.value);
    closeModalWidget();
  } catch (error) {
    toast.error("Failed to rename form");
  } finally {
    isLoading.value = false;
  }
}

const closeModalWidget = () => {
  emit('closeModal');
}
</script>