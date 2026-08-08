<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
    <div
      class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      <div class="bg-white mb-5">
        <label class="block text-sm font-semibold text-slate-800 mb-2">Form Type</label>
        <div class="flex gap-4">
          <button
            type="button"
            @click="displayRuleSetting.form_type = 'sticky'"
            class="relative flex-1 min-w-0 h-48 bg-white rounded-xl border-2 box-border cursor-pointer transition-colors group outline-none"
            :class="
              displayRuleSetting.form_type === 'sticky'
                ? 'border-transparent ring-2 ring-teal-500'
                : 'border-slate-200 hover:border-slate-300'
            ">
            <div
              class="absolute top-1/2 right-[-2px] -translate-y-1/2 py-1.5 px-4 rounded text-sm font-medium whitespace-nowrap [writing-mode:vertical-rl] [text-orientation:mixed] transition-colors"
              :class="
                displayRuleSetting.form_type === 'sticky'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-200 group-hover:bg-slate-300 text-transparent'
              ">
              <span class="sc-interp">Contact Us</span>
            </div>
          </button>
          <button
            type="button"
            @click="displayRuleSetting.form_type = 'tooltip'"
            class="relative flex-1 min-w-0 h-48 bg-white rounded-xl border-2 box-border cursor-pointer transition-colors group"
            :class="
              displayRuleSetting.form_type === 'tooltip'
                ? 'border-transparent ring-2 ring-teal-500'
                : 'border-slate-200 hover:border-slate-300'
            ">
            <div class="absolute bottom-4 right-4 flex items-center">
              <div
                class="mr-2 px-3 py-1.5 mt-0.5 rounded text-xs font-medium whitespace-nowrap opacity-100 transition-opacity pointer-events-none"
                :class="
                  displayRuleSetting.form_type === 'tooltip'
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-200 group-hover:bg-slate-300 text-transparent'
                ">
                Contact Us
              </div>

              <div
                class="w-[34px] h-[34px] rounded-full transition-colors"
                :class="
                  displayRuleSetting.form_type === 'tooltip' ? 'bg-teal-500' : 'bg-slate-200 group-hover:bg-slate-300'
                "></div>
            </div>
          </button>
        </div>
      </div>
      <div class="space-y-4">
        <div v-if="displayRuleSetting.form_type === 'sticky'" class="mb-4">
          <RadioTypeSelector
            v-model="displayRuleSetting.sticky_buttton_position"
            label="Sticky Button Position"
            name="stickyPositionSide"
            :columns="3"
            :options="formatOptions(stickyPositionOptions)" />
        </div>

        <template v-if="displayRuleSetting.form_type === 'sticky'">
          <div v-if="displayRuleSetting.sticky_buttton_position !== 'bottom'">
            <RadioTypeSelector
              v-model="displayRuleSetting.sticky_button_alignment"
              name="stickyPositionVertical"
              :columns="3"
              :options="formatOptions(verticalAlignOptions)" />
          </div>
          <div v-else>
            <RadioTypeSelector
              v-model="displayRuleSetting.sticky_button_alignment"
              name="stickyPositionHorizontal"
              :columns="3"
              :options="formatOptions(horizontalAlignOptions)" />
          </div>
        </template>
        <div v-if="displayRuleSetting.form_type === 'tooltip'">
          <RadioTypeSelector
            label="Position"
            v-model="displayRuleSetting.cta_icon_position"
            name="ctaIconPosition"
            :columns="2"
            :options="formatOptions(ctaButtonPositionOption)" />
        </div>
        <div class="grid grid-cols-2 gap-4 max-[450px]:grid-cols-1">
          <InputColorPicker v-model="displayRuleSetting.cta_bg_color" label="Background Color" />
          <InputColorPicker v-model="displayRuleSetting.cta_text_color" label="Icon Color" />
        </div>
        <div class="grid grid-cols-2 gap-4 max-[450px]:grid-cols-1">
            <InputColorPicker v-model="displayRuleSetting.tooltip_bg_color" label="Tooltip Background Color" />
            <InputColorPicker v-model="displayRuleSetting.tooltip_text_color" label="Tooltip Text Color" />
          </div>
        <div>
          <InputField type="text" v-model="displayRuleSetting.button_text" label="Button Text" focusColor="teal" />
        </div>
        <template v-if="displayRuleSetting.form_type === 'tooltip'">
          <div>
            <RadioGrid
              v-model="displayRuleSetting.cta_icon"
              :options="ctaIcons"
              label="CTA Icon"
              :columns="8"
              renderMode="icon"
              keyField="key"
              variant="icon" />
          </div>
          <div>
            <RadioGrid
              v-model="displayRuleSetting.cta_icon_size"
              :options="ctaIconSize"
              label="Button Size"
              :columns="8"
              renderMode="text"
              labelField="name"
              keyField="key"
              variant="size" />
          </div>

          <div v-if="displayRuleSetting.cta_icon_size === 'custom'">
            <InputFieldWithBadge
              v-model="displayRuleSetting.cta_custom_size"
              type="number"
              badge="PX"
              width="w-34"
              :min="0"
              label="Custom Size" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1" for="attention_effect"
              >Attention Effect</label
            >
            <SelectField v-model="displayRuleSetting.attention_effect" :options="attentionEffect" />
          </div>
        </template>
      </div>
    </div>

    <section
      class="lg:col-span-6 bg-slate-100/50 border border-slate-200/60 rounded-2xl p-6 flex flex-col items-center justify-center max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin">
      <PreviewTemplate class="w-full my-auto">
        <FormPreview />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
  import FormPreview from "@/views/FormSettingComponents/FormPreview.vue";

  import { formSetting } from "@/composable/useFormSettings";
  import { useDisplayRuleSettingStore } from "@/stores/DisplayRuleStore";

  const DisplayRuleSettingStore = useDisplayRuleSettingStore();
  const { displayRuleSetting } = formSetting();

  import {
    stickyPositionOptions,
    verticalAlignOptions,
    horizontalAlignOptions,
    ctaIcons,
    ctaIconSize,
    ctaButtonPositionOption,
    attentionEffect,
  } from "@/data/DisplayRuleOptions";

  const formatOptions = (options: Record<string, string>) =>
    Object.entries(options).map(([value, label]) => ({ label, value }));

  watch(
    () => displayRuleSetting.value.sticky_buttton_position,
    (newPosition) => {
      if (newPosition === "bottom") {
        displayRuleSetting.value.sticky_button_alignment = "center";
      } else {
        displayRuleSetting.value.sticky_button_alignment = "middle";
      }
    }
  );

  watch(
    displayRuleSetting,
    (newVal) => {
      Object.assign(DisplayRuleSettingStore.displayRuleSetting, newVal);
    },
    { deep: true, immediate: true }
  );
</script>
