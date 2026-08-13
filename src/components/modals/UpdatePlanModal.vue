<template>
  <ModalComponent
    :isShowModal="isShowModal"
    :closeModal="true"
    headerTitle="Unlock Pro Features"
    headerSubTitle="Upgrade your plan to access premium field types"
    actionButtonTypeOneText="Maybe Later"
    actionButtonTypeTwoText="Upgrade to Pro"
    actionButtonTypeTwoClasses="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-none text-white shadow-md cursor-pointer"
    @closeModal="closeModalWidget"
    @ButtonOneAction="closeModalWidget"
    @ButtonTwoAction="redirectToPlanPage"
    modalClasses="max-w-md"
  >
    <div class="space-y-4">
      <p class="text-slate-600 text-sm leading-relaxed">
        This feature is available exclusively to Pro plan users. Upgrade now to access:
      </p>
      <div class="space-y-3.5 pt-2">
        <div v-for="(feature, idx) in proFeatures" :key="idx" class="flex items-start gap-3">
          <div class="w-5 h-5 flex items-center justify-center text-teal-600 flex-shrink-0 mt-0.5">
            <img
              v-svg-inline
              src="@/assets/icons/auth/password.svg"
              alt="lock"
              class="h-4 w-4" />
          </div>
          <p class="text-slate-700 text-sm font-medium mt-auto">{{ feature }}</p>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ModalComponent from "@/components/global/ModalComponent.vue";

defineProps({
  isShowModal: Boolean
});

const emit = defineEmits(["closeModal"]);
const router = useRouter();

const proFeatures = [
  "Unlimited forms",
  "Unlimited visitors",
  "Unlimited submissions",
  "Advanced fields (Dropdowns, Radios, Checkboxes)",
  "Enhanced form triggers & targeting rules",
  "Store & export submissions",
  "Email services integration",
];

const closeModalWidget = () => {
  emit("closeModal");
};

const redirectToPlanPage = () => {
  closeModalWidget();
  router.push("/plan");
};
</script>
