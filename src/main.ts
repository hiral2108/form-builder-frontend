import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "remixicon/fonts/remixicon.css";
import "element-plus/dist/index.css";
import "@/assets/tailwind.css";
import "@/assets/form-theme.css";

import InputFieldWithIcon from "@/components/global/fields/InputFieldWithIcon.vue";
import CheckboxToggle from "@/components/global/fields/CheckboxToggle.vue";
import ButtonLoader from "@/components/global/ButtonLoader.vue";
import CustomDefaultCheckbox from "@/components/global/fields/CustomDefaultCheckbox.vue";
import InputField from "@/components/global/fields/InputField.vue";
import ModalComponent from "@/components/global/ModalComponent.vue";
import TextareaField from "@/components/global/fields/TextareaField.vue";
import SelectField from "@/components/global/fields/SelectField.vue";
import CustomDefaultRadio from "@/components/global/fields/CustomDefaultRadio.vue";
import RadioTypeSelector from "@/components/global/fields/RadioTypeSelector.vue";
import InputColorPicker from "@/components/global/fields/InputColorPicker.vue";
import InputFieldWithBadge from "@/components/global/fields/InputFieldWithBadge.vue";
import RadioGrid from "@/components/global/fields/RadioGrid.vue";
import HelpTooltip from "@/components/global/fields/HelpTooltip.vue";

import VueSvgInlinePlugin from "@/utils/vue-svg-inline-vite.ts";
import { useAppBridge } from "@/composable/useAppBridge";
import { clickOutside } from "@/directives/clickOutside";

const toastOptions = {
  timeout: 3000,
  position: "top-right",
};

const { initializeAppBridge } = useAppBridge();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);
app.use(VueSvgInlinePlugin, {
  cache: {
    persistent: false,
  },
});

app.provide("appName", "Form Builder");
app.directive("click-outside", clickOutside);
app.provide("extensionId", "01a03cdd-6493-7267-86bd-2434f5e0d8f6");

app.component("InputFieldWithIcon", InputFieldWithIcon);
app.component("CheckboxToggle", CheckboxToggle);
app.component("ButtonLoader", ButtonLoader);
app.component("CustomDefaultCheckbox", CustomDefaultCheckbox);
app.component("InputField", InputField);
app.component("ModalComponent", ModalComponent);
app.component("TextareaField", TextareaField);
app.component("SelectField", SelectField);
app.component("CustomDefaultRadio", CustomDefaultRadio);
app.component("RadioTypeSelector", RadioTypeSelector);
app.component("InputColorPicker", InputColorPicker);
app.component("InputFieldWithBadge", InputFieldWithBadge);
app.component("RadioGrid", RadioGrid);
app.component("HelpTooltip", HelpTooltip);

const urlParams = new URLSearchParams(window.location.search);
const forceRedirect = urlParams.get("forceRedirect");
const authKey = urlParams.get("key");
const shopUrl = sessionStorage.getItem("shop_url") || urlParams.get("shop");
// 2. Check if the current user is a Wix user
const isWix =
    sessionStorage.getItem("platform") === "wix" ||
    urlParams.has("instance") ||
    window.location.pathname.includes("/wix/");
if (forceRedirect === "true" && authKey) {
    sessionStorage.setItem("authToken", authKey);
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    app.mount("#app");
} else if (shopUrl && !isWix) {
    // Initialize Shopify App Bridge only if a Shopify shop exists
    initializeAppBridge().then(() => {
        app.mount("#app");
    });
} else {
    app.mount("#app");
}

