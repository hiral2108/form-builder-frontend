<template>
  <div :style="cssVars"
    class="relative w-full h-[375px] bg-white rounded-xl overflow-hidden shadow-inner flex flex-col justify-between select-none">
    <template v-if="displayRuleSetting.form_type === 'sticky'">
      <div class="absolute inset-0 pointer-events-none z-30">
        <button ref="stickyBtnRef" type="button" @click="toggleForm" :class="[
          stickyPositionClasses,
          allowOpen
            ? 'cursor-pointer pointer-events-auto'
            : 'cursor-default pointer-events-none',
        ]" style="
            background-color: var(--widget-bg-color);
            color: var(--widget-text-color);
          "
          class="font-semibold text-sm tracking-wide shadow-md cursor-pointer pointer-events-auto flex items-center justify-center text-center">
          <span class="whitespace-normal break-words text-center leading-snug">{{ displayRuleSetting.button_text
          }}</span>
        </button>
      </div>
    </template>

    <template v-else-if="displayRuleSetting.form_type === 'tooltip'">
      <!-- The wrapper is pinned at bottom-6 right-6 (or left-6). The CTA button NEVER moves or cuts. -->
      <div class="absolute bottom-6 z-30 pointer-events-auto flex items-center" :class="displayRuleSetting.cta_icon_position === 'left' ? 'left-6' : 'right-6'
        " :data-tooltip-dir="displayRuleSetting.cta_icon_position === 'left' ? 'right' : 'left'
          ">
        <!-- Tooltip: extends to the side and cuts off on the card edge if space is narrow -->
        <div v-if="displayRuleSetting.button_text && (!isFormOpen || !allowOpen)"
          class="cta-tooltip absolute top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-normal max-w-[185px] w-max break-words text-center pointer-events-none select-none"
          :style="{
            backgroundColor: 'var(--widget-tooltip-bg-color)',
            color: 'var(--widget-tooltip-text-color)',
            right:
              displayRuleSetting.cta_icon_position === 'left'
                ? 'auto'
                : 'calc(100% + 12px)',
            left:
              displayRuleSetting.cta_icon_position === 'left'
                ? 'calc(100% + 12px)'
                : 'auto',
          }">
          {{ displayRuleSetting.button_text }}
        </div>

        <!-- The CTA Button: 100% round, full size, locked at right-6 / bottom-6, never cut, never shrink -->
        <button type="button" @click="toggleForm"
          class="rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 aspect-square"
          :class="[
            !allowOpen || !isFormOpen
              ? displayRuleSetting.attention_effect
              : '',
            allowOpen
              ? 'cursor-pointer pointer-events-auto'
              : 'cursor-default pointer-events-none',
          ]" style="
            width: var(--widget-button-size);
            height: var(--widget-button-size);
            min-width: var(--widget-button-size);
            min-height: var(--widget-button-size);
            flex-shrink: 0;
            aspect-ratio: 1 / 1;
            background-color: var(--widget-bg-color);
            color: var(--widget-text-color);
          ">
          <div class="w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out"
            :class="allowOpen && isFormOpen ? 'rotate-90' : 'rotate-0'">
            <svg v-if="allowOpen && isFormOpen" xmlns="http://www.w3.org/2000/svg" viewBox="4.5 4.5 15 15"
              fill="currentColor" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round" class="w-[45%] h-[45%]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>

            <template v-else>
              <img v-if="
                displayRuleSetting.cta_icon === 'upload' &&
                displayRuleSetting.custom_cta_url
              " :src="displayRuleSetting.custom_cta_url"
                class="absolute inset-0 w-full h-full object-cover rounded-full" />
              <div v-else v-html="selectedIconSvg"
                class="w-1/2 h-1/2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current [&>svg]:text-current">
              </div>
            </template>
          </div>
        </button>
      </div>
    </template>
    <div v-if="allowOpen"
      class="absolute z-10 w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col form-slide-box"
      :class="[formPopupClasses, isFormOpen ? 'form-open' : 'form-closed']" :style="formPopupStyles">
      <FormPreview :interactive="allowOpen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
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

// -------------------------------------------------------------
// Measure Sticky Button Width & Height dynamically
// -------------------------------------------------------------
const stickyBtnRef = ref<HTMLElement | null>(null);
const stickyBtnWidth = ref(48);
const stickyBtnHeight = ref(44);

const updateStickyBtnDimensions = () => {
  if (stickyBtnRef.value) {
    const rect = stickyBtnRef.value.getBoundingClientRect();
    stickyBtnWidth.value = Math.ceil(rect.width);
    stickyBtnHeight.value = Math.ceil(rect.height);
  }
};

let resizeObserver: ResizeObserver | null = null;

