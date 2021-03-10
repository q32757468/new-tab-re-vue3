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
