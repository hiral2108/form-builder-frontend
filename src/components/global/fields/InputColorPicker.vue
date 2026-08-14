<template>
  <div class="relative" ref="root">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-semibold text-slate-800 mb-1"
      :class="labelClass">
      {{ label }}
    </label>
    <!-- Color Swatch Button -->
    <button
      type="button"
      :id="id"
      class="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0 shadow-sm block transition-all"
      :style="{ backgroundColor: swatchCss }"
      @click="togglePicker"
      aria-label="Open color picker"
    ></button>

    <!-- Chrome Color Picker Popup: teleported to body, fixed-positioned, clamped to viewport -->
    <Teleport to="body">
      <div
        v-if="showPicker"
        ref="popupEl"
        class="fixed z-[9999]"
        :style="{ top: popupTop + 'px', left: popupLeft + 'px' }"
      >
        <Chrome
          :modelValue="chromeModel"
          @update:modelValue="onChromeUpdate"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Chrome } from "@ckpack/vue-color";
import { v4 as uuidv4 } from "uuid";

type RGBA = { r: number; g: number; b: number; a: number };

const props = withDefaults(defineProps<{
  modelValue?: string | null | RGBA;
  id?: string;
  label?: string;
  labelClass?: string;
}>(), {
  modelValue: "#ffffff",
  id: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", v: any): void;
}>();

const root = ref<HTMLElement | null>(null);
const popupEl = ref<HTMLElement | null>(null);
const showPicker = ref(false);
const popupTop = ref(0);
const popupLeft = ref(0);
const id = computed(() => props.id ?? `input-color-${uuidv4()}`);

/* ---------- Positioning ---------- */
function computePopupPosition() {
  const btn = root.value;
  if (!btn) return;

  const margin = 8; // minimum gap from screen edge
  const popupWidth = popupEl.value?.offsetWidth || 225;
  const popupHeight = popupEl.value?.offsetHeight || 300;

  const rect = btn.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // --- Horizontal: prefer aligning left edge with button, clamp both sides ---
  let left = rect.left;
  const maxLeft = viewportWidth - popupWidth - margin;
  if (left > maxLeft) left = maxLeft;
  if (left < margin) left = margin;

  // --- Vertical: prefer opening below button, flip above if no room, clamp both sides ---
  let top = rect.bottom + 6;
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;
  if (spaceBelow < popupHeight + margin && spaceAbove > spaceBelow) {
    top = rect.top - popupHeight - 6;
  }
  const maxTop = viewportHeight - popupHeight - margin;
  if (top > maxTop) top = maxTop;
  if (top < margin) top = margin;

  popupLeft.value = left;
  popupTop.value = top;
}

/* ---------- Parsing & Normalization ---------- */
function hexToRgba(hex: string): RGBA | null {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b, a: 1 };
}

function rgbaStringToObj(input: string): RGBA | null {
  const m = input.match(/rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*([0-9.]+))?\s*\)/i);
  if (!m) return null;
  return {
    r: Math.max(0, Math.min(255, Number(m[1]))),
    g: Math.max(0, Math.min(255, Number(m[2]))),
    b: Math.max(0, Math.min(255, Number(m[3]))),
    a: m[4] !== undefined ? Math.max(0, Math.min(1, Number(m[4]))) : 1
  };
}

function normalizeToRgba(v: any): RGBA | null {
  if (!v && v !== 0) return null;
  if (typeof v === "object" && v.r !== undefined) return v;
  if (typeof v === "string") {
    const s = v.trim();
    if (/^[0-9a-fA-F]{6}$/.test(s)) return hexToRgba("#" + s);
    if (/^#[0-9a-fA-F]{6}$/.test(s)) return hexToRgba(s);
    const parsed = rgbaStringToObj(s);
    if (parsed) return parsed;
  }
  return null;
}

const chromeModel = ref<any>("#ffffff");

const swatchCss = computed(() => {
  const val = chromeModel.value;
  if (!val) return "#ffffff";
  if (typeof val === "object" && val.r !== undefined) {
    return `rgba(${val.r}, ${val.g}, ${val.b}, ${val.a ?? 1})`;
  }
  return String(val);
});

function initFromModel() {
  const rgba = normalizeToRgba(props.modelValue);
  if (rgba) {
    chromeModel.value = { r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a };
  } else {
    chromeModel.value = "#ffffff";
  }
}
initFromModel();

watch(() => props.modelValue, () => {
  initFromModel();
});

function onChromeUpdate(chromeValue: any) {
  if (chromeValue && typeof chromeValue === "object") {
    const rgba = chromeValue.rgba;
    chromeModel.value = { r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a };

    // Smart emission: if parent binds a string (hex), emit the hex string. Otherwise emit the RGBA object.
    if (typeof props.modelValue === "string") {
      emit("update:modelValue", chromeValue.hex);
    } else {
      emit("update:modelValue", { r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a });
    }
  }
}

async function togglePicker(e?: Event) {
  e?.preventDefault();
  const opening = !showPicker.value;
  showPicker.value = opening;

  if (opening) {
    // Popup isn't in the DOM until after this tick — measure once it exists
    await nextTick();
    computePopupPosition();
  }
}

function onDocClick(e: MouseEvent) {
  const rootEl = root.value;
  const popup = popupEl.value;
  const target = e.target as Node;
  // Click outside both the swatch button AND the teleported popup closes it
  if (rootEl && !rootEl.contains(target) && (!popup || !popup.contains(target))) {
    showPicker.value = false;
  }
}

function onWindowChange() {
  if (showPicker.value) {
     showPicker.value = false;
    computePopupPosition();
  }
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
  window.addEventListener("resize", onWindowChange);
  window.addEventListener("scroll", onWindowChange, true); // capture phase for scroll on any ancestor
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  window.removeEventListener("resize", onWindowChange);
  window.removeEventListener("scroll", onWindowChange, true);
});
</script>