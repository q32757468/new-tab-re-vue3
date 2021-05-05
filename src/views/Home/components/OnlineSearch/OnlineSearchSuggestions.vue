<template>
  <div class="rounded bg-white shadow-xl overflow-hidden" v-show="visible">
    <ul>
      <li
        :class="
          'suggestion_item w-full flex items-center justify-between h-10 leading-10 pl-10 pr-3 cursor-pointer text-gray-600 text-sm' +
          ` ${index == activeIndex ? 'active' : ''}`
        "
        v-for="(suggestion, index) in suggestions"
        :key="suggestion.content"
        @mousedown="handleItemClick(index)"
        @mouseover="handleItemMouseover(index)"
        @mouseleave="handleItemMouseleave(index)"
      >
        <span>{{ suggestion.content }}</span>
        <span
          v-if="
            suggestion.type == SuggestionType.history && index === activeIndex
          "
          @mousedown.stop.prevent="handleItemMousedown(index, $event)"
        >
          <Icon name="delete" class="text-xs text-gray-400 hover:text-black" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import SearchSuggestion, { SuggestionType } from "./searchSuggestion";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "OnlineSearchSuggestions",
  components: { Icon },
  props: {
    datas: {
      type: Array as PropType<SearchSuggestion[]>,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    activeIndex: {
      type: Number,
      default: -1,
    },
  },
  emits: ["update:visible", "update:activeIndex", "item-click", "item-delete"],

  setup(props, { emit }) {
    const suggestions = ref<SearchSuggestion[]>([]);

    // watch在对引用类型的reactive数据进行监听时需要使用函数返回由值构成的副本的形式
    watch(
      () => [...props.datas],
      (datas) => {
        datas.forEach((data, index) => {
          suggestions.value[index] = Object.assign({}, data);
        });
        suggestions.value.length = datas.length;
      }
    );

    const handleItemClick = (index: number) => {
      emit("item-click", props.datas[index].content);
    };

    const handleItemMouseover = (index: number) => {
      emit("update:activeIndex", index);
    };

    const handleItemMouseleave = () => {
      emit("update:activeIndex", -1);
    };

    const handleItemMousedown = (index: number) => {
      emit("item-delete", index);
    };

    return {
      suggestions,
      handleItemClick,
      handleItemMouseover,
      handleItemMouseleave,
      handleItemMousedown,
      SuggestionType,
    };
  },
});
</script>

<style lang="postcss" scoped>
.active {
  @apply bg-gray-100;
}
</style>
