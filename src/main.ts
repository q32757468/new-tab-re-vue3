import { createApp } from "vue";
import App from "./App.vue";
import "@/styles";
import Element from "@/plugins/element";

const app = createApp(App);
app.use(Element);
app.mount("#app");
