<template>
  <div class="nav_site_item relative z-0">
    <div
      class="nav_site_item_more absolute right-1 top-1 z-10 opacity-0 cursor-pointer rounded-sm py-1 px-1 hover:bg-gray-200-6"
    >
      <Icon :name="'more'" class="text-white text-xs" />
    </div>

    <!-- <div class="cursor-pointer">
      <el-popover
        placement="top"
        popper-class=""
        v-model:visible="popoverVisible"
      >
        <template #reference> 123 </template>

        <SiteEditor
          ref="siteEditor"
          @close-click="popoverVisible = false"
          @confirm="handleAddConfirm"
        />
        <div>321</div>
      </el-popover>
    </div> -->

    <!-- <el-popover placement="top" :width="200" v-model:visible="popoverVisible">
      <template #reference>
        <el-button>手动激活</el-button>
      </template>

      <div>321</div>
    </el-popover> -->

    <a
      :href="url"
      class="h-full flex flex-col justify-between items-center pb-3 pt-1"
    >
      <div
        class="nav_site_item_icon rounded w-10 h-10 flex justify-center items-center mt-px bg-gray-200-6"
      >
        <img :src="icon" class="w-6 h-6" :alt="name" />
      </div>
      <div class="text-white text-xs">{{ name }}</div>
    </a>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import { defineComponent, ref } from "vue";
import SiteEditor from "./SiteEditor.vue";

export default defineComponent({
  name: "SiteNavItem",
  components: { Icon, SiteEditor },
  props: {
    name: String,
    url: String,
    icon: String,
  },

  setup() {
    const popoverVisible = ref(false);

    return { popoverVisible };
  },
});
</script>

<style lang="postcss">
.nav_site_item {
  @apply w-27 h-22.5 rounded hover:bg-gray-200-6 nav_site_item_transition;
}

.nav_site_item_transition {
  @apply transition-all duration-200 ease-in-out;
}

.nav_site_item:hover .nav_site_item_icon {
  @apply bg-transparent;
}

.nav_site_item:hover .nav_site_item_more {
  @apply opacity-100 nav_site_item_transition;
}
</style>
