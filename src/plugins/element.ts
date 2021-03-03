import {
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElPopper,
  ElCollapseTransition,
} from "element-plus";
import { App } from "vue";

export default {
  install: (app: App<Element>) => {
    app.use(ElButton);
    app.use(ElDropdown);
    app.use(ElDropdownItem);
    app.use(ElDropdownMenu);
    app.use(ElPopper);
    app.use(ElCollapseTransition);
  },
};
