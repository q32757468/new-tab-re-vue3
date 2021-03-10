<template>
  <el-popover
    width="60px"
    placement="bottom-start"
    v-model:visible="visible"
    trigger="click"
    popper-class="onlineSearchSelect_popover"
  >
    <template #reference>
      <span class="px-3 h-full flex items-center cursor-pointer">
        <Icon :name="modelValue.value" class="text-lg" />
        <Icon :name="'arrow-up'" class="text-xs text-gray-400 ml-2" />
      </span>
    </template>

    <ul>
      <li
        class="cursor-pointer text-lg py-2 pl-3 hover:bg-blue-100"
        v-for="item in datas"
        :key="item.value"
        @click="changeActive(item)"
      >
        <Icon :name="item.value" />
      </li>
    </ul>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Icon from "@/components/Icon.vue";

interface OptionData {
  label: string;
  value: string | number;
  url: string;
  field: string;
}

export default defineComponent({
  components: { Icon },
  name: "OnlineSearchSelect",
  props: {
    modelValue: Object as PropType<OptionData>,
    datas: {
      type: Array as PropType<OptionData[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const visible = ref(false);

    const changeActive = (engine: OptionData) => {
      emit("update:modelValue", engine);
      visible.value = false;
    };

    return { changeActive, visible };
  },
});
</script>

<style lang="postcss">
.onlineSearchSelect_popover {
  min-width: 0px !important;
  width: 70px;
  padding: 4px 0 !important;
}
</style>
