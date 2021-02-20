import request from "@/utils/request";

export const fetchWallpapers = () =>
  request({
    url:
      "https://www.bing.com/HPImageArchive.aspx?idx=0&n=8&format=js&pid=HpEdgeAn&mkt=zh-cn",
    method: "get",
  });