watch(stickyBtnRef, (newEl, oldEl) => {
  if (oldEl && resizeObserver) {
    resizeObserver.unobserve(oldEl);
  }
  if (newEl) {
    nextTick(() => {
      updateStickyBtnDimensions();
      if (typeof ResizeObserver !== "undefined") {
        if (!resizeObserver) {
          resizeObserver = new ResizeObserver(() => {
            updateStickyBtnDimensions();
          });
        }
        resizeObserver.observe(newEl);
      }
    });
  }
});

watch(
  () => [
    displayRuleSetting.value.button_text,
    displayRuleSetting.value.sticky_buttton_position,
    displayRuleSetting.value.sticky_button_alignment,
    displayRuleSetting.value.form_type,
  ],
  () => {
    nextTick(updateStickyBtnDimensions);
  }
);

onMounted(() => {
  nextTick(updateStickyBtnDimensions);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

// Compute CTA icon SVG
const selectedIconSvg = computed(() => {
  if (
    displayRuleSetting.value.cta_icon === "upload" &&
    !displayRuleSetting.value.custom_cta_url
  ) {
    return ctaIcons[0].icon;
  }

  const iconObj = ctaIcons.find(
    (item) => item.key === displayRuleSetting.value.cta_icon
  );
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
    return `absolute right-0 ${vertical} [writing-mode:vertical-rl] [text-orientation:mixed] py-3 px-5 rounded-l-lg min-h-[100px] max-h-[180px]`;
  }

  if (side === "left") {
    let vertical = "top-1/2 -translate-y-1/2";
    if (align === "top") vertical = "top-6";
    if (align === "bottom") vertical = "bottom-6";
    return `absolute left-0 ${vertical} [writing-mode:vertical-rl] [text-orientation:mixed] rotate-360 py-3 px-5 rounded-r-lg min-h-[100px] max-h-[180px]`;
  }

  if (side === "bottom") {
    let horizontal = "left-1/2 -translate-x-1/2";
    if (align === "left") horizontal = "left-6";
    if (align === "right") horizontal = "right-6";
    return `absolute bottom-0 ${horizontal} py-2.5 px-6 rounded-t-lg min-w-[120px] max-w-[220px]`;
  }

  return "absolute right-0 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] [text-orientation:mixed] py-3 px-5 rounded-l-lg min-h-[100px] max-h-[180px]";
});

// Toggle State
const toggleForm = () => {
  isFormOpen.value = !isFormOpen.value;
};

// Alignment & Animation Classes for Form Popup
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
    return `${vertical} max-h-[330px] slide-right`;
  }
  if (side === "left") {
    let vertical = "top-1/2 -translate-y-1/2";
    if (align === "top") vertical = "top-4";
    if (align === "bottom") vertical = "bottom-4";
    return `${vertical} max-h-[330px] slide-left`;
  }
  if (side === "bottom") {
    let horizontal = "left-1/2 -translate-x-1/2";
    if (align === "left") horizontal = "left-6";
    if (align === "right") horizontal = "right-6";
    return `${horizontal} slide-bottom`;
  }
  return "top-1/2 -translate-y-1/2 max-h-[330px] slide-right";
});

// Dynamic offsets: sets right/left (width + 12px) or bottom (height + 12px)
const formPopupStyles = computed(() => {
  if (displayRuleSetting.value.form_type !== "sticky") return {};

  const side = displayRuleSetting.value.sticky_buttton_position;
  const gap = 12; // 12px clean space between button and form

  if (side === "right") {
    const btnW = stickyBtnWidth.value || 48;
    return {
      right: `${btnW + gap}px`,
      maxWidth: `calc(100% - ${btnW + gap + 16}px)`,
    };
  }

  if (side === "left") {
    const btnW = stickyBtnWidth.value || 48;
    return {
      left: `${btnW + gap}px`,
      maxWidth: `calc(100% - ${btnW + gap + 16}px)`,
    };
  }

  if (side === "bottom") {
    const btnH = stickyBtnHeight.value || 44;
    const topMargin = 20; // 20px clearance below the top of the card
    return {
      bottom: `${btnH + gap}px`,
      maxHeight: `calc(100% - ${btnH + gap + topMargin}px)`,
      maxWidth: "calc(100% - 32px)",
    };
  }

  const btnW = stickyBtnWidth.value || 48;
  return {
    right: `${btnW + gap}px`,
    maxWidth: `calc(100% - ${btnW + gap + 16}px)`,
  };
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
:deep(.gform-wrapper > div) {
  min-width: 280px;
}

/* Sleek horizontal & vertical scrollbar */
:deep(.gform-wrapper) {
  scrollbar-width: thin;
}

:deep(.gform-wrapper::-webkit-scrollbar) {
  height: 6px;
  width: 6px;
}

:deep(.gform-wrapper::-webkit-scrollbar-thumb) {
  background: #cbd5e1;
  border-radius: 9999px;
}

:deep(.gform-wrapper::-webkit-scrollbar-thumb:hover) {
  background: #94a3b8;
}

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
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
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
