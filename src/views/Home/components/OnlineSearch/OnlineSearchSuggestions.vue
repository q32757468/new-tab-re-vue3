<template>
  <div class="rounded bg-white shadow overflow-hidden">
    <ul>
      <li
        :class="
          'w-full h-10 leading-10 px-10 cursor-pointer text-gray-600 text-sm' +
          ` ${suggestion.isActive ? 'active' : ''}`
        "
        v-for="(suggestion, index) in datas"
        :key="index"
        @mouseover="handleItemMouseover"
        @mouseleave="handleItemMouseleave"
      >
        {{ suggestion.content }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SearchSuggestion from "./searchSuggestion";

export default defineComponent({
  name: "OnlineSearchSuggestions",
  props: {
    datas: {
      type: Array as PropType<SearchSuggestion[]>,
      default: () => [],
    },
  },
  setup() {
    const handleItemMouseover = () => {};
    const handleItemMouseleave = () => {};

    return {
      handleItemMouseover,
      handleItemMouseleave,
    };
  },
});
</script>

<style lang="postcss" scoped>
.active {
  @apply bg-gray-200;
}
</style>
