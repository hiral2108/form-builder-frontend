<template>
  <!-- Hidden helper element to find the parent container in DOM -->
  <span ref="triggerWrapper" style="display: none !important;"></span>

  <!-- Teleport the trigger icon inline directly into the label once it is found -->
  <Teleport v-if="message && labelElement" :to="labelElement">
    <span
      ref="trigger"
      class="relative cursor-pointer pointer-events-auto"
      style="display: inline-flex !important; align-items: center !important; justify-content: center !important; vertical-align: middle !important; height: 1em !important; width: 1em !important; margin: 0 !important; padding: 0 !important;"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <!-- Info Icon using the existing SVG asset -->
      <img
        v-svg-inline
        src="@/assets/icons/form-settings/info.svg"
        class="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors"
      />
    </span>
  </Teleport>

  <!-- Teleporting the Tooltip message box to body to prevent z-index/overflow issues -->
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
      <!-- Small tooltip triangle arrow -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
  message?: string;
}>();

const triggerWrapper = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const labelElement = ref<HTMLElement | null>(null);
const visible = ref(false);
const position = ref({ top: 0, left: 0 });

onMounted(() => {
  // Use setTimeout to ensure sibling components have fully mounted
  setTimeout(() => {
    if (triggerWrapper.value) {
      const fieldWrapper = triggerWrapper.value.parentElement; // The wrapper of the field
      if (fieldWrapper) {
        
        // Find the parent card that has transition classes
        const card = fieldWrapper.closest('.transition-all');
        let transitionClasses: string[] = [];
        
        if (card) {
          // Temporarily remove transitions to prevent animating the layout shift
          if (card.classList.contains('transition-all')) transitionClasses.push('transition-all');
          if (card.classList.contains('duration-200')) transitionClasses.push('duration-200');
          card.classList.remove(...transitionClasses);
        }
    const label = fieldWrapper.querySelector('label');
        if (label) {
          // Set target for Teleport
          labelElement.value = label;
          // Force inline-flex alignment for perfect centering and spacing
          label.style.setProperty('display', 'inline-flex', 'important');
          label.style.setProperty('align-items', 'center', 'important');
          label.style.setProperty('justify-content', 'center', 'important');
          label.style.setProperty('gap', '4px', 'important');
          label.style.setProperty('vertical-align', 'middle', 'important');
        }

        // Re-enable transitions on the parent card after layout has completed
        if (card && transitionClasses.length > 0) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add(...transitionClasses);
            });
          });
        }
      }
    }
  }, 0);
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