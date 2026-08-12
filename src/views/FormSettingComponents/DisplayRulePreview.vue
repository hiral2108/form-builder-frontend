<template>
  <div
    :style="cssVars"
    class="relative w-full h-[434px] bg-white rounded-xl overflow-hidden shadow-inner flex flex-col justify-between select-none">
    <template v-if="displayRuleSetting.form_type === 'sticky'">
      <div class="absolute inset-0 pointer-events-none z-30">
        <button
          type="button"
          @click="toggleForm"
          :class="[
            stickyPositionClasses,
            allowOpen ? 'cursor-pointer pointer-events-auto' : 'cursor-default pointer-events-none',
          ]"
          style="background-color: var(--widget-bg-color); color: var(--widget-text-color)"
          class="font-semibold text-sm tracking-wide shadow-md cursor-pointer pointer-events-auto flex items-center justify-center">
          <span class="whitespace-nowrap">{{ displayRuleSetting.button_text || "Contact Us" }}</span>
        </button>
      </div>
    </template>

    <template v-else-if="displayRuleSetting.form_type === 'tooltip'">
      <div
        class="absolute bottom-6 flex items-center gap-3 transition-all duration-300 pointer-events-auto z-30"
        :class="displayRuleSetting.cta_icon_position === 'left' ? 'left-6 flex-row-reverse' : 'right-6 flex-row'"
        :data-tooltip-dir="displayRuleSetting.cta_icon_position === 'left' ? 'right' : 'left'">
        <div
          v-if="displayRuleSetting.button_text && (!isFormOpen || !allowOpen)"
          class="cta-tooltip relative px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap"
          style="background-color: var(--widget-tooltip-bg-color); color: var(--widget-tooltip-text-color)">
          {{ displayRuleSetting.button_text }}
        </div>

        <button
          type="button"
          @click="toggleForm"
          class="rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
          :class="[
            !allowOpen || !isFormOpen ? displayRuleSetting.attention_effect : '',
            allowOpen ? 'cursor-pointer pointer-events-auto' : 'cursor-default pointer-events-none',
          ]"
          style="
            width: var(--widget-button-size);
            height: var(--widget-button-size);
            background-color: var(--widget-bg-color);
            color: var(--widget-text-color);
          ">
          <div
            class="w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out"
            :class="allowOpen && isFormOpen ? 'rotate-180' : 'rotate-0'">
            <svg
              v-if="allowOpen && isFormOpen"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>

            <!-- Render custom image if uploaded and selected (fills the full button circle) -->
            <img
              v-if="displayRuleSetting.cta_icon === 'upload' && displayRuleSetting.custom_cta_url"
              :src="displayRuleSetting.custom_cta_url"
              class="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <!-- Render default SVG choice -->
            <div
              v-else
              v-html="selectedIconSvg"
              class="w-1/2 h-1/2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current [&>svg]:text-current"></div>
          </div>
        </button>
      </div>
    </template>
    <div
      v-if="allowOpen"
      class="absolute z-10 w-[350px] max-w-[85%] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col form-slide-box"
      :class="[formPopupClasses, isFormOpen ? 'form-open' : 'form-closed']">
      <FormPreview :interactive="allowOpen" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { formSetting } from "@/composable/useFormSettings";
  import { ctaIcons } from "@/data/DisplayRuleOptions";
  import { useFormStyle } from "@/composable/useFormStyle";
  import FormPreview from "@/views/FormSettingComponents/FormPreview.vue";

  const props = withDefaults(
    defineProps<{
      allowOpen?: boolean;
    }>(),
    {
      allowOpen: false,
    }
  );

  const { cssVars } = useFormStyle();
  const { displayRuleSetting } = formSetting();
  const isFormOpen = ref(false);

  // Compute CTA icon SVG
  const selectedIconSvg = computed(() => {
    // Fallback to the first icon (chat-lines) if upload is selected but no image is uploaded
    if (
      displayRuleSetting.value.cta_icon === "upload" &&
      !displayRuleSetting.value.custom_cta_url
    ) {
      return ctaIcons[0].icon;
    }
    
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
        ? "bottom-[calc(var(--widget-button-size)+32px)] left-6 max-h-[min(310px,calc(100%-var(--widget-button-size)-45px))] slide-bottom"
        : "bottom-[calc(var(--widget-button-size)+32px)] right-6 max-h-[min(310px,calc(100%-var(--widget-button-size)-45px))] slide-bottom";
    }

    const side = displayRuleSetting.value.sticky_buttton_position;
    const align = displayRuleSetting.value.sticky_button_alignment;

    if (side === "right") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-4";
      if (align === "bottom") vertical = "bottom-4";
      return `right-12 ${vertical} max-h-[330px] slide-right`;
    }
    if (side === "left") {
      let vertical = "top-1/2 -translate-y-1/2";
      if (align === "top") vertical = "top-4";
      if (align === "bottom") vertical = "bottom-4";
      return `left-12 ${vertical} max-h-[330px] slide-left`;
    }
    if (side === "bottom") {
      let horizontal = "left-1/2 -translate-x-1/2";
      if (align === "left") horizontal = "left-6";
      if (align === "right") horizontal = "right-6";
      return `bottom-11 ${horizontal} max-h-[330px] slide-bottom`;
    }
    return "right-12 top-1/2 -translate-y-1/2 max-h-[330px] slide-right";
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
  .cta-tooltip {
    filter: drop-shadow(0 2px 5px #34343426);
  }

  .cta-tooltip:after {
    content: "";
    position: absolute;
    border-style: solid;
    text-decoration: none;
  }

  [data-tooltip-dir="left"] .cta-tooltip:after {
    left: calc(100% + 1px);
    bottom: 50%;
    border-width: 5px 0px 5px 11px;
    border-color: transparent transparent transparent var(--widget-tooltip-bg-color);
    transform-origin: left;
    transform: translate(-4px, 50%);
  }

  [data-tooltip-dir="right"] .cta-tooltip:after {
    right: calc(100% + 3px);
    bottom: 50%;
    border-width: 5px 11px 5px 0px;
    border-color: transparent var(--widget-tooltip-bg-color) transparent transparent;
    transform-origin: right;
    transform: translate(4px, 50%);
  }

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

.form-slide-box {
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translateZ(0);
  backface-visibility: hidden;
}

  .form-slide-box.form-open {
    opacity: 1;
    transform: translate(0, 0);
    pointer-events: auto;
  }

  .form-slide-box.form-closed {
    opacity: 0;
    pointer-events: none;
  }

  .form-slide-box.slide-right.form-closed {
    transform: translateX(25px);
  }

  .form-slide-box.slide-left.form-closed {
    transform: translateX(-25px);
  }

  .form-slide-box.slide-bottom.form-closed {
    transform: translateY(25px);
  }
</style>
