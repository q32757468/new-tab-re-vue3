<template>
  <div class="relative w-screen h-screen flex flex-col items-center">
    <Wallpaper />
    <OnlineSearch class="relative" style="margin-top: calc(14vh + 10px)" />
    <SiteNav
      class="relative mt-auto"
      style="margin-bottom: calc(12vh + 28px)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OnlineSearch from "./components/OnlineSearch/index.vue";
import Wallpaper from "./components/Wallpaper.vue";
import SiteNav from "./components/SiteNav/index.vue";

export default defineComponent({
  name: "Home",
  components: { Wallpaper, OnlineSearch, SiteNav },
});
</script>
