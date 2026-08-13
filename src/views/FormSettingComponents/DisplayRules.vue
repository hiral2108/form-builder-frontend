<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
    <div class="lg:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4">
      <div class="bg-white mb-5">
        <label class="block text-sm font-semibold text-slate-800 mb-2">Form Type</label>
        <div class="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
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
        <div v-if="displayRuleSetting.form_type === 'tooltip'" class="grid grid-cols-2 gap-4 max-[450px]:grid-cols-1">
          <InputColorPicker v-model="displayRuleSetting.tooltip_bg_color" label="Tooltip Background Color" />
          <InputColorPicker v-model="displayRuleSetting.tooltip_text_color" label="Tooltip Text Color" />
        </div>
         <div>
          <InputField 
            type="text" 
            v-model="displayRuleSetting.button_text" 
            label="Button Text" 
            focusColor="teal" 
            fieldId="button_text" 
            :hasError="Boolean(validationErrors?.button_text)"
            :validationMessage="validationErrors?.button_text ? [{ $message: validationErrors.button_text }] : []"
            @input="delete validationErrors.button_text"
          />
        </div>
        <template v-if="displayRuleSetting.form_type === 'tooltip'">
                    <!-- Hidden native file input element (disabled on free tier) -->
          <input
            ref="customFileInputRef"
            type="file"
            class="sr-only"
            accept="image/jpg,image/png,image/jpeg,image/webp,image/gif"
            :disabled="userStore.plan_id === 1"
            @change="onCustomIconChange" />

          <div>
            <RadioGrid
              v-model="displayRuleSetting.cta_icon"
              :options="computedCtaIcons"
              label="CTA Icon"
              :columns="8"
              renderMode="icon"
              keyField="key"
              variant="icon">
              <template #tile="{ option }">
                <!-- Custom File Upload Tile -->
                <div
                  v-if="option.key === 'upload'"
                  class="w-full h-full flex items-center justify-center"
                  @click.stop="openCustomIconPicker">
                  <!-- Render uploaded icon centered with padding/border around it -->
                  <img v-if="customIconUrl" :src="customIconUrl" class="w-full h-8 object-cover rounded" />

                  <!-- Render default upload icon -->
                  <span v-else v-html="option.icon" class="flex items-center justify-center"></span>

                  <!-- Remove uploaded custom file (positioned on the outer edge) -->
                  <span
                    v-if="customIconUrl"
                    class="absolute -top-2 -right-2 w-5 h-5 bg-white text-red-600 text-xs p-2.5 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    @click.stop="removeCustomIcon">
                    ✕
                  </span>
                </div>

                <!-- Standard default icons -->
                <span v-else v-html="option.icon"></span>
              </template>
            </RadioGrid>
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
      class="lg:col-span-6 w-full flex flex-col items-center bg-transparent border-none p-0 lg:bg-slate-100/50 lg:border lg:border-slate-200/60 rounded-2xl lg:p-6 min-h-0 lg:sticky lg:top-24">
      <PreviewTemplate class="w-full my-auto">
        <DisplayRulePreview />
      </PreviewTemplate>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from "vue"; // Added computed
  import { useToast } from "vue-toastification";
  import PreviewTemplate from "@/views/FormSettingComponents/PreviewTemplate.vue";
  import DisplayRulePreview from "@/views/FormSettingComponents/DisplayRulePreview.vue";

  import { formSetting } from "@/composable/useFormSettings";
  import { useDisplayRuleSettingStore } from "@/stores/DisplayRuleStore";
  import FormSettingService from "@/services/api/form-setting-services";
  import { useUserStore } from "@/stores/user.ts"; // Imported user store

  import {
    stickyPositionOptions,
    verticalAlignOptions,
    horizontalAlignOptions,
    ctaIcons,
    ctaIconSize,
    ctaButtonPositionOption,
    attentionEffect,
  } from "@/data/DisplayRuleOptions";

  const DisplayRuleSettingStore = useDisplayRuleSettingStore();
  const userStore = useUserStore();
  const { displayRuleSetting, validationErrors } = formSetting();
  const toast = useToast();

  // Custom Icon Upload States
  const customIconFile = ref<File | null>(null);
  const customIconUrl = ref<string | null>(null);
  const customFileInputRef = ref<HTMLInputElement | null>(null);

  // Disables the custom file upload option if the user is not on a Pro plan
  const computedCtaIcons = computed(() => {
    return ctaIcons.map(icon => {
      if (icon.key === 'upload') {
        return {
          ...icon,
          disabled: userStore.plan_id === 1
        };
      }
      return icon;
    });
  });

  const openCustomIconPicker = () => {
    customFileInputRef.value?.click();
  };

  // Client-side validations for image files
  const onCustomIconChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedExtensions.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, WEBP, and GIF files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size should not exceed 1MB.");
      event.target.value = "";
      return;
    }

    customIconFile.value = file;
    customIconUrl.value = URL.createObjectURL(file);

    // Update local store path configuration temporarily
    displayRuleSetting.value.custom_cta_file = customIconUrl.value;
    displayRuleSetting.value.custom_cta_url = customIconUrl.value;

    uploadImage();

    event.target.value = "";

    // Select the custom upload icon in grid
    displayRuleSetting.value.cta_icon = "upload";
  };

  // Upload selected image file to backend
  const uploadImage = async () => {
    if (!customIconFile.value) return;

    const formData = new FormData();
    formData.append("image", customIconFile.value);

    try {
      const response = await new FormSettingService().uploadImage(formData);
      if (response.status === 1) {
        displayRuleSetting.value.custom_cta_file = response.image;
        displayRuleSetting.value.custom_cta_url = response.fullPath;
      }
    } catch (error) {
      console.error("Failed to upload custom icon:", error);
      toast.error("Image upload failed");
    }
  };

  // Remove icon handler
  const removeCustomIcon = () => {
    removeImage();
    customIconFile.value = null;
    customIconUrl.value = null;
    displayRuleSetting.value.custom_cta_file = "";
    displayRuleSetting.value.custom_cta_url = "";
  };

  // Call server API to delete the image from server
  const removeImage = async () => {
    const imgName = displayRuleSetting.value.custom_cta_file;
    if (!imgName) return;
    try {
      const response = await new FormSettingService().removeUploadedImage({ image_name: imgName });
      if (response.status === 1) {
        console.log("Image removed successfully from server");
      }
    } catch (error) {
      console.error("Failed to remove image on server:", error);
    }
  };

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
      if (displayRuleSetting.value.custom_cta_url !== "") {
        customIconUrl.value = displayRuleSetting.value.custom_cta_url;
      }
    },
    { deep: true, immediate: true }
  );

    // Clear button_text error when switching to another form layout (e.g. tooltip)
  watch(
    () => displayRuleSetting.value.form_type,
    (newType) => {
      if (newType !== "sticky") {
        delete validationErrors.button_text;
      }
    }
  );
</script>
