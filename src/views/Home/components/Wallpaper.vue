<template>
  <div
    class="absolute w-full h-full inset-0 bg-cover bg-center bg-gray-300"
    :style="{ backgroundImage: `url(${curWallpaper})`, zIndex: -1 }"
  >
    <div class="overlay"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import storage from "@/utils/storage";
import { fetchWallpapers, WallPaperInfo } from "@/api";

export default defineComponent({
  name: "Wallpaper",

  setup() {
    const curWallpaper = ref("");

    const getWallpapers = async () => {
      const { data: resData } = await fetchWallpapers();
      const { images: wallPapers } = resData;
      await storage.set("wallPapers", wallPapers);
      getCurWallpaper();
    };

    const getCurWallpaper = async () => {
      const wallPapers = await storage.get<WallPaperInfo[]>("wallPapers");
      if (wallPapers) {
        curWallpaper.value = "https://cn.bing.com/" + wallPapers[0].url;
      }
    };

    onMounted(async () => {
      getCurWallpaper();
      getWallpapers();
    });

    return {
      curWallpaper,
    };
  },
});
</script>

<style lang="postcss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 1;
  background-attachment: fixed;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
}
</style>
