<template>
  <div>
    这是Home视图
    <Wallpaper />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Wallpaper from "./components/Wallpaper.vue";

export default defineComponent({
  name: "Home",
  components: { Wallpaper },
});
</script>
