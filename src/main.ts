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

const app = createApp(App);
app.use(createPinia());
app.use(router);

const toastOptions = {
  timeout: 3000,
  position: "top-right",
};
app.use(Toast, toastOptions);

app.component("InputFieldWithIcon", InputFieldWithIcon);
app.component("CheckboxToggle", CheckboxToggle);

app.mount("#app");
