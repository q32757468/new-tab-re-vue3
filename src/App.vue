<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "@/views/Home/index.vue";

export default defineComponent({
  name: "App",
  components: { Home },
});
</script>

<style></style>
