export function parseJsonpToJson<T = any>(datas: string): T {
  return new Function("return " + datas)();
  // let jsonData = null;
  // if (typeof datas === "string") {
  //   const reg = /\{.*\}/;
  //   const matches = datas.match(reg);
  //   console.log(matches);
  //   if (matches) {
  //     jsonData = JSON.parse(matches[0]);
  //   }
  // }
  // return jsonData;
}

export function formatUrlPrefix(url: string) {
  if (!url) return "";
  if (!url.startsWith("http")) {
    return "http://" + url;
  } else {
    return url;
  }
}

export function getBase64(img: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
}
