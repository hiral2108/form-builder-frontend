<template>
  <!-- Hidden helper element to find the parent container in DOM -->
  <span ref="triggerWrapper" style="display: none !important;"></span>

  <!-- Teleport the trigger icon inline directly into the label once it is found -->
  <Teleport v-if="message && iconTarget" :to="iconTarget">
    <span
      ref="trigger"
      class="relative cursor-pointer pointer-events-auto"
      style="display: inline-flex !important; align-items: center !important; justify-content: center !important; vertical-align: middle !important; height: 1em !important; width: 1em !important; margin: 0 0 0 3px !important; padding: 0 !important; flex-shrink: 0 !important; line-height: 1 !important;"
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

defineOptions({
  inheritAttrs: false
});

defineProps<{
  message?: string;
}>();

const triggerWrapper = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const labelElement = ref<HTMLElement | null>(null);
const iconTarget = ref<HTMLElement | null>(null);

// Put the ⓘ inside the red "*" span (nowrap) so "*ⓘ" never splits.
// No "*" (field not required) → icon goes in the label as before.
const updateIconTarget = (label: HTMLElement) => {
  const star = label.querySelector<HTMLElement>('.text-red-500');
  if (star && star.style.whiteSpace !== 'nowrap') {
    star.style.setProperty('white-space', 'nowrap', 'important');
  }
  const next = star ?? label;
  if (iconTarget.value !== next) iconTarget.value = next;
};
const visible = ref(false);
const position = ref({ top: 0, left: 0 });

let labelObserver: MutationObserver | null = null;
let applying = false;
let rafId: number | null = null;
let cancelled = false;

// Same as front store: label is normal text (block + text-align),
// the help icon flows inline right after the "*" and wraps with the text.
const applyLabelFlexStyles = (label: HTMLElement) => {
  if (label.style.display === 'none') {
    return;
  }

  const align = label.classList.contains('text-right')
    ? 'right'
    : label.classList.contains('text-center')
      ? 'center'
      : 'left';

  // Split name labels fill their own half; other labels match the field width
  const isInGrid = label.closest('.gform-split-name-grid');
  const targetWidth = isInGrid ? '100%' : 'var(--input-width)';

  const s = label.style;
  if (s.display === 'block' && s.width === targetWidth && s.textAlign === align) {
    return;
  }

  applying = true;
  s.removeProperty('align-items');
  s.removeProperty('flex-wrap');
  s.removeProperty('justify-content');
  s.removeProperty('line-height');
  s.setProperty('display', 'block', 'important');
  s.setProperty('width', targetWidth, 'important');
  s.setProperty('text-align', align, 'important');
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
  updateIconTarget(label);

  labelObserver = new MutationObserver(() => {
    updateIconTarget(label); // e.g. "Required" toggled → "*" added/removed
    if (applying) return;
    applyLabelFlexStyles(label);
  });
  labelObserver.observe(label, {
    attributes: true,
    attributeFilter: ['class', 'style'],
    childList: true,
    subtree: true,
  });

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
  hide();
});

const show = () => {
  if (!trigger.value) return;
  const rect = trigger.value.getBoundingClientRect();
  // tooltip is position: fixed → use viewport coords only (no scrollX / scrollY)
  position.value = {
    top: rect.top - 8,
    left: rect.left + rect.width / 2,
  };
  visible.value = true;
  window.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
};

const hide = () => {
  visible.value = false;
  window.removeEventListener('scroll', hide, true);
  window.removeEventListener('resize', hide);
};
</script>