<template>
  <div class="nav_site_item cursor-pointer">
    <el-popover
      placement="top"
      popper-class="form-popover"
      v-model:visible="popoverVisible"
      @after-leave="handleAfterPopoverLeave"
    >
      <template #reference>
        <div class="w-full h-full flex justify-center items-center">
          <Icon :name="'plus'" class="text-white text-xl" />
        </div>
      </template>

      <SiteEditor
        ref="siteEditor"
        @close-click="popoverVisible = false"
        @confirm="handleAddConfirm"
      />
    </el-popover>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import storage from "@/utils/storage";
import { defineComponent, ref } from "vue";
import NavItem from "./navItem";
import SiteEditor from "./SiteEditor.vue";

export default defineComponent({
  name: "OperateButton",
  components: { Icon, SiteEditor },
  emits: ["add-finished"],

  setup(props, { emit }) {
    const popoverVisible = ref(false);
    const siteEditor = ref(null);

    const handleAddConfirm = async (data: {
      icon: string;
      name: string;
      url: string;
    }) => {
      let siteNavs = await storage.get<NavItem[]>("siteNavs");
      siteNavs = siteNavs || [];
      siteNavs.push(new NavItem(data.name, data.url, data.icon));
      await storage.set("siteNavs", siteNavs);
      emit("add-finished");
      popoverVisible.value = false;
    };

    const handleAfterPopoverLeave = () => {
      (siteEditor.value as any).resetFormFields();
    };

    return {
      popoverVisible,
      siteEditor,
      handleAddConfirm,
      handleAfterPopoverLeave,
    };
  },
});
</script>

<style lang="postcss">
.form-popover {
  @apply w-64 !important;
  padding-top: 40px !important;
  padding-left: 16px !important;
  padding-right: 20px !important;
}
</style>
