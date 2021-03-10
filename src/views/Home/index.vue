<template>
  <div class="relative w-screen h-screen flex flex-col items-center">
    <Wallpaper />
    <OnlineSearch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OnlineSearch from "./components/OnlineSearch/index.vue";
import Wallpaper from "./components/Wallpaper.vue";

export default defineComponent({
  name: "Home",
  components: { Wallpaper, OnlineSearch },
});
</script>
