<template>
  <div
    :style="cssVars"
    class="relative w-full h-[433px] bg-white rounded-xl overflow-hidden shadow-inner flex flex-col justify-between select-none">
    <template v-if="displayRuleSetting.form_type === 'sticky'">
      <div class="absolute inset-0 pointer-events-none z-30">
        <button
          type="button"
          @click="toggleForm"
          :class="stickyPositionClasses"
          style="background-color: var(--widget-bg-color); color: var(--widget-text-color)"
          class="font-semibold text-sm tracking-wide shadow-md cursor-pointer pointer-events-auto flex items-center justify-center">
          <span class="whitespace-nowrap">{{ displayRuleSetting.button_text || "Contact Us" }}</span>
        </button>
      </div>
    </template>

    <template v-else-if="displayRuleSetting.form_type === 'tooltip'">
      <div
        class="absolute bottom-6 flex items-center gap-3 transition-all duration-300 pointer-events-auto z-30"
        :class="displayRuleSetting.cta_icon_position === 'left' ? 'left-6 flex-row-reverse' : 'right-6 flex-row'">
        <div
          v-if="displayRuleSetting.button_text && !isFormOpen"
          class="relative px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-md whitespace-nowrap transition-colors"
          style="background-color: var(--widget-tooltip-bg-color); color: var(--widget-tooltip-text-color)">
          {{ displayRuleSetting.button_text }}

          <span
            class="absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent"
            :class="
              displayRuleSetting.cta_icon_position === 'left' ? 'right-full border-r-[6px]' : 'left-full border-l-[6px]'
            "
            :style="{
              [displayRuleSetting.cta_icon_position === 'left' ? 'borderRightColor' : 'borderLeftColor']:
                displayRuleSetting.tooltip_bg_color,
            }">
          </span>
        </div>

        <button
          type="button"
          @click="toggleForm"
          class="rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
          :class="[!isFormOpen ? displayRuleSetting.attention_effect : '']"
          style="
            width: var(--widget-button-size);
            height: var(--widget-button-size);
            background-color: var(--widget-bg-color);
            color: var(--widget-text-color);
          ">
          <svg
            v-if="isFormOpen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            >
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
          <div
            v-else
            v-html="selectedIconSvg"
            class="w-1/2 h-1/2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current [&>svg]:text-current"></div>
        </button>
      </div>
    </template>
    <div
      class="absolute z-10 w-[330px] max-w-[85%] max-h-[310px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col form-slide-box"
      :class="[formPopupClasses, isFormOpen ? 'form-open' : 'form-closed']">
      <FormPreview />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { formSetting } from "@/composable/useFormSettings";
  import { ctaIcons } from "@/data/DisplayRuleOptions";
  import { useFormStyle } from "@/composable/useFormStyle";
  import FormPreview from "@/views/FormSettingComponents/FormPreview.vue";

  const { cssVars } = useFormStyle();
  const { displayRuleSetting } = formSetting();
  const isFormOpen = ref(false);

  // Compute CTA icon SVG
  const selectedIconSvg = computed(() => {
    const iconObj = ctaIcons.find((item) => item.key === displayRuleSetting.value.cta_icon);
    return iconObj ? iconObj.icon : ctaIcons[0].icon;
  });

  // Compute Sticky Button Positioning
  const stickyPositionClasses = computed(() => {
    const side = displayRuleSetting.value.sticky_buttton_position;
    const align = displayRuleSetting.value.sticky_button_alignment;

    if (side === "right") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-6";
      if (align === "bottom") vertical = "bottom-6";
      return `absolute right-0 ${vertical} [writing-mode:vertical-rl] [text-orientation:mixed] py-3 px-5 rounded-l-lg`;
    }

    if (side === "left") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-6";
      if (align === "bottom") vertical = "bottom-6";
      return `absolute left-0 ${vertical} [writing-mode:vertical-rl] [text-orientation:mixed] rotate-360 py-3 px-5 rounded-r-lg`;
    }

    if (side === "bottom") {
      let horizontal = "left-1/2 -translate-x-1/2";
      if (align === "left") horizontal = "left-6";
      if (align === "right") horizontal = "right-6";
      return `absolute bottom-0 ${horizontal} py-2.5 px-6 rounded-t-lg`;
    }

    return "absolute right-0 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] [text-orientation:mixed] py-3 px-5 rounded-l-lg";
  });

  // Toggle State
  const toggleForm = () => {
    isFormOpen.value = !isFormOpen.value;
  };

  // Single computed property that handles BOTH position and slide animation direction
  const formPopupClasses = computed(() => {
     if (displayRuleSetting.value.form_type === "tooltip") {
      return displayRuleSetting.value.cta_icon_position === "left"
        ? "bottom-[calc(var(--widget-button-size)+32px)] left-6 slide-bottom"
        : "bottom-[calc(var(--widget-button-size)+32px)] right-6 slide-bottom";
    }

    const side = displayRuleSetting.value.sticky_buttton_position;
    const align = displayRuleSetting.value.sticky_button_alignment;

    if (side === "right") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-4";
      if (align === "bottom") vertical = "bottom-4";
      return `right-12 ${vertical} slide-right`;
    }

    if (side === "left") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-4";
      if (align === "bottom") vertical = "bottom-4";
      return `left-12 ${vertical} slide-left`;
    }

    if (side === "bottom") {
      let horizontal = "left-1/2 -translate-x-1/2";
      if (align === "left") horizontal = "left-6";
      if (align === "right") horizontal = "right-6";
      return `bottom-11 ${horizontal} slide-bottom`;
    }

    return "right-12 top-1/2 -translate-y-1/2 slide-right";
  });

  // Automatically close the form when any layout setting changes
 watch(
  () => [
    displayRuleSetting.value.form_type,
    displayRuleSetting.value.sticky_buttton_position,
    displayRuleSetting.value.sticky_button_alignment,
    displayRuleSetting.value.cta_icon_position,
    displayRuleSetting.value.cta_icon,
  ],
  () => {
    isFormOpen.value = false;
  }
);
</script>

