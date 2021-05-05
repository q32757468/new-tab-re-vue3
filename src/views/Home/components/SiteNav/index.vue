<template>
  <div class="grid grid-cols-8">
    <SiteNavItem
      v-for="(item, index) in siteNavs"
      :key="index"
      :name="item.name"
      :url="item.url"
      :icon="item.icon"
    />
    <OperateButton @add-finished="getSiteNavs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SiteNavItem from "./SiteNavItem.vue";
import NavItem from "./navItem";
import OperateButton from "./OperateButton.vue";
import storage from "@/utils/storage";

export default defineComponent({
  name: "SiteNav",
  components: { SiteNavItem, OperateButton },
  setup() {
    const siteNavs = ref<NavItem[]>([]);

    const getSiteNavs = async () => {
      let navItems = await storage.get<NavItem[]>("siteNavs");
      navItems = navItems || [];
      siteNavs.value = navItems;
    };

    onMounted(() => {
      getSiteNavs();
    });
    return {
      siteNavs,
      getSiteNavs,
    };
  },
});
</script>
