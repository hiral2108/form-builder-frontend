<template>
  <ModalComponent
    :isShowModal="isShowModal"
    :closeModal="true"
    headerIcon='<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.6111 3.5H13.5268V4.66667H12.3605V12.25C12.3605 12.4133 12.3041 12.5514 12.1914 12.6642C12.0787 12.7769 11.9407 12.8333 11.7774 12.8333H3.61363C3.45036 12.8333 3.31235 12.7769 3.19961 12.6642C3.08688 12.5514 3.03051 12.4133 3.03051 12.25V4.66667H1.86426V3.5H4.77988V1.75C4.77988 1.58667 4.83625 1.44861 4.94899 1.33583C5.06173 1.22305 5.19973 1.16667 5.36301 1.16667H10.028C10.1913 1.16667 10.3293 1.22305 10.442 1.33583C10.5548 1.44861 10.6111 1.58667 10.6111 1.75V3.5ZM11.1943 4.66667H4.19676V11.6667H11.1943V4.66667ZM5.94613 6.41667H7.11238V9.91667H5.94613V6.41667ZM8.27863 6.41667H9.44488V9.91667H8.27863V6.41667ZM5.94613 2.33333V3.5H9.44488V2.33333H5.94613Z" fill="#DC2626"></path> </svg>'
    headerIconClasses="bg-red-50 text-red-600"
    headerIconAlt="Delete Icon"
    headerTitle="Delete Form"
    headerSubTitle="This action cannot be undone"
    :isLoading="isLoading"
    :isShowLoader="true"
    actionButtonTypeOneText="Cancel"
    actionButtonTypeTwoText="Delete Form"
    actionButtonTypeTwoClasses="bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/10 cursor-pointer"
    :backdropClickClose="true"
    @closeModal="closeModalWidget"
    @ButtonOneAction="closeModalWidget"
    @ButtonTwoAction="deleteForm"
  >
    <div class="text-center">
      <p class="text-slate-800 font-medium mb-2! mt-0! text-base!">Are you sure you want to delete this form?</p>
      <p class="text-sm! text-slate-500 my-0!">This form and all its submissions and analytics will be permanently removed.</p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  isShowModal: Boolean,
  formId: Number
});

const emit = defineEmits(['closeModal', 'confirmDelete']);
const isLoading = ref(false)
const toast = useToast()

const deleteForm = async () => {
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated delay
    toast.success("Form deleted successfully!");
    emit('confirmDelete', props.formId);
    closeModalWidget();
  } catch (error) {
    toast.error("Failed to delete form");
  } finally {
    isLoading.value = false;
  }
}

const closeModalWidget = () => {
  emit('closeModal');
}
</script>