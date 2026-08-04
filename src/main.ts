import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "remixicon/fonts/remixicon.css";
import "@/assets/tailwind.css";

import InputFieldWithIcon from "@/components/global/fields/InputFieldWithIcon.vue";
import CheckboxToggle from "@/components/global/fields/CheckboxToggle.vue";
import ButtonLoader from "@/components/global/ButtonLoader.vue";
import CustomDefaultCheckbox from "@/components/global/fields/CustomDefaultCheckbox.vue";
import InputField from "@/components/global/fields/InputField.vue";
import ModalComponent from "@/components/global/ModalComponent.vue";

import VueSvgInlinePlugin from "@/utils/vue-svg-inline-vite.ts";
const toastOptions = {
  timeout: 3000,
  position: "top-right",
};

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);
app.use(VueSvgInlinePlugin, {
  cache: {
    persistent: false,
  },
});

app.provide("appName", "FormFlow");

app.component("InputFieldWithIcon", InputFieldWithIcon);
app.component("CheckboxToggle", CheckboxToggle);
app.component("ButtonLoader", ButtonLoader);
app.component("CustomDefaultCheckbox", CustomDefaultCheckbox);
app.component("InputField", InputField);
app.component("ModalComponent", ModalComponent);

app.mount("#app");
