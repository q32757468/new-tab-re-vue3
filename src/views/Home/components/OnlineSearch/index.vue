<template>
  <div class="relative" style="top: calc(14vh + 10px)">
    <div class="relative inline-flex items-center bg-white rounded w-190">
      <OnlineSearchSelect v-model="selectedEngine" :datas="searchEngines" />
      <input
        class="outline-none h-11 bg-transparent flex-1 text-gray-700"
        v-model="keyWord"
        type="text"
        @input="handleInputChange"
        @keydown="handleInputKeyDown"
      />
      <button class="h-full pr-4" @click="submitSearch">
        <Icon :name="'search'" class="text-lg" />
      </button>
    </div>

    <OnlineSearchSuggestions
      class="w-full absolute bottom-0"
      style="transform: translateY(calc(100% + 5px))"
      :datas="suggestions"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Icon from "@/components/Icon.vue";
import OnlineSearchSelect from "./OnlineSearchSelect.vue";
import OnlineSearchSuggestions from "./OnlineSearchSuggestions.vue";
import SearchSuggestion, { SuggestionType } from "./searchSuggestion";
import { fetchSuggestions } from "@/api";
import { parseJsonpToJson } from "@/utils";

interface RemoteSuggestionsJsonResult {
  q: string;
  p: boolean;
  s: string[];
}

export default defineComponent({
  name: "OnlineSearch",
  components: { Icon, OnlineSearchSelect, OnlineSearchSuggestions },

  setup() {
    const baidu = {
      label: "百度",
      value: "baidu",
      url: "www.baidu.com/s",
      field: "wd",
    };
    const google = {
      label: "谷歌",
      value: "google",
      url: "www.google.com/search",
      field: "q",
    };
    const searchEngines = ref([baidu, google]);
    const selectedEngine = ref(baidu);
    const keyWord = ref("");
    const suggestions = ref<SearchSuggestion[]>([]);

    const submitSearch = () => {
      if (!keyWordFormatted.value) return;
      console.log(keyWordFormatted.value);
      const { url, field } = selectedEngine.value;
      let fullUrl = `${url}?${field}=${keyWordFormatted.value}`;
      if (!fullUrl.startsWith("http")) {
        fullUrl = "https://" + fullUrl;
      }
      window.open(fullUrl);
    };

    const keyWordFormatted = computed(() => {
      return keyWord.value.trim();
    });

    const getRemoteSuggestions = async () => {
      const { data: resData } = await fetchSuggestions(keyWord.value);
      const {
        s: remoteSuggestions,
      } = parseJsonpToJson<RemoteSuggestionsJsonResult>(resData);
      return remoteSuggestions;
    };

    const handleInputKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      switch (key) {
        case "Enter":
          submitSearch();
          break;

        case "ArrowUp":
          e.preventDefault();
          break;

        case "ArrowDown":
          e.preventDefault();
          break;
      }
    };

    const handleInputChange = async () => {
      const remoteSuggestions = await getRemoteSuggestions();
      suggestions.value = [];
      remoteSuggestions.forEach((suggestion) => {
        suggestions.value.push(
          new SearchSuggestion(SuggestionType.remote, suggestion)
        );
      });
    };

    return {
      searchEngines,
      selectedEngine,
      keyWord,
      submitSearch,
      handleInputKeyDown,
      suggestions,
      handleInputChange,
    };
  },
});
</script>
