<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/iconFont/iconfont";

export default defineComponent({
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
