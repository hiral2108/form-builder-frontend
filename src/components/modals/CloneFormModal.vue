<template>
  <ModalComponent
    :isShowModal="isShowModal"
    :closeModal="true"
    headerIcon='<svg width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.77977 3.5V1.75C4.77977 1.58667 4.83613 1.44861 4.94887 1.33583C5.06161 1.22305 5.19962 1.16667 5.36289 1.16667H12.3604C12.5237 1.16667 12.6617 1.22305 12.7744 1.33583C12.8871 1.44861 12.9435 1.58667 12.9435 1.75V9.91667C12.9435 10.08 12.8871 10.2181 12.7744 10.3308C12.6617 10.4436 12.5237 10.5 12.3604 10.5H10.611V12.25C10.611 12.4133 10.5546 12.5514 10.4419 12.6642C10.3292 12.7769 10.1912 12.8333 10.0279 12.8333H3.03039C2.86712 12.8333 2.72911 12.7769 2.61637 12.6642C2.50363 12.5514 2.44727 12.4133 2.44727 12.25V4.08333C2.44727 3.92 2.50558 3.78194 2.6222 3.66917C2.73883 3.55639 2.87489 3.5 3.03039 3.5H4.77977ZM3.61352 4.66667V11.6667H9.44477V4.66667H3.61352ZM5.94602 3.5H10.611V9.33333H11.7773V2.33333H5.94602V3.5Z" fill="#10B981"></path> </svg>'
    headerIconClasses="bg-emerald-50 text-emerald-600"
    headerIconAlt="Clone Icon"
    headerTitle="Clone Form"
    headerSubTitle="Create a copy of your form"
    :isLoading="isLoading"
    :isShowLoader="true"
    actionButtonTypeOneText="Cancel"
    actionButtonTypeTwoText="Clone Form"
    actionButtonTypeTwoClasses="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/10 cursor-pointer"
    :backdropClickClose="true"
    @closeModal="closeModalWidget"
    @ButtonOneAction="closeModalWidget"
    @ButtonTwoAction="cloneForm"
  >
    <div>
      <InputField
        ref="inputRef"
        label="Form Name"
        type="text"
        v-model="cloneFormTitle"
        focusColor="emerald"
        placeholder="Enter your form name"
        :hasError="$v.cloneFormTitle.$dirty && $v.cloneFormTitle.$error"
        :validationMessage="$v.cloneFormTitle.$errors"
        @input="cloneFormTitle = $event"
        @blur="$v.cloneFormTitle.$touch()"
      />
      <p class="text-xs! text-slate-400 mt-2! mb-0!">The cloned form will copy all fields and configurations from the original.</p>
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

const emit = defineEmits(['closeModal', 'confirmClone']);
const isLoading = ref(false)
const cloneFormTitle = ref<string>('')
const inputRef = ref<any>(null)
const toast = useToast()

watch(
  () => props.formTitle,
  (val) => {
    if (val !== undefined) {
      cloneFormTitle.value = val ? `${val} #2` : ''
    }
  }
)

const rules = computed(() => {
  return {
    cloneFormTitle: {
      required: helpers.withMessage('Form name is required', required),
      minLength: helpers.withMessage('Please enter a minimum of 3 characters.', minLength(3))
    }
  }
})
const $v = useVuelidate(rules, { cloneFormTitle });

const cloneForm = async () => {
  $v.value.$touch()
  if ($v.value.$pending || $v.value.$error) {
    return false
  }
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated delay
    toast.success("Form cloned successfully!");
    emit('confirmClone', props.formId, cloneFormTitle.value);
    closeModalWidget();
  } catch (error) {
    toast.error("Failed to clone form");
  } finally {
    isLoading.value = false;
  }
}

const closeModalWidget = () => {
  emit('closeModal');
}

watch(
  () => props.isShowModal,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        inputRef.value?.focus();
      }, 50);
    }
  }
)
</script>