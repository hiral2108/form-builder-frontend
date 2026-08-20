<template>
  <!-- Hidden helper element to find the parent container in DOM -->
  <span ref="triggerWrapper" style="display: none !important;"></span>

  <!-- Teleport the trigger icon inline directly into the label once it is found -->
  <Teleport v-if="message && labelElement" :to="labelElement">
    <span
      ref="trigger"
      class="relative cursor-pointer pointer-events-auto"
      style="display: inline-flex !important; align-items: center !important; justify-content: center !important; vertical-align: middle !important; height: 1em !important; width: 1em !important; margin: 0 0 0 4px !important; padding: 0 !important; flex-shrink: 0 !important; line-height: 1 !important;"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <img
        v-svg-inline
        src="@/assets/icons/form-settings/info.svg"
        class="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors"
        style="display: block;"
      />
    </span>
  </Teleport>

  <Teleport to="body">
    <div
      v-if="message && visible"
      class="fixed max-w-52 w-max bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl pointer-events-none text-center leading-relaxed whitespace-normal break-words z-[9999]"
      :style="{
        top: position.top + 'px',
        left: position.left + 'px',
        transform: 'translate(-50%, -100%)',
      }"
    >
      {{ message }}
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps<{
  message?: string;
}>();

const triggerWrapper = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const labelElement = ref<HTMLElement | null>(null);
const visible = ref(false);
const position = ref({ top: 0, left: 0 });

let labelObserver: MutationObserver | null = null;
let applying = false;
let rafId: number | null = null;
let cancelled = false;

const applyLabelFlexStyles = (label: HTMLElement) => {
  if (label.style.display === 'none') {
    return;
  }

  const justify = label.classList.contains('text-right')
    ? 'flex-end'
    : label.classList.contains('text-center')
      ? 'center'
      : 'flex-start';

    const s = label.style;
  if (
    s.display === 'flex' &&
    s.alignItems === 'center' &&
    s.flexWrap === 'wrap' &&
    s.width === 'var(--input-width)' && /* 👈 Changed to check var(--input-width) */
    s.lineHeight === 'normal' &&
    s.justifyContent === justify
  ) {
    return;
  }

  applying = true;
  s.setProperty('display', 'flex', 'important');
  s.setProperty('align-items', 'center', 'important');
  s.setProperty('flex-wrap', 'wrap', 'important');
  s.setProperty('width', 'var(--input-width)', 'important'); /* 👈 Changed to set var(--input-width) */
  s.setProperty('line-height', 'normal', 'important');
  s.setProperty('justify-content', justify, 'important');
  Promise.resolve().then(() => { applying = false; });
};

const setupOnLabel = (fieldWrapper: HTMLElement, label: HTMLElement) => {
  const card = fieldWrapper.closest('.transition-all');
  let transitionClasses: string[] = [];

  if (card) {
    if (card.classList.contains('transition-all')) transitionClasses.push('transition-all');
    if (card.classList.contains('duration-200')) transitionClasses.push('duration-200');
    card.classList.remove(...transitionClasses);
  }

  labelElement.value = label;
  applyLabelFlexStyles(label);

  labelObserver = new MutationObserver(() => {
    if (applying) return;
    applyLabelFlexStyles(label);
  });
  labelObserver.observe(label, { attributes: true, attributeFilter: ['class', 'style'] });

  if (card && transitionClasses.length > 0) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add(...transitionClasses);
      });
    });
  }
};

const MAX_ATTEMPTS = 180;
const waitForLabel = (attempt = 0) => {
  if (cancelled || !triggerWrapper.value) return;

  const fieldWrapper = triggerWrapper.value.parentElement;
  const label = fieldWrapper?.querySelector('label') ?? null;

  if (fieldWrapper && label) {
    setupOnLabel(fieldWrapper, label);
    return;
  }

  if (attempt < MAX_ATTEMPTS) {
    rafId = requestAnimationFrame(() => waitForLabel(attempt + 1));
  }
};

onMounted(() => {
  waitForLabel();
});

onBeforeUnmount(() => {
  cancelled = true;
  if (rafId !== null) cancelAnimationFrame(rafId);
  labelObserver?.disconnect();
});

const show = () => {
  if (!trigger.value) return;
  const rect = trigger.value.getBoundingClientRect();
  position.value = {
    top: rect.top + window.scrollY - 8,
    left: rect.left + rect.width / 2 + window.scrollX,
  };
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};
</script>