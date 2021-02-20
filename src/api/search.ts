import request from "@/utils/request";

export const fetchSuggestions = (keyWord: string) =>
  request<string>({
    url: `https://suggestion.baidu.com/su?wd=${keyWord}&ie=UTF-8&cb=`,
    method: "get",
  });
