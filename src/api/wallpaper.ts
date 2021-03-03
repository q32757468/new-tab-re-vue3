import request from "@/utils/request";

export interface WallPapersResult {
  images: WallPaperInfo[];
  tooltips: Tooltips;
}

export interface WallPaperInfo {
  startdate: string;
  fullstartdate: string;
  enddate: string;
  url: string;
  urlbase: string;
  copyright: string;
  copyrightlink: string;
  title: string;
  quiz: string;
  wp: boolean;
  hsh: string;
  drk: number;
  top: number;
  bot: number;
  hs: any[];
}

export interface Tooltips {
  loading: string;
  previous: string;
  next: string;
  walle: string;
  walls: string;
}

export const fetchWallpapers = () =>
  request<WallPapersResult>({
    url:
      "https://www.bing.com/HPImageArchive.aspx?idx=0&n=8&format=js&pid=HpEdgeAn&mkt=zh-cn",
    method: "get",
  });
