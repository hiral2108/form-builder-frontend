<template>
  <ModalComponent
    :isShowModal="isDeleteModalOpen"
    :closeModal="true"
    :headerIcon="trashIconSvg"
    headerIconClasses="bg-red-100 text-red-600"
    headerTitle="Delete Form Field"
    headerSubTitle="This action cannot be undone"
    actionButtonTypeOneText="Cancel"
    actionButtonTypeTwoText="Delete Field"
    actionButtonTypeTwoClasses="bg-red-600 hover:bg-red-700"
    :backdropClickClose="true"
    @closeModal="$emit('close')"
    @ButtonOneAction="$emit('close')"
    @ButtonTwoAction="$emit('confirm')">
    <div class="text-center">
      <p class="text-gray-800 font-medium mb-2! mt-0! text-base!">
        Are you sure you want to delete <span class="font-bold text-teal-600">"{{ fieldLabel }}"</span>?
      </p>
      <p class="text-sm! text-gray-500 my-0!">
        All collected responses for this field will be lost if you remove it from the builder.
      </p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
  defineProps<{
    isDeleteModalOpen: boolean;
    fieldLabel: string;
  }>();

  defineEmits<{
    (e: "close"): void;
    (e: "confirm"): void;
  }>();

  const trashIconSvg = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6111 3.5H13.5268V4.66667H12.3605V12.25C12.3605 12.4133 12.3041 12.5514 12.1914 12.6642C12.0787 12.7769 11.9407 12.8333 11.7774 12.8333H3.61363C3.45036 12.8333 3.31235 12.7769 3.19961 12.6642C3.08688 12.5514 3.03051 12.4133 3.03051 12.25V4.66667H1.86426V3.5H4.77988V1.75C4.77988 1.58667 4.83625 1.44861 4.94899 1.33583C5.06173 1.22305 5.19973 1.16667 5.36301 1.16667H10.028C10.1913 1.16667 10.3293 1.22305 10.442 1.33583C10.5548 1.44861 10.6111 1.58667 10.6111 1.75V3.5ZM11.1943 4.66667H4.19676V11.6667H11.1943V4.66667ZM5.94613 6.41667H7.11238V9.91667H5.94613V6.41667ZM8.27863 6.41667H9.44488V9.91667H8.27863V6.41667ZM5.94613 2.33333V3.5H9.44488V2.33333H5.94613Z" fill="currentColor"></path></svg>`;
</script>
