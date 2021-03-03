import { createApp } from "vue";
import App from "./App.vue";
import "@/styles";
import Element from "@/plugins/element";
// element样式暂时全部引入，现有的按需引入样式会出现引入不全的情况
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.use(Element);
app.mount("#app");