<style scoped>
  .attention-gelatine {
    animation: form-gelatine 0.5s infinite;
  }

  @keyframes form-gelatine {
    from,
    to {
      transform: scale(1, 1);
    }

    25% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }

    75% {
      transform: scale(0.95, 1.05);
    }
  }

  .attention-spin {
    animation: 3s infinite form-elastic-spin;
  }

  @keyframes form-elastic-spin {
    0% {
      transform: rotate(0);
    }

    100%,
    25% {
      transform: rotate(720deg);
    }
  }

  .attention-pulse {
    animation: form-pulse 1s infinite ease-in-out alternate;
  }

  @keyframes form-pulse {
    from {
      transform: scale(0.8);
    }

    to {
      transform: scale(1.2);
    }
  }

  .attention-flash {
    animation: form-flash 500ms ease infinite alternate;
  }

  @keyframes form-flash {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .attention-bounce {
    animation: form-bounce 2s ease infinite;
  }

  @keyframes form-bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-30px);
    }

    60% {
      transform: translateY(-15px);
    }
  }

  .attention-swing {
    transform-origin: top center;
    animation: form-swing 2s ease infinite;
  }

  @keyframes form-swing {
    20% {
      transform: rotate(15deg);
    }

    40% {
      transform: rotate(-10deg);
    }

    60% {
      transform: rotate(5deg);
    }

    80% {
      transform: rotate(-5deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  .attention-shake {
    animation: form-shake 3s infinite;
  }

  @keyframes form-shake {
    20%,
    80% {
      transform: translateX(0);
    }

    30%,
    50% {
      transform: translateX(-10px);
    }

    40%,
    60% {
      transform: translateX(10px);
    }
  }

  .attention-shockwave {
    animation: form-shockwave 3s infinite ease-in-out;
  }

  @keyframes form-shockwave {
    30%,
    50% {
      transform: rotate(-20deg) scale(1.2);
    }

    40% {
      transform: rotate(20deg) scale(1.2);
    }

    40%,
    60% {
      transform: rotate(0deg) scale(1.2);
    }

    20%,
    80% {
      transform: scale(1);
    }
  }

  /* Slide In Animations */
  /* Smooth Slide-in & Slide-out Transition (0.45s) */
  .form-slide-box {
    transition:
      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  /* Open State (Visible in place) */
  .form-slide-box.form-open {
    opacity: 1;
    transform: translate(0, 0);
    pointer-events: auto;
  }

  /* Closed State (Hidden and slid away) */
  .form-slide-box.form-closed {
    opacity: 0;
    pointer-events: none;
  }

  .form-slide-box.slide-right.form-closed {
    transform: translateX(25px);
  }

  /* Slide Left (In and Out) */
  .form-slide-box.slide-left.form-closed {
    transform: translateX(-25px);
  }

  /* Slide Bottom (In and Out) */
  .form-slide-box.slide-bottom.form-closed {
    transform: translateY(25px);
  }
</style>
