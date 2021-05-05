<template>
  <div class="relative">
    <Icon
      :name="'delete'"
      class="absolute -right-3 -top-7 cursor-pointer text-xs"
      @click="handleDeleteClick"
    />

    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      hide-required-asterisk
      label-width="80px"
    >
      <el-form-item
        label="图标："
        label-width="55px"
        class="icon_form_item"
        prop="icon"
      >
        <el-upload
          class="w-11 h-11 overflow-hidden border border-dashed border-gray-300 bg-gray-50 rounded inline-block hover:border-blue-400 relative right-10"
          action=""
          :show-file-list="false"
          :before-upload="handleBeforeIconUpload"
        >
          <img v-if="formData.icon" :src="formData.icon" class="w-11 h-11" />
          <span
            v-if="!formData.icon"
            class="w-11 h-11 flex justify-center items-center"
          >
            <Icon :name="'plus'" class="text-xs" />
          </span>
        </el-upload>
        <div class="flex">
          <Icon
            :name="'fetch'"
            class="text-lg cursor-pointer"
            @click="getRemoteIcon"
          />
          <Icon :name="'local'" class="text-base ml-1 cursor-pointer" />
        </div>
      </el-form-item>
      <el-form-item label="名称：" label-width="55px" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入站点名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="url：" label-width="55px" prop="url">
        <el-input v-model="formData.url" placeholder="请输入站点URL"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          class="relative left-2"
          @click="onSubmit"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "@/components/Icon.vue";
import { formatUrlPrefix, getBase64 } from "@/utils";

export default defineComponent({
  name: "SiteEditor",
  components: { Icon },
  emits: ["close-click", "confirm"],

  setup(props, { emit }) {
    const formData = ref({
      name: "",
      url: "",
      icon: "",
    });
    const form = ref<any>(null);

    const rules = {
      icon: [{ required: true, message: "请先上传图标或获取图标" }],
      name: [{ required: true, message: "名称不能为空" }],
      url: [{ required: true, message: "URL不能为空" }],
    };

    const getRemoteIcon = async () => {
      const url = formatUrlPrefix(formData.value.url);
      try {
        form.value.validateField("url", (errorMessage: string) => {
          if (!errorMessage) {
            formData.value.icon = `https://api.qqsuu.cn/api/favicon/get.php?url=${url}`;
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const onSubmit = () => {
      form.value.validate((valid: any) => {
        if (valid) {
          emit("confirm", Object.assign({}, formData.value));
        } else {
          return false;
        }
      });
    };

    const handleDeleteClick = () => {
      emit("close-click");
    };

    const resetFormFields = () => {
      form.value.resetFields();
    };

    const handleBeforeIconUpload = async (file: File) => {
      const base64 = await getBase64(file);
      formData.value.icon = base64 as string;

      return false;
    };

    return {
      formData,
      form,
      rules,
      getRemoteIcon,
      onSubmit,
      handleDeleteClick,
      resetFormFields,
      handleBeforeIconUpload,
    };
  },
});
</script>

<style lang="postcss" scoped>
::v-deep(.el-input__inner) {
  @apply h-8;
  @apply px-3 !important;
}

::v-deep(.el-form-item__error) {
  @apply pt-0  !important;
}

.el-form-item {
  margin-bottom: 14px !important;
}

.icon_form_item {
  ::v-deep(.el-form-item__content) {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
