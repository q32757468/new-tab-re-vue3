<template>
  <div>
    <div class="relative inline-flex items-center bg-white rounded w-190">
      <OnlineSearchSelect v-model="selectedEngine" :datas="searchEngines" />
      <input
        class="outline-none h-11 bg-transparent flex-1 text-gray-700"
        v-model="keyWord"
        type="text"
        @input="handleInputChange_debounce"
        @keydown="handleInputKeyDown"
        @focus="handleInputFocus"
        @blur="suggestionsVisible = false"
      />
      <button class="h-full pr-4" @click="submitSearch">
        <Icon :name="'search'" class="text-lg" />
      </button>
    </div>

    <OnlineSearchSuggestions
      class="w-full absolute bottom-0"
      style="transform: translateY(calc(100% + 5px))"
      v-model:visible="suggestionsVisible"
      v-model:activeIndex="activeSuggestionIndex"
      :datas="suggestions"
      @item-click="handleSuggesClick"
      @item-delete="handleSuggesDelete"
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
import { debounce, uniqBy } from "lodash-es";
import storage from "@/utils/storage";
import SearchHistory from "./searchHistory";

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
    const inputKeyWord = ref(""); // 存储键盘键入的关键字
    const suggestions = ref<SearchSuggestion[]>([]);
    const suggestionsVisible = ref(true);
    const activeSuggestionIndex = ref(-1);

    const keyWordFormatted = computed(() => {
      return keyWord.value.trim();
    });

    const getLocalHistorys = async () => {
      let historys = await storage.get<SearchHistory[]>("searchHistorys");
      historys = historys || [];
      return historys;
    };

    const submitSearch = async () => {
      if (!keyWordFormatted.value) return;
      const { url, field } = selectedEngine.value;
      let fullUrl = `${url}?${field}=${keyWordFormatted.value}`;
      if (!fullUrl.startsWith("http")) {
        fullUrl = "https://" + fullUrl;
      }
      window.open(fullUrl);

      let historys = await getLocalHistorys();
      historys.unshift(
        new SearchHistory(keyWordFormatted.value, new Date().getTime())
      );
      historys = uniqBy(historys, (history) => history.content);
      storage.set("searchHistorys", historys);
    };

    const getRemoteSuggestions = async () => {
      const { data: resData } = await fetchSuggestions(keyWordFormatted.value);
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
          if (
            activeSuggestionIndex.value > -1 &&
            activeSuggestionIndex.value < suggestions.value.length
          ) {
            activeSuggestionIndex.value--;
            try {
              keyWord.value =
                suggestions.value[activeSuggestionIndex.value].content;
            } catch (error) {
              // 索引为负时无内容
            }
            if (activeSuggestionIndex.value <= -1) {
              keyWord.value = inputKeyWord.value;
            }
          } else if (activeSuggestionIndex.value <= -1) {
            activeSuggestionIndex.value = suggestions.value.length - 1;
            keyWord.value =
              suggestions.value[activeSuggestionIndex.value].content;
          }

          break;

        case "ArrowDown":
          e.preventDefault();
          if (
            activeSuggestionIndex.value > -2 &&
            activeSuggestionIndex.value < suggestions.value.length - 1
          ) {
            activeSuggestionIndex.value++;
            keyWord.value =
              suggestions.value[activeSuggestionIndex.value].content;
          } else if (
            activeSuggestionIndex.value >=
            suggestions.value.length - 1
          ) {
            activeSuggestionIndex.value = -1;
            keyWord.value = inputKeyWord.value;
          }

          break;
      }
    };

    const handleInputChange = async () => {
      let newSuggestions: SearchSuggestion[] = [];
      const historys = await getLocalHistorys();

      inputKeyWord.value = keyWord.value;

      if (!keyWordFormatted.value) {
        historys.forEach((history) => {
          newSuggestions.push(
            new SearchSuggestion(SuggestionType.history, history.content)
          );
        });
      } else {
        const remoteSuggestions = await getRemoteSuggestions();
        const correspondingHistorys = historys.filter((history) => {
          return history.content.includes(keyWordFormatted.value);
        });
        correspondingHistorys.forEach((history) => {
          newSuggestions.push(
            new SearchSuggestion(SuggestionType.history, history.content)
          );
        });
        remoteSuggestions.forEach((suggestion) => {
          newSuggestions.push(
            new SearchSuggestion(SuggestionType.remote, suggestion)
          );
        });
      }

      // 去重
      newSuggestions = uniqBy(
        newSuggestions,
        (suggestion) => suggestion.content
      );
      suggestions.value = newSuggestions;
    };

    const handleInputChange_debounce = debounce(handleInputChange, 300);

    const handleInputFocus = () => {
      handleInputChange();
      suggestionsVisible.value = true;
    };

    const handleSuggesClick = (content: string) => {
      keyWord.value = content;
      submitSearch();
    };

    const handleSuggesDelete = async (index: number) => {
      let historys = await getLocalHistorys();
      const content = suggestions.value[index].content;
      const historyIndex = historys.findIndex(
        (history) => history.content === content
      );
      suggestions.value.splice(index, 1);
      historys.splice(historyIndex, 1);
      storage.set("searchHistorys", historys);
    };

    return {
      searchEngines,
      selectedEngine,
      keyWord,
      suggestionsVisible,
      activeSuggestionIndex,
      submitSearch,
      handleInputKeyDown,
      suggestions,
      handleInputChange,
      handleInputChange_debounce,
      handleInputFocus,
      handleSuggesClick,
      handleSuggesDelete,
    };
  },
});
</script>
