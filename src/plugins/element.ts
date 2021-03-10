import { ElButton, ElPopover } from "element-plus";
import { App } from "vue";

// TODO:组件样式修改为按需引入，目前发现vite-plugin-style-import插件在按需引入时会出现样式引入不完整的情况
import "element-plus/lib/theme-chalk/index.css";

const components = [ElButton, ElPopover];

export default {
  install: (app: App<Element>) => {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
