<template>
  <div>
    <label v-if="label" :for="groupId" class="block text-sm font-semibold text-gray-700 mb-1">{{ label }}</label>

    <div class="grid gap-2 items-stretch radio-tile-toggle-container" :style="gridStyle">
      <div
        v-for="(opt, idx) in options"
        :key="getOptionKey(opt, idx)"
        :class="['radio-tile-wrapper', variantClass]"
      >
        <!-- native radio input for accessibility -->
        <input
          :id="tileId(opt, idx)"
          class="sr-only"
          type="radio"
          :name="groupId"
          :value="getOptionValue(opt, idx)"
          :checked="getOptionValue(opt, idx) === modelValue"
          :disabled="isDisabled(opt)"
          @change="onChange(opt)"
        />

        <!-- The visible tile (label tied to input via for=) -->
        <div class="relative group w-full h-full">
          <label
            :for="tileId(opt, idx)"
            :class="[
              'block w-full h-full p-3 rounded-xl border-2 transition-all flex items-center justify-center text-sm select-none',
              isDisabled(opt)
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:scale-105',
              tileBaseClass,
              isSelected(opt) ? selectedClass : unselectedClass
            ]"
            role="radio"
            :aria-checked="isSelected(opt)"
            :aria-disabled="isDisabled(opt)"
          >
            <!-- slot for custom rendering -->
            <slot name="tile" :option="opt">
              <template v-if="renderMode === 'icon'">
                <span v-if="getOptionIconComponent(opt)">
                  <component :is="getOptionIconComponent(opt)" />
                </span>
                <span v-else v-html="getOptionIconHtml(opt)"></span>
              </template>

              <template v-else-if="renderMode === 'text'">
                <span class="whitespace-nowrap">{{ getOptionLabel(opt) }}</span>
              </template>

              <template v-else>
                <span v-if="getOptionLabel(opt) !== undefined">{{ getOptionLabel(opt) }}</span>
                <span v-else v-html="getOptionIconHtml(opt)"></span>
              </template>
            </slot>
          </label>
          <div
            v-if="isDisabled(opt)"
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
             whitespace-nowrap rounded-md bg-gray-900 text-white text-xs
             px-3 py-1 opacity-0 group-hover:opacity-100
             transition-opacity pointer-events-none z-20"
          >
            Upgrade to Pro
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { nanoid } from "nanoid";

/* ----- Types ----- */
interface OptionObj {
  key?: string | number;
  value?: string | number;
  name?: string;       // labelField default
  label?: string;
  icon?: string;       // svg/html string
  iconComponent?: any; // Vue component
  disabled?: boolean;
  [k: string]: any;    // allow arbitrary props
}

type Option = OptionObj | string | number;

/* ----- Props ----- */
const props = withDefaults(defineProps<{
  modelValue?: string | number;
  options: Option[];
  label?: string;
  renderMode?: 'icon' | 'text' | 'auto';
  columns?: number;
  keyField?: string;
  labelField?: string;
  tileBaseClass?: string;
  selectedClass?: string;
  unselectedClass?: string;
  variant?: 'icon' | 'shape' | 'size';
}>(), {
  modelValue: undefined,
  renderMode: 'auto',
  columns: 6,
  keyField: 'key',
  labelField: 'name',
  tileBaseClass: 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
  selectedClass: 'font-semibold bg-teal-50 border-teal-300 text-teal-700',
  unselectedClass: '',
  variant: undefined
});

/* ----- Computeds & helpers ----- */
const variantClass = computed(() => {
  switch (props.variant) {
    case 'icon': return 'cta-icon-radio-toggle';
    case 'shape': return 'icon-shape-radio-toggle';
    case 'size': return 'button-size-radio-toggle';
    default: return '';
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | undefined): void
}>();

const groupId = `radio-grid-${nanoid?.() ?? Math.floor(Math.random() * 1e6)}`;

const gridStyle = computed(() => ({
  gridTemplateColumns: 'repeat(auto-fit, minmax(56px, 1fr))'
}))

function isObject(opt: Option): opt is OptionObj {
  return typeof opt === 'object' && opt !== null;
}

/* ----- Safe accessor helpers used by template ----- */
function getOptionKey(opt: Option, idx: number): string | number {
  if (isObject(opt)) return (opt[props.keyField!] ?? opt.value ?? opt.key ?? idx);
  return opt ?? idx;
}

function getOptionValue(opt: Option, idx: number): string | number {
  if (isObject(opt)) return (opt[props.keyField!] ?? opt.value ?? opt.key ?? idx);
  return opt ?? idx;
}

function getOptionLabel(opt: Option): string | number | undefined {
  if (isObject(opt)) return (opt[props.labelField!] ?? opt.label ?? opt.name ?? opt.value);
  return String(opt);
}

function getOptionIconHtml(opt: Option): string {
  if (isObject(opt)) return opt.icon ?? '';
  return '';
}

function getOptionIconComponent(opt: Option): any | undefined {
  if (isObject(opt)) return opt.iconComponent;
  return undefined;
}

/* ----- ID / selection / change handlers ----- */
function tileId(opt: Option, idx: number) {
  return `${groupId}-item-${String(getOptionKey(opt, idx))}`;
}

function isSelected(opt: Option) {
  return getOptionValue(opt, 0) === props.modelValue;
}

function onChange(opt: Option) {
  if (isDisabled(opt)) return;
  emit('update:modelValue', getOptionValue(opt, 0));
}

function isDisabled(opt: Option): boolean {
  if (isObject(opt)) return Boolean(opt.disabled);
  return false;
}

/* ----- Render mode detection ----- */
const renderMode = computed(() => {
  if (props.renderMode !== 'auto') return props.renderMode;
  const first = props.options && props.options.length ? props.options[0] : null;
  if (first && isObject(first) && (first.icon || first.iconComponent)) return 'icon';

  return 'text';
});
</script>

<style scoped>
.radio-tile-wrapper {
  height: 48px;
}

/* 1. Set explicit size and visible default color for all SVG icons */
:deep(svg) {
  width: 22px !important;
  height: 22px !important;
  fill: #64748b !important; /* Slate-500 (unselected color) */
  display: block;
  margin: auto;
}

/* 2. Selected tile container style (Teal) */
:deep(.cta-icon-radio-toggle input:checked + div > label) {
  border-color: #00bba7 !important; /* Teal border */
  background-color: #f0fdfa !important; /* Light teal bg */
}

/* 3. Selected icon color (Teal) */
:deep(.cta-icon-radio-toggle input:checked + div > label svg),
:deep(.cta-icon-radio-toggle input:checked + div > label svg path) {
  fill: #00bba7 !important; /* Teal-600 */
}

/* Icon Shape selected style */
:deep(.icon-shape-radio-toggle input:checked + div > label) {
  border-color: #00bba7 !important;
  background-color: #f0fdfa !important;
}

/* Button Size selected style */
:deep(.button-size-radio-toggle input:checked + div > label) {
  border-color: #00bba7 !important;
  background-color: #f0fdfa !important;
}

</style>
